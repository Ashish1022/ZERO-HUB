import React from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { CategoriesView } from '@/templates/default/views/categories-view'

interface Props {
  params: Promise<{ slug: string }>
}

const CategoriesPage = async ({ params }: Props) => {
  const { slug } = await params

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.categories.getFeatured.queryOptions({ slug: slug }))
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesView slug={slug} />
    </HydrationBoundary>
  )
}

export default CategoriesPage
