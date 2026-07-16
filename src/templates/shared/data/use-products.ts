"use client"

import { useMemo } from 'react'
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'

import type { ProductCardData } from './types'

interface ProductImage {
  imageId: string
  parentId: string
  isPrimary: boolean | null
  order: number
  url: string | null
  filename: string | null
}

const constructMediaURL = (filename: string | null) =>
  filename ? `/api/media/file/${filename}` : null

const getProductImage = (images: ProductImage[] | undefined): string | null => {
  if (!images || images.length === 0) return null
  const primary = images.find((image) => image.isPrimary)
  return constructMediaURL((primary ?? images[0]).filename)
}

interface ProductRow {
  id: string
  slug: string
  name: string
  pricingPrice: string
  pricingCompareAtPrice: string | null
  images?: ProductImage[]
  categoryName?: string | null
  badge?: string | null
  reviewRating?: number | null
  reviewCount?: number | null
}

const toCardData = (row: ProductRow, tenantSlug: string): ProductCardData => {
  const original = parseFloat(row.pricingPrice)
  const sale = row.pricingCompareAtPrice ? parseFloat(row.pricingCompareAtPrice) : null

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tenantSlug,
    displayPrice: sale ?? original,
    strikePrice: sale !== null && sale !== original ? original : null,
    image: getProductImage(row.images),
    category: row.categoryName ?? null,
    badge: row.badge ?? null,
    rating: row.reviewRating ?? null,
    reviews: row.reviewCount ?? null,
  }
}

interface UseProductsListOptions {
  limit?: number
  category?: string[]
}

export const useProductsList = (
  slug: string,
  { limit = 12, category }: UseProductsListOptions = {},
): ProductCardData[] => {
  const trpc = useTRPC()

  const { data } = useSuspenseInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      { slug, limit, ...(category ? { category } : {}) },
      {
        getNextPageParam: (lastPage) =>
          lastPage.data.length > 0 ? lastPage.nextCursor : undefined,
      },
    ),
  )

  return useMemo(
    () => data.pages.flatMap((page) => page.data).map((row) => toCardData(row as ProductRow, slug)),
    [data, slug],
  )
}

export const useFeaturedProducts = (slug: string): ProductCardData[] => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.products.getFeatured.queryOptions({ slug }))

  return useMemo(() => data.map((row) => toCardData(row as ProductRow, slug)), [data, slug])
}

export const useWishlistProducts = (slug: string, productIds: string[]): ProductCardData[] => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.checkout.getMany.queryOptions({ productIds }))

  return useMemo(
    () =>
      data.docs.map((doc): ProductCardData => {
        const original = doc.pricing.price
        const sale = doc.pricing.compareAtPrice ?? null

        return {
          id: doc.id,
          slug: doc.slug,
          name: doc.name,
          tenantSlug: slug,
          displayPrice: sale ?? original,
          strikePrice: sale !== null && sale !== original ? original : null,
          image: doc.image?.url ?? null,
          category: doc.category?.name ?? null,
          badge: doc.badge ?? null,
          rating: null,
          reviews: null,
        }
      }),
    [data, slug],
  )
}
