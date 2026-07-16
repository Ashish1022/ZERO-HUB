import { Skeleton } from '@/components/ui/skeleton'

import { CategoryCardSkeleton } from '../components/categories/category-card'
import { CategoryHeroSkeleton } from '../components/categories/category-hero'
import { ProductCardSkeleton } from '../components/products/product-card'

const HeroShellSkeleton = ({ compact = false }: { compact?: boolean }) => (
  <section
    className={`relative overflow-hidden bg-linear-to-b from-stone-50 to-white ${
      compact ? 'py-16 md:py-20' : 'py-20 md:py-28'
    }`}
  >
    <div className="container relative mx-auto px-4 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <Skeleton className="mx-auto mb-6 h-9 w-52 rounded-full" />
        <Skeleton className="mx-auto mb-8 h-12 w-80 md:h-16 md:w-lg" />
        <Skeleton className="mx-auto mb-3 h-6 w-full max-w-2xl" />
        <Skeleton className="mx-auto h-6 w-2/3 max-w-md" />
      </div>
    </div>
  </section>
)

export const CategoriesSkeleton = () => (
  <div className="min-h-screen bg-linear-to-b from-stone-50 to-white">
    <HeroShellSkeleton />
    <div className="container mx-auto px-4 pb-20 md:px-6 md:pb-28">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Skeleton className="mb-2 h-9 w-64" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="hidden h-10 w-44 rounded-full sm:block" />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
)

export const CategorySkeleton = () => (
  <div className="min-h-screen bg-linear-to-b from-stone-50 to-white">
    <div className="border-b border-stone-200 bg-white">
      <div className="container px-4 py-4 md:px-6">
        <Skeleton className="h-5 w-56" />
      </div>
    </div>
    <CategoryHeroSkeleton />
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
)

export const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
    <Skeleton className="mb-6 h-5 w-64" />
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="flex flex-col gap-4 pt-4">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-11 w-3/4" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-24 w-full" />
        <div className="mt-2 flex gap-4">
          <Skeleton className="h-12 flex-1 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
    <div className="mt-20">
      <Skeleton className="mb-8 h-9 w-56" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
)
