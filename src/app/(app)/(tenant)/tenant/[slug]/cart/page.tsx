import React, { Suspense } from 'react'

import { getTenantSlots } from '@/modules/templates/server/render';

interface Props {
    params: Promise<{ slug: string }>
}

const CartPage = async ({ params }: Props) => {

    const { slug } = await params;

    const { CartView, CartSkeleton } = await getTenantSlots(slug)

    return (
        <Suspense fallback={<CartSkeleton />}>
            <CartView slug={slug} />
        </Suspense>
    )
}

export default CartPage
