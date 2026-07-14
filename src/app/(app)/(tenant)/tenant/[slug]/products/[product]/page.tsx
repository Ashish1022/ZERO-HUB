import React from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { ProductView } from '@/templates/default/views/product-view'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
  params: Promise<{ slug: string; product: string }>
}

const ProductPage = async ({ params }: Props) => {
  const { slug, product } = await params

  const queryClient = getQueryClient()

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
      <ProductView slug={slug} product={product} />
    </HydrationBoundary>
  )
}

export default ProductPage
