import React, { Suspense } from 'react'

import { Tenant } from '@/payload-types';
import { caller, getQueryClient, trpc } from '@/trpc/server'
import { SalesView, SalesViewLoading } from '@/modules/analytics/ui/views/sales-view'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export const dynamic = 'force-dynamic'

const Page = async () => {

    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant;

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.analytics.getTenantMonthlySales.queryOptions({
        tenantId: tenant.id,
    }));
    void queryClient.prefetchQuery(trpc.analytics.getTenantTopCategories.queryOptions({
        tenantId: tenant.id,
    }));
    // void queryClient.prefetchQuery(trpc.analytics.getTenantTopProducts.queryOptions({
    //     tenantId: tenant.id
    // }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<SalesViewLoading />}>
                <SalesView tenantId={tenant.id} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page