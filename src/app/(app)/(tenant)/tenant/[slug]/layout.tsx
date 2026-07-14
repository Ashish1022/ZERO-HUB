import React, { Suspense } from 'react'

import '@/templates/default/style.css'
import { caller, getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Footer, FooterSkeleton } from '@/templates/default/components/footer'
import { Header, HeaderSkeleton } from '@/templates/default/components/header'

interface Props {
    params: Promise<{ slug: string }>
    children: React.ReactNode
}

const TenantLayout = async ({ params, children }: Props) => {

    const { slug } = await params
    const queryClient = getQueryClient();

    const tenant = await caller.tenants.getOne({ slug: slug });
    const template = tenant.activeTemplate;

    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug: slug }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<HeaderSkeleton />}>
                <Header slug={slug} />
            </Suspense>
            <main className='min-h-screen'>
                {children}
            </main>
            <Suspense fallback={<FooterSkeleton />}>
                <Footer slug={slug} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default TenantLayout