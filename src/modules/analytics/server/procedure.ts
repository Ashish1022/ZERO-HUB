import {
    db
} from "@/db";

import {
    baseProcedure,
    createTRPCRouter
} from "@/trpc/init";

import {
    z
} from "zod";

import {
    vProductPerformanceByTenant,
    vTenantMonthlySales,
    vTopCategoriesByTenant

} from "../../../../drizzle/schema";
import { and, asc, eq, lte, sql } from "drizzle-orm";

export const analyticsRouter = createTRPCRouter({
    getTenantMonthlySales: baseProcedure
        .input(
            z.object({
                tenantId: z.string(),
            })
        )
        .query(async ({ input }) => {

            const { tenantId } = input;

            const salesAnalytics = await db
                .select()
                .from(vTenantMonthlySales)
                .where(
                    eq(vTenantMonthlySales.tenantId, tenantId),
                )
                .orderBy(asc(vTenantMonthlySales.month));

            const data = Array.from({ length: 12 }, (_, index) => {
                const month = index + 1;
                const monthStr = month.toString().padStart(2, '0');
                const existingData = salesAnalytics.find(row => {
                    if (!row.month) return false;
                    return row.month === monthStr || row.month === month.toString();
                });

                return {
                    tenantId: tenantId,
                    month: month.toString(),
                    totalGrossSales: existingData?.totalGrossSales || 0,
                    totalNetSales: existingData?.totalNetSales || 0,
                    totalOrders: existingData?.totalOrders || 0,
                    averageOrderValue: existingData?.averageOrderValue || 0
                };
            });

            return data;
        }),

    getTenantTopCategories: baseProcedure
        .input(
            z.object({
                tenantId: z.string(),
            })
        )
        .query(async ({ input }) => {
            const { tenantId } = input;

            const categoriesAnalytics = await db
                .select()
                .from(vTopCategoriesByTenant)
                .where(
                    and(
                        eq(vTopCategoriesByTenant.tenantId, tenantId),
                        lte(sql`${vTopCategoriesByTenant.categoryRank}`, 5)
                    )
                )
                .limit(5)
                .orderBy(asc(vTopCategoriesByTenant.categoryRank));

            return categoriesAnalytics;
        }),
    getTenantTopProducts: baseProcedure
        .input(
            z.object({
                tenantId: z.string()
            })
        )
        .query(async ({ input }) => {
            const { tenantId } = input;

            const productsAnalytics = await db
                .select({
                    tenantId: vProductPerformanceByTenant.tenantId,
                    productName: vProductPerformanceByTenant.productName,
                    totalGrossSales: vProductPerformanceByTenant.totalGrossSales,
                    totalItemsSold: vProductPerformanceByTenant.totalItemsSold,
                    totalNetSales: vProductPerformanceByTenant.totalNetSales,
                    productRankHigh: vProductPerformanceByTenant.productRankHigh,
                    totalCostPrice:vProductPerformanceByTenant.totalCostPrice,
                    productRankLow: vProductPerformanceByTenant.productRankLow,
                })
                .from(vProductPerformanceByTenant)
                .where(and(
                    eq(vProductPerformanceByTenant.tenantId, tenantId),
                    lte(sql`${vProductPerformanceByTenant.productRankHigh}`, 10)
                ))
                .orderBy(asc(vProductPerformanceByTenant.productRankHigh));

            return productsAnalytics;
        }),
    getTenantLowProducts: baseProcedure
        .input(
            z.object({
                tenantId: z.string()
            })
        )
        .query(async ({ input }) => {
            const { tenantId } = input;

            const productsAnalytics = await db
                .select({
                    tenantId: vProductPerformanceByTenant.tenantId,
                    productName: vProductPerformanceByTenant.productName,
                    totalGrossSales: vProductPerformanceByTenant.totalGrossSales,
                    totalItemsSold: vProductPerformanceByTenant.totalItemsSold,
                    totalNetSales: vProductPerformanceByTenant.totalNetSales,
                    productRankHigh: vProductPerformanceByTenant.productRankHigh,
                    totalCostPrice:vProductPerformanceByTenant.totalCostPrice,
                    productRankLow: vProductPerformanceByTenant.productRankLow
                })
                .from(vProductPerformanceByTenant)
                .where(and(
                    eq(vProductPerformanceByTenant.tenantId, tenantId),
                    lte(sql`${vProductPerformanceByTenant.productRankLow}`, 10)
                ))
                .orderBy(asc(vProductPerformanceByTenant.productRankLow));
            return productsAnalytics;
        }),
});