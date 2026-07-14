import { reviewSchema } from "../schema";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const reviewsRouter = createTRPCRouter({
    create: baseProcedure
        .input(reviewSchema)
        .mutation(async ({ ctx, input }) => {
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
                    name: false,
                    slug: false,
                    image: false,
                    phone: false,
                    store: false,
                    activeTemplate: false,
                    subscription: false,
                    maxProducts: false,
                    analytics: false,
                    createdAt: false,
                    updatedAt: false
                }
            })
            const product = await ctx.db.find({
                collection: "products",
                limit: 1,
                depth: 0,
                pagination: false,
                where: {
                    slug: {
                        equals: input.product
                    }
                },
                select: {
                    images: false,
                    inventory: false,
                    name: false,
                    slug: false,
                    content: false,
                    category: false,
                    tenant: false,
                }
            });

            if (!product.docs[0] || product.docs.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "Product not found." });

            const review = await ctx.db.create({
                collection: "reviews",
                data: {
                    product: product.docs[0].id,
                    name: input.name,
                    email: input.email || '',
                    description: input.description,
                    title: input.title,
                    rating: input.rating,
                    tenant: tenant.docs[0].id
                }
            });
            return review
        }),
})