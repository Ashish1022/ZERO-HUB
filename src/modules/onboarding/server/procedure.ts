import { bankFormSchema, getBankDetails, getSubscription, subscribeSchema } from "../schema";

import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { SubscriptionPlan } from "@/payload-types";
import { razorpay } from "@/lib/razorpay";

const planId: Record<string, string> = {
    starter: process.env.STARTER_PLAN_ID as string,
    pro: process.env.PROFESSIONAL_PLAN_ID as string,
    enterprise: process.env.ENTERPRISE_PLAN_ID as string,
}

export const onboardingRouter = createTRPCRouter({
    subscribe: protectedProcedure
        .input(subscribeSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const user = await ctx.db.findByID({
                    collection: "users",
                    id: ctx.session.user.id,
                    depth: 0,
                });
                if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

                const tenantId = user.tenants?.[0]?.tenant.toString() as string;
                const tenant = await ctx.db.findByID({
                    collection: "tenants",
                    id: tenantId
                });
                if (!tenant) throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found." });

                const plan = await ctx.db.find({
                    collection: 'subscription-plans',
                    where: {
                        razorpayPlanId: {
                            equals: planId[input.plan]
                        },
                    }
                });
                if (!plan) {
                    throw new Error('Plan not found or not configured');
                }

                const existingSubscription = await ctx.db.find({
                    collection: "subscriptions",
                    limit: 1,
                    where: {
                        tenant: {
                            equals: tenant.id
                        },
                        status: {
                            in: ["active", "authenticated"]
                        }
                    }
                });
                if (existingSubscription.docs.length > 0) {
                    throw new TRPCError({ code: "BAD_REQUEST", message: 'User already has an active subscription' });
                }

                const razorpaySubscription = await razorpay.subscriptions.create({
                    plan_id: planId[input.plan],
                    quantity: 1,
                    total_count: 1,
                });

                const subscription = await ctx.db.create({
                    collection: "subscriptions",
                    data: {
                        tenant: tenant.id,
                        plan: plan.docs?.[0].id,
                        razorpaySubscriptionId: razorpaySubscription.id,
                        status: razorpaySubscription.status,
                        startAt: razorpaySubscription.start_at
                            ? new Date(razorpaySubscription.start_at * 1000).toISOString()
                            : null,
                        endAt: razorpaySubscription.end_at
                            ? new Date(razorpaySubscription.end_at * 1000).toISOString()
                            : null,
                        currentStart: razorpaySubscription.current_start
                            ? new Date(razorpaySubscription.current_start * 1000).toISOString()
                            : null,
                        currentEnd: razorpaySubscription.current_end
                            ? new Date(razorpaySubscription.current_end * 1000).toISOString()
                            : null,
                        chargeAt: razorpaySubscription.charge_at
                            ? new Date(razorpaySubscription.charge_at * 1000).toISOString()
                            : null,
                        paidCount: razorpaySubscription.paid_count,
                        remainingCount: parseInt(razorpaySubscription.remaining_count),
                    }
                })

                return {
                    subscription: razorpaySubscription,
                    payloadSubscription: subscription,
                };
            } catch (error) {
                console.log(error)
            }
        }),
    getTenantSubscription: baseProcedure
        .input(getSubscription)
        .query(async ({ ctx, input }) => {
            const subscription = await ctx.db.find({
                collection: "subscriptions",
                limit: 1,
                depth: 1,
                pagination: false,
                where: {
                    razorpaySubscriptionId: {
                        equals: input.subscriptionId
                    }
                },
                select: {
                    startAt: true,
                    currentEnd: true,
                    status: true,
                    plan: true,
                }
            })
            if (!subscription.docs[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Subscription not found" })

            const data = subscription.docs[0]
            return {
                ...data,
                plan: data.plan as SubscriptionPlan
            }
        }),
    getTenantBankDetails: baseProcedure
        .input(getBankDetails)
        .query(async ({ ctx, input }) => {
            const tenant = await ctx.db.find({
                collection: "tenants",
                pagination: false,
                limit: 1,
                depth: 0,
                where: {
                    "bankDetails.accountNumber": {
                        equals: input.accountNumber,
                    }
                },
                select: {
                    bankDetails: true
                }
            });
            if (!tenant.docs[0]) throw new TRPCError({ code: "NOT_FOUND", message: 'Tenant does not exist.' })
            const data = tenant.docs[0].bankDetails
            return data
        }),
    verify: protectedProcedure
        .input(bankFormSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const tenant = await ctx.db.find({
                    collection: "tenants",
                    pagination: false,
                    limit: 1,
                    depth: 0,
                    where: {
                        phone: {
                            equals: input.phone,
                        }
                    },
                });
                if (!tenant.docs[0]) throw new TRPCError({ code: "NOT_FOUND", message: 'Tenant does not exist.' })

                const account = await razorpay.accounts.create({
                    email: input.email,
                    phone: input.phone,
                    legal_business_name: input.legalBusinessName,
                    business_type: "individual",
                    contact_name: input.accountHolderName,
                    type: 'route',
                    profile: {
                        category: 'ecommerce',
                        subcategory: input.businessSubcategory,
                        addresses: {
                            registered: {
                                street1: input.streetAddress,
                                street2: input.addressLine2,
                                city: input.city,
                                state: input.state,
                                postal_code: input.postalCode,
                                country: input.country
                            }
                        }
                    },
                    legal_info: {
                        pan: input.panCardNumber
                    }
                });
                if (!account) throw new TRPCError({ code: 'BAD_REQUEST', message: "Failed to create razorpay account." })

                const razorpayProduct = await razorpay.products.requestProductConfiguration(account.id, {
                    product_name: "route",
                })
                const updatedRazorpayProduct = await razorpay.products.edit(account.id, razorpayProduct.id, {
                    settlements: {
                        account_number: input.accountNumber,
                        ifsc_code: input.ifscCode,
                        beneficiary_name: input.accountHolderName
                    },
                    "tnc_accepted": true
                })

                const updatedTenant = await ctx.db.update({
                    collection: "tenants",
                    where: {
                        id: {
                            equals: tenant.docs[0].id
                        }
                    },
                    data: {
                        bankDetails: {
                            accountHolderName: input.accountHolderName,
                            accountNumber: input.accountNumber,
                            ifscCode: input.ifscCode,
                            status: 'verified',
                            razorpayLinkedAccountId: account.id,
                            razorpayLinkedProductId: updatedRazorpayProduct.id,
                            panCardNumber: input.panCardNumber,
                            bankDetailsSubmitted: true
                        }
                    }
                })

                return updatedTenant
            } catch (error) {
                console.log(error)
            }
        })
})