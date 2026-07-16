import { Suspense } from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { caller, getQueryClient, trpc } from "@/trpc/server"
import { MarketplaceView } from "@/modules/templates/ui/views/marketplace-view"
import { TemplatesGridSkeleton } from "@/modules/templates/ui/components/template-grid-skeleton"

export const metadata = {
    title: "Templates",
    description: "Browse storefront templates for your ZERO | HUB store.",
}

export const dynamic = "force-dynamic"

const TemplatesPage = async () => {
    const queryClient = getQueryClient()
    const session = await caller.auth.session()

    void queryClient.prefetchQuery(
        trpc.templates.list.queryOptions({ pricing: "all", sort: "popular" }),
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<TemplatesGridSkeleton viewMode="grid" count={8} />}>
                <MarketplaceView signedIn={Boolean(session.user)} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default TemplatesPage
