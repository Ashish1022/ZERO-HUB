import React, { Suspense } from 'react'

import { CheckoutView } from '@/templates/default/views/checkout-view';

interface Props {
  params: Promise<{ slug: string }>
}

const CheckoutPage = async ({ params }: Props) => {

  const { slug } = await params;

  return (
    <Suspense>
      <CheckoutView slug={slug} />
    </Suspense>
  )
}

export default CheckoutPage