import React, { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { getTenantSlots } from '@/modules/templates/server/render'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface Props {
    params: Promise<{ slug: string }>
}

const TenantPage = async ({ params }: Props) => {

    const { slug } = await params
    const queryClient = getQueryClient();

    const { HomeView, HomeSkeleton } = await getTenantSlots(slug)

    void queryClient.prefetchQuery(trpc.categories.getFeatured.queryOptions({ slug: slug }))
    void queryClient.prefetchQuery(trpc.products.getFeatured.queryOptions({ slug: slug }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<HomeSkeleton />}>
                <HomeView slug={slug} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default TenantPage
