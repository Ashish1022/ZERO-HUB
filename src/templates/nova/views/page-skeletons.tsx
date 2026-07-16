import { Skeleton } from "@/components/ui/skeleton"

import { CategoryCardSkeleton } from "../components/category-card"
import { ProductCardSkeleton } from "../components/product-card"

const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
    <div className="grid grid-cols-2 gap-px bg-tpl-line sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
            <ProductCardSkeleton key={index} />
        ))}
    </div>
)

const CategoryGridSkeleton = ({ count = 8 }: { count?: number }) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
        ))}
    </div>
)

const PageHeaderSkeleton = () => (
    <section className="border-b border-tpl-line bg-tpl-surface py-16">
        <div className="container mx-auto px-4 md:px-6">
            <Skeleton className="mb-4 h-3 w-24" />
            <Skeleton className="mb-4 h-12 w-72 md:h-16 md:w-96" />
            <Skeleton className="h-4 w-full max-w-xl" />
        </div>
    </section>
)

export const HomeSkeleton = () => (
    <div className="bg-tpl-surface">
        <section className="relative overflow-hidden border-b border-tpl-line py-24 md:py-32">
            <div className="nova-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="container relative mx-auto px-4 md:px-6">
                <Skeleton className="mb-6 h-6 w-40" />
                <Skeleton className="mb-4 h-14 w-full max-w-2xl md:h-20" />
                <Skeleton className="mb-8 h-14 w-3/4 max-w-xl md:h-20" />
                <Skeleton className="mb-10 h-5 w-full max-w-lg" />
                <Skeleton className="h-12 w-48" />
            </div>
        </section>
        <div className="container mx-auto px-4 py-20 md:px-6">
            <Skeleton className="mb-8 h-8 w-56" />
            <ProductGridSkeleton />
        </div>
    </div>
)

export const ProductsSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-12 md:px-6">
            <ProductGridSkeleton count={12} />
        </div>
    </div>
)

export const CategoriesSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-12 md:px-6">
            <CategoryGridSkeleton />
        </div>
    </div>
)

export const CategorySkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-12 md:px-6">
            <ProductGridSkeleton count={12} />
        </div>
    </div>
)

export const ProductSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <Skeleton className="mb-8 h-3 w-48" />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <Skeleton className="aspect-square w-full rounded-none" />
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-24 w-full" />
                    <div className="flex gap-3">
                        <Skeleton className="h-12 flex-1" />
                        <Skeleton className="h-12 w-12" />
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <Skeleton className="mb-8 h-8 w-56" />
                <ProductGridSkeleton count={4} />
            </div>
        </div>
    </div>
)

export const WishlistSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-12 md:px-6">
            <ProductGridSkeleton count={4} />
        </div>
    </div>
)
