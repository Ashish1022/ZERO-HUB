import { Skeleton } from "@/components/ui/skeleton"

import { CategoryCardSkeleton } from "../components/category-card"
import { ProductCardSkeleton } from "../components/product-card"

const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
        {Array.from({ length: count }).map((_, index) => (
            <ProductCardSkeleton key={index} />
        ))}
    </div>
)

const CategoryGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-x-10">
        {Array.from({ length: count }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
        ))}
    </div>
)

const PageHeaderSkeleton = () => (
    <section className="border-b border-tpl-line py-20 md:py-28">
        <div className="container mx-auto px-4 text-center md:px-6">
            <Skeleton className="mx-auto mb-5 h-3 w-24" />
            <Skeleton className="mx-auto mb-6 h-14 w-72 md:h-20 md:w-96" />
            <Skeleton className="mx-auto h-4 w-full max-w-md" />
        </div>
    </section>
)

export const HomeSkeleton = () => (
    <div className="bg-tpl-surface">
        <section className="border-b border-tpl-line py-28 md:py-40">
            <div className="container mx-auto px-4 text-center md:px-6">
                <Skeleton className="mx-auto mb-6 h-3 w-32" />
                <Skeleton className="mx-auto mb-4 h-16 w-full max-w-2xl md:h-24" />
                <Skeleton className="mx-auto mb-10 h-16 w-3/4 max-w-xl md:h-24" />
                <Skeleton className="mx-auto mb-10 h-4 w-full max-w-md" />
                <Skeleton className="mx-auto h-11 w-44" />
            </div>
        </section>
        <div className="container mx-auto px-4 py-24 md:px-6">
            <Skeleton className="mx-auto mb-14 h-10 w-64" />
            <ProductGridSkeleton />
        </div>
    </div>
)

export const ProductsSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-16 md:px-6">
            <ProductGridSkeleton count={9} />
        </div>
    </div>
)

export const CategoriesSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-16 md:px-6">
            <CategoryGridSkeleton />
        </div>
    </div>
)

export const CategorySkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-16 md:px-6">
            <ProductGridSkeleton count={9} />
        </div>
    </div>
)

export const ProductSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <div className="container mx-auto px-4 py-10 md:px-6 md:py-16">
            <Skeleton className="mb-10 h-3 w-48" />
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
                <Skeleton className="aspect-3/4 w-full rounded-tpl" />
                <div className="flex flex-col gap-5 pt-6">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-24 w-full" />
                    <div className="flex gap-4">
                        <Skeleton className="h-12 flex-1" />
                        <Skeleton className="h-12 w-12" />
                    </div>
                </div>
            </div>
            <div className="mt-28">
                <Skeleton className="mx-auto mb-14 h-10 w-56" />
                <ProductGridSkeleton count={3} />
            </div>
        </div>
    </div>
)

export const WishlistSkeleton = () => (
    <div className="min-h-screen bg-tpl-surface">
        <PageHeaderSkeleton />
        <div className="container mx-auto px-4 py-16 md:px-6">
            <ProductGridSkeleton count={3} />
        </div>
    </div>
)
