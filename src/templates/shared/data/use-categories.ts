"use client"

import { useMemo } from 'react'
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'
import { generateTenantUrl } from '@/lib/utils'

import type { CategoryCardData } from './types'

interface CategoryRow {
  slug: string
  name: string
  description?: string | null
  thumbnail?: { url?: string | null } | null
  productCount: number
  subcategories?: Omit<CategoryRow, 'subcategories'>[]
}

const toCardData = (row: Omit<CategoryRow, 'subcategories'>, tenantSlug: string): CategoryCardData => ({
  slug: row.slug,
  name: row.name,
  description: row.description ?? null,
  image: row.thumbnail?.url ?? null,
  productCount: row.productCount,
  href: `${generateTenantUrl(tenantSlug)}/categories/${row.slug}`,
})

const flatten = (rows: CategoryRow[], tenantSlug: string): CategoryCardData[] =>
  rows.flatMap((row) => [
    toCardData(row, tenantSlug),
    ...(row.subcategories ?? []).map((sub) => toCardData(sub, tenantSlug)),
  ])

export const useCategoriesList = (slug: string, limit = 12): CategoryCardData[] => {
  const trpc = useTRPC()

  const { data } = useSuspenseInfiniteQuery(
    trpc.categories.getMany.infiniteQueryOptions(
      { slug, limit },
      {
        getNextPageParam: (lastPage) =>
          lastPage.data.length > 0 ? lastPage.nextCursor : undefined,
      },
    ),
  )

  return useMemo(
    () => flatten(data.pages.flatMap((page) => page.data) as CategoryRow[], slug),
    [data, slug],
  )
}

export const useFeaturedCategories = (slug: string): CategoryCardData[] => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getFeatured.queryOptions({ slug }))

  return useMemo(() => flatten(data as CategoryRow[], slug), [data, slug])
}
