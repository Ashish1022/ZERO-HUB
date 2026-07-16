import React, { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { getTenantSlots } from '@/modules/templates/server/render'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  params: Promise<{ slug: string; product: string }>
}

const ProductPage = async ({ params }: Props) => {
  const { slug, product } = await params

  const queryClient = getQueryClient()

  const { ProductView, ProductSkeleton } = await getTenantSlots(slug)

  void queryClient.prefetchQuery(
    trpc.products.getOne.queryOptions({ slug: slug, product: product }),
  )
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      { slug: slug, limit: 8 },
      {
        getNextPageParam: (lastpage) => {
          return lastpage.nextCursor
        },
      },
    ),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductView slug={slug} product={product} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default ProductPage
