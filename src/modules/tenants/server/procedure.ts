import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { tenants } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export const tenantsRouter = createTRPCRouter({
    getOneByPayload: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const tenant = await ctx.db.find({
                collection: "tenants",
                pagination: false,
                limit: 1,
                depth: 0,
                where: {
                    slug: {
                        equals: input.slug
                    }
                },
                select: {
                    store: true,
                    activeTemplate: true
                }
            })
            if (!tenant) throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found!" })
            const data = tenant.docs[0]
            return data
        }),
    getOne: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ input }) => {
            const [data] = await db
                .select({
                    storeName: tenants.store,
                    activeTemplate: tenants.activeTemplate
                })
                .from(tenants)
                .where(eq(tenants.slug, input.slug))
                .limit(1)

            if (!data) throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found!" });

            return data
        })
})