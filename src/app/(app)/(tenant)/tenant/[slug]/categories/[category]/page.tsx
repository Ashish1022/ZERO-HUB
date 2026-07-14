import React from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { CategoryView } from '@/templates/default/views/category-view'

interface Props {
  params: Promise<{ slug: string; category: string }>
}

const CategoryPage = async ({ params }: Props) => {
  const { category, slug } = await params

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.categories.getOne.queryOptions({ slug: slug, category: category }),
  )
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      { category: [category], slug: slug },
      {
        getNextPageParam: (lastpage) => {
          return lastpage.nextCursor
        },
      },
    ),
  )
  void queryClient.prefetchQuery(trpc.categories.getFeatured.queryOptions({ slug: slug }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryView slug={slug} category={category} />
    </HydrationBoundary>
  )
}

export default CategoryPage
