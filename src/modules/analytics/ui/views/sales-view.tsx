import {
    ProductsOverview,
    ProductsOverviewSkeleton
} from "../components/sales/products-overview"

import {
    GrossNetSales,
    GrossNetSalesLoading
} from "../components/sales/gross-net-sales"

import {
    CategoryChart,
    CategoryChartLoading
} from "../components/sales/category-chart"

import {
    TotalOrdersLineChart,
    TotalOrdersLineChartLoading
} from "../components/sales/total-orders-line-chart"

export const SalesView = ({ tenantId }: { tenantId: string }) => {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                {/* <Suspense fallback={<GrossNetSalesLoading />}> */}
                <GrossNetSales tenantId={tenantId} />
                {/* </Suspense> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 px-4 lg:px-6 gap-4 w-full">
                <div className="col-span-1 w-full">
                    {/* <Suspense fallback={<CategoryChartLoading />}> */}
                    <CategoryChart tenantId={tenantId} />
                    {/* </Suspense> */}
                </div>
                <div className="col-span-2">
                    {/* <Suspense fallback={<TotalOrdersLineChartLoading />}> */}
                    <TotalOrdersLineChart tenantId={tenantId} />
                    {/* </Suspense> */}
                </div>
            </div>
            <ProductsOverview tenantId={tenantId} />
        </div>
    )
}

export const SalesViewLoading = () => {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <GrossNetSalesLoading />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 px-4 lg:px-6 gap-4 w-full">
                <div className="col-span-1 w-full">
                    <CategoryChartLoading />
                </div>
                <div className="col-span-2">
                    <TotalOrdersLineChartLoading />
                </div>
            </div>
            <div className="px-4 lg:px-6">
                <ProductsOverviewSkeleton />
            </div>
        </div>
    );
};