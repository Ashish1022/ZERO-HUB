"use client"

import { Award, Filter } from "lucide-react"
import { useState } from "react"

import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useProductFilters } from "@/modules/products/hooks/use-product-filter"
import { ProductCard } from "./product-card"
import EmptyProducts from "./empty-products"
import { SearchFilters } from "../search"
import { ProductFilters } from "./product-filters"

type ProductImage = {
    imageId: string;
    parentId: string;
    isPrimary: boolean | null;
    order: number;
    url: string | null;
    filename: string | null;
}

const constructMediaURL = (filename: string | null) => {
    if (!filename) return null;
    return `/api/media/file/${filename}`;
};

const getProductImage = (images: ProductImage[] | undefined): string | null => {
    if (!images || images.length === 0) return null

    const primaryImage = images.find(img => img.isPrimary)
    if (primaryImage) {
        return constructMediaURL(primaryImage.filename) || null
    }

    const firstImage = images[0]
    if (firstImage) {
        return constructMediaURL(firstImage.filename) || null
    }

    return null
}

export const ProductsGrid = ({ slug }: { slug: string }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const [filters] = useProductFilters()
    const trpc = useTRPC()

    const {
        data: products,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useSuspenseInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions(
            {
                slug: slug,
                ...filters,
            },
            {
                getNextPageParam: (lastPage) => {
                    return lastPage.data.length > 0 ? lastPage.nextCursor : undefined
                },
            },
        ),
    )

    const { data: featured } = useSuspenseQuery(trpc.products.getFeatured.queryOptions({ slug: slug }))

    const handleLoadMore = () => {
        if (!isFetchingNextPage) {
            fetchNextPage()
        }
    }

    if (products?.pages?.[0]?.data.length === 0) {
        return (
            <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
                <EmptyProducts
                    title="No products available yet"
                    description="We're working on adding products to our store. Please check back soon!"
                    showResetButton={true}
                />
            </div>
        )
    }

    return (
        <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
            <div className="mb-6 md:mb-8 max-w-2xl mx-auto">
                <SearchFilters className="pl-4 sm:pl-8 md:pl-12 h-12 sm:h-14 rounded-full border-stone-300 focus:border-amber-500 bg-white shadow-sm text-base md:text-lg" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
                <div className="hidden lg:block">
                    <div className="sticky top-20 xl:top-24 bg-white rounded-2xl border border-stone-200 p-4 xl:p-6 shadow-sm">
                        <ProductFilters slug={slug} />
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="mb-6 md:mb-8 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-1 md:mb-2">Browse Products</h2>
                            <p className="text-sm md:text-base text-stone-600">{products?.pages?.[0]?.data.length} products</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="lg:hidden rounded-full border-stone-300 hover:border-stone-900 w-full sm:w-auto"
                                    >
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white px-4 sm:px-6">
                                    <div className="mt-6 sm:mt-8">
                                        <ProductFilters slug={slug} />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {products?.pages
                            .flatMap((page) => page.data)
                            .map((product) => (
                                <ProductCard
                                    id={product.id}
                                    key={product.slug}
                                    name={product.name}
                                    price={product.pricingCompareAtPrice ? parseFloat(product.pricingCompareAtPrice) : null}
                                    originalPrice={parseFloat(product.pricingPrice)}
                                    image={getProductImage(product.images)}
                                    category={product.categoryName}
                                    badge={product.badge}
                                    featured={product.featured}
                                    slug={product.slug}
                                    tenantSlug={slug}
                                    rating={product.reviewRating}
                                    reviews={product.reviewCount}
                                />
                            ))}
                    </div>

                    <div className="mt-8 md:mt-12 flex justify-center">
                        {hasNextPage && (
                            <Button
                                disabled={isFetchingNextPage}
                                onClick={handleLoadMore}
                                variant="outline"
                                size="lg"
                                className="min-w-[180px] sm:min-w-[200px] w-full sm:w-auto max-w-sm"
                            >
                                {isFetchingNextPage ? "Loading..." : "Load More Products"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <section className="mt-16 md:mt-20 py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl md:rounded-3xl px-4 md:px-8 lg:px-12">
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-amber-800 mb-3 md:mb-4">
                        <Award className="h-3 w-3 md:h-4 md:w-4" />
                        Editor&apos;s Choice
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2 md:mb-4">Featured This Week</h2>
                    <p className="text-base md:text-xl text-stone-600 max-w-2xl mx-auto px-4">
                        Handpicked products that showcase the best of our collection
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {featured.map(
                        (product) =>
                            product.featured && (
                                <ProductCard
                                    id={product.id}
                                    key={product.slug}
                                    name={product.name}
                                    price={product.pricingCompareAtPrice ? parseFloat(product.pricingCompareAtPrice) : null}
                                    originalPrice={parseFloat(product.pricingPrice)}
                                    image={getProductImage(product.images)}
                                    category={product.categoryName}
                                    badge={product.badge}
                                    featured={product.featured}
                                    slug={product.slug}
                                    tenantSlug={slug}
                                />
                            ),
                    )}
                </div>
            </section>
        </div>
    )
}
