import React, { Suspense } from 'react'

import { getTenantSlots } from '@/modules/templates/server/render';

interface Props {
  params: Promise<{ slug: string }>
}

const CheckoutPage = async ({ params }: Props) => {

  const { slug } = await params;

  const { CheckoutView, CheckoutSkeleton } = await getTenantSlots(slug)

  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutView slug={slug} />
    </Suspense>
  )
}

export default CheckoutPage
