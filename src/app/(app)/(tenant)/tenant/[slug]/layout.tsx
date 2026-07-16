import React, { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getTenantSlots } from '@/modules/templates/server/render'

interface Props {
    params: Promise<{ slug: string }>
    children: React.ReactNode
}

const TenantLayout = async ({ params, children }: Props) => {

    const { slug } = await params
    const queryClient = getQueryClient();

    const { Header, HeaderSkeleton, Footer, FooterSkeleton } = await getTenantSlots(slug)

    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug: slug }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div
                data-storefront
                className="flex min-h-screen flex-col bg-tpl-surface text-tpl-fg"
            >
                <Suspense fallback={<HeaderSkeleton />}>
                    <Header slug={slug} />
                </Suspense>
                <main className='flex-1'>
                    {children}
                </main>
                <Suspense fallback={<FooterSkeleton />}>
                    <Footer slug={slug} />
                </Suspense>
            </div>
        </HydrationBoundary>
    )
}

export default TenantLayout
