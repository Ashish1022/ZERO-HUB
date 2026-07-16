import React, { Suspense } from 'react'

import { getTenantSlots } from '@/modules/templates/server/render';

interface Props {
    params: Promise<{ slug: string }>
}

const WishlistPage = async ({ params }: Props) => {

    const { slug } = await params;

    const { WishlistView, WishlistSkeleton } = await getTenantSlots(slug)

    return (
        <Suspense fallback={<WishlistSkeleton />}>
            <WishlistView slug={slug} />
        </Suspense>
    )
}

export default WishlistPage
