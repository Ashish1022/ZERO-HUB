import React, { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getTenantSlots } from '@/modules/templates/server/render'

interface Props {
  params: Promise<{ slug: string; category: string }>
}

const CategoryPage = async ({ params }: Props) => {
  const { category, slug } = await params

  const queryClient = getQueryClient()

  const { CategoryView, CategorySkeleton } = await getTenantSlots(slug)

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
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryView slug={slug} category={category} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default CategoryPage
