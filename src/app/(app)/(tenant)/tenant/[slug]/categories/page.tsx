import React, { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getTenantSlots } from '@/modules/templates/server/render'

interface Props {
  params: Promise<{ slug: string }>
}

const CategoriesPage = async ({ params }: Props) => {
  const { slug } = await params

  const queryClient = getQueryClient()

  const { CategoriesView, CategoriesSkeleton } = await getTenantSlots(slug)

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
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesView slug={slug} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default CategoriesPage
