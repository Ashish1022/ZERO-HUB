import React from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ProductsView } from '@/templates/default/views/products-view'
import { loadProductFilters } from '@/modules/products/search-param'
import { SearchParams } from 'nuqs/server'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

const ProductsPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params

  const filters = await loadProductFilters(searchParams)

  const queryClient = getQueryClient()

  void queryClient.prefetchInfiniteQuery(
    trpc.categories.getMany.infiniteQueryOptions(
      {
        slug: slug,
        limit: 12,
      },
      {
        getNextPageParam: (lastpage) => {
          return lastpage.nextCursor
        },
      },
    ),
  )
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      {
        slug: slug,
        ...filters,
      },
      {
        getNextPageParam: (lastpage) => {
          return lastpage.nextCursor
        },
      },
    ),
  )
  void queryClient.prefetchQuery(trpc.products.getFeatured.queryOptions({ slug: slug }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsView slug={slug} />
    </HydrationBoundary>
  )
}

export default ProductsPage
