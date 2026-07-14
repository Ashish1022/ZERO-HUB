import React, { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { HeroSectionSkeleton, HomeView } from '@/templates/default/views/home-view';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface Props {
    params: Promise<{ slug: string }>
}

const TenantPage = async ({ params }: Props) => {

    const { slug } = await params
    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.categories.getFeatured.queryOptions({ slug: slug }))
    void queryClient.prefetchQuery(trpc.products.getFeatured.queryOptions({ slug: slug }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<HeroSectionSkeleton />}>
                <HomeView slug={slug} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default TenantPage