import { z } from "zod";
import crypto from 'crypto'
import { and, eq, sql } from "drizzle-orm";

import { checkoutSchema } from "../schema";
import { categorySalesSummary, monthlySalesSummary, orders, ordersOrderItems, productsSalesSummary, tenants } from "../../../../drizzle/schema";

import { TRPCError } from "@trpc/server";
import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { razorpay } from "@/lib/razorpay";
import { db } from "@/db";

export const checkoutRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                productIds: z.array(z.string())
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "products",
                pagination: false,
                where: {
                    id: {
                        in: input.productIds
                    }
                },
                depth: 1,
                select: {
                    name: true,
                    slug: true,
                    pricing: true,
                    images: true,
                    category: true,
                    badge: true
                }
            });
            if (data.totalDocs !== input.productIds.length) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Product not found." })
            }

            const totalPrice = data.docs.reduce((acc, product) => {
                const price = Number((product.pricing.compareAtPrice ? product.pricing.compareAtPrice : product.pricing.price));
                return acc + (isNaN(price) ? 0 : price)
            }, 0);

            return {
                ...data,
                totalPrice: totalPrice,
                docs: data.docs.map(({ images, ...doc }) => {
                    const primaryImageObj = images.find(image => image.isPrimary);
                    const primaryImage = primaryImageObj?.image as Media | null;

                    return {
                        ...doc,
                        category: doc.category as Category,
                        image: primaryImage,
                    }
                })
            }
        }),
    createOrder: baseProcedure
        .input(checkoutSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const tenant = await ctx.db.find({
                    collection: "tenants",
                    limit: 1,
                    depth: 0,
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.tenant
                        }
                    },
                    select: {
                        bankDetails: true
                    }
                })
                const customer = await ctx.db.create({
                    collection: "customers",
                    data: {
                        firstname: input.firstname,
                        email: input.email,
                        lastname: input.lastname,
                        newsLetter: input.newsletter,
                        shippingAddress: {
                            street: input.street,
                            apartment: input.apartment,
                            city: input.city,
                            postalCode: input.zip,
                            state: input.state,
                            country: input.country
                        },
                        deliveryOption: input.deliveryOption,
                        specialInstructions: input.instruction,
                        tenant: tenant.docs[0].id
                    }
                })

                const order = await ctx.db.create({
                    collection: "orders",
                    data: {
                        name: customer.firstname,
                        customer: customer.id,
                        isPaid: false,
                        orderItems: input.products.map(product => ({
                            product: product.name,
                            category: product.category,
                            quantity: product.quantity,
                            unitPrice: product.compareAtPrice ? product.compareAtPrice : product.price,
                            discountPerItem: product.price - product.compareAtPrice,
                            grossItemAmount: product.price * product.quantity,
                        })),
                        tenant: tenant.docs[0].id,
                        discountAmount: input.discountAmount,
                        saleAmount: input.saleAmount,
                        shippingAmount: input.shippingAmount,
                        grossAmount: input.grossAmount,
                        taxAmount: input.taxAmount,
                        orderDate: customer.createdAt
                    }
                });
                if (!tenant.docs[0].bankDetails?.razorpayLinkedAccountId) throw new TRPCError({ code: "BAD_REQUEST", message: "Tenant not verified" })

                const razorpay_amount = parseInt((input.finalAmount * 100).toFixed(0))

                const razorpayOrder = await razorpay.orders.create({
                    amount: razorpay_amount,
                    currency: 'INR',
                    receipt: `order-${order.id.substring(0, 30)}`,
                    transfers: [
                        {
                            account: tenant.docs[0].bankDetails.razorpayLinkedAccountId,
                            amount: razorpay_amount,
                            currency: 'INR',
                            on_hold: false,
                        },
                    ]
                });

                return {
                    razorpay_order_id: razorpayOrder.id,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    uniqueId: order.id,
                    customerEmail: input.email,
                    customerPhone: input.phone,
                    customerName: `${input.firstname}  ${input.lastname}`,
                }
            } catch (error) {
                console.log(error)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create order"
                })
            }
        }),
    verifyOrder: baseProcedure
        .input(
            z.object({
                razorpay_order_id: z.string().optional(),
                amount: z.union([z.number(), z.string()]).optional(),
                uniqueId: z.string(),
                razorpay_payment_id: z.string().optional(),
                razorpay_signature: z.string().optional(),
                slug: z.string(),
                saleAmount: z.number(),
                discountAmount: z.number(),
                grossAmount: z.number(),
                products: z.array(z.object({
                    productId: z.string(),
                    name: z.string(),
                    quantity: z.number(),
                    price: z.number(),
                    compareAtPrice: z.number(),
                    category: z.string()
                })),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const body = `${input.razorpay_order_id}|${input.razorpay_payment_id}`;
                const sha = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET_KEY as string);
                sha.update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`);
                const expectedSignature = crypto
                    .createHmac('sha256', process.env.RAZOR_PAY_SECRET_KEY as string)
                    .update(body)
                    .digest('hex');

                if (expectedSignature !== input.razorpay_signature) {
                    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid transaction signature" });
                }

                const [tenant] = await db
                    .select({
                        id: tenants.id
                    })
                    .from(tenants)
                    .where(eq(tenants.slug, input.slug))
                    .limit(1)

                if (!tenant) throw new TRPCError({ code: 'NOT_FOUND', message: 'Tenant not found!' });

                const [order] = await db
                    .select({
                        id: orders.id,
                        createdAt: orders.createdAt,
                        grossAmount: orders.grossAmount,
                        discountAmount: orders.discountAmount,
                        saleAmount: orders.saleAmount,
                        totalItemsSold: sql<string>`COALESCE(SUM(${ordersOrderItems.quantity}), 0)`
                    })
                    .from(orders)
                    .leftJoin(ordersOrderItems, (eq(orders.id, ordersOrderItems.parentId)))
                    .where(eq(orders.id, input.uniqueId))
                    .groupBy(orders.id, orders.createdAt, orders.grossAmount, orders.discountAmount, orders.saleAmount)
                    .limit(1)

                if (!order) throw new TRPCError({ code: 'NOT_FOUND', message: 'Associated order not found!' })

                const orderDateTime = new Date(order.createdAt)
                const month = (orderDateTime.getMonth() + 1).toString().padStart(2, '0');
                const year = orderDateTime.getFullYear().toString();
                const saleAmount = parseFloat(order.saleAmount)
                const grossAmount = parseFloat(order.grossAmount)

                const [existingSummary] = await db
                    .select({
                        netSales: monthlySalesSummary.netSales,
                        totalOrders: monthlySalesSummary.totalOrders
                    })
                    .from(monthlySalesSummary)
                    .where(
                        and(
                            eq(monthlySalesSummary.tenantId, tenant.id),
                            eq(monthlySalesSummary.month, month),
                            eq(monthlySalesSummary.year, year)
                        )
                    )
                    .limit(1);

                const netSales = existingSummary ? Number(existingSummary.netSales) : 0;
                const monthlySales = existingSummary ? Number(existingSummary.totalOrders) : 0;
                const average_order_value = (netSales + saleAmount) / (monthlySales + 1);
                const totalItemsSold = parseInt(order.totalItemsSold);

                await db
                    .insert(monthlySalesSummary)
                    .values({
                        tenantId: tenant.id,
                        month: month,
                        year: year,
                        totalOrders: "1",
                        grossSales: grossAmount.toString(),
                        netSales: saleAmount.toString(),
                        totalItemsSold: totalItemsSold.toString(),
                        averageOrderValue: average_order_value.toString()
                    })
                    .onConflictDoUpdate({
                        target: [monthlySalesSummary.tenantId, monthlySalesSummary.month, monthlySalesSummary.year],
                        set: {
                            totalOrders: sql`${monthlySalesSummary.totalOrders} + 1`,
                            grossSales: sql`${monthlySalesSummary.grossSales} + ${grossAmount}`,
                            netSales: sql`${monthlySalesSummary.netSales} + ${saleAmount}`,
                            totalItemsSold: sql`${monthlySalesSummary.totalItemsSold} + ${totalItemsSold}`,
                            averageOrderValue: average_order_value.toString(),
                            updatedAt: sql`NOW()`
                        }
                    });

                const categoryData = input.products.reduce((acc, product) => {
                    const { category, quantity, price, compareAtPrice } = product;

                    if (!acc[category]) {
                        acc[category] = {
                            totalOrders: 0,
                            grossSales: 0,
                            netSales: 0,
                            totalItemsSold: 0
                        };
                    }

                    acc[category].totalOrders += 1;
                    acc[category].grossSales += price * quantity;
                    acc[category].netSales += (compareAtPrice ? compareAtPrice : price) * quantity;
                    acc[category].totalItemsSold += quantity;

                    return acc;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }, {} as Record<string, any>);

                const upsertCategoryPromises = Object.entries(categoryData).map(([categoryName, data]) => {
                    return db
                        .insert(categorySalesSummary)
                        .values({
                            tenantId: tenant.id,
                            categoryName,
                            month,
                            year,
                            totalOrders: data.totalOrders.toString(),
                            grossSales: data.grossSales.toFixed(2),
                            netSales: data.netSales.toFixed(2),
                            totalItemsSold: data.totalItemsSold.toString(),
                        })
                        .onConflictDoUpdate({
                            target: [
                                categorySalesSummary.tenantId,
                                categorySalesSummary.categoryName,
                                categorySalesSummary.month,
                                categorySalesSummary.year
                            ],
                            set: {
                                totalOrders: data.totalOrders.toString(),
                                grossSales: data.grossSales.toFixed(2),
                                netSales: data.netSales.toFixed(2),
                                totalItemsSold: data.totalItemsSold.toString(),
                                updatedAt: new Date().toISOString(),
                            },
                        });
                });

                await Promise.all(upsertCategoryPromises);

                const productData = input.products.reduce((acc, product) => {
                    const { name, quantity, price, compareAtPrice } = product;

                    if (!acc[name]) {
                        acc[name] = {
                            totalOrders: 0,
                            grossSales: 0,
                            netSales: 0,
                            totalItemsSold: 0
                        };
                    }

                    acc[name].totalOrders += 1;
                    acc[name].grossSales += price * quantity;
                    acc[name].netSales += (compareAtPrice ? compareAtPrice : price) * quantity;
                    acc[name].totalItemsSold += quantity;

                    return acc;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }, {} as Record<string, any>);

                const upsertProductPromises = Object.entries(productData).map(([productName, data]) => {
                    return db
                        .insert(productsSalesSummary)
                        .values({
                            tenantId: tenant.id,
                            productName: productName,
                            month: month,
                            year: year,
                            totalOrders: data.totalOrders.toString(),
                            grossSales: data.grossSales.toFixed(2),
                            netSales: data.netSales.toFixed(2),
                            totalItemsSold: data.totalItemsSold.toString(),
                        })
                        .onConflictDoUpdate({
                            target: [
                                productsSalesSummary.tenantId,
                                productsSalesSummary.productName,
                                productsSalesSummary.month,
                                productsSalesSummary.year
                            ],
                            set: {
                                totalOrders: data.totalOrders.toString(),
                                grossSales: data.grossSales.toFixed(2),
                                netSales: data.netSales.toFixed(2),
                                totalItemsSold: data.totalItemsSold.toString(),
                                updatedAt: new Date().toISOString(),
                            },
                        })
                });

                await Promise.all(upsertProductPromises);

                await ctx.db.update({
                    collection: "orders",
                    where: {
                        id: {
                            equals: input.uniqueId
                        },
                    },
                    data: {
                        isPaid: true,
                        razorpayCheckoutSessionId: input.razorpay_payment_id,
                        razorpayOrderId: input.razorpay_order_id,
                        orderDate: new Date().toISOString(),
                        grossAmount: input.grossAmount,
                        discountAmount: input.discountAmount,
                        saleAmount: input.saleAmount,
                    }
                });
            } catch (error) {
                console.log(error)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create order"
                })
            }
        })
})