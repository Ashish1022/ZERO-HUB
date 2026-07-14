"use client"

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Star } from "lucide-react";
import { ProductCard } from "../products/product-card";
import EmptyProducts from "../products/empty-products";
import { Suspense } from "react";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { SearchFilters } from "../search";
import { useProductFilters } from "@/modules/products/hooks/use-product-filter";

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

const CategoryHeroSection = ({ slug, category }: { slug: string; category: string }) => {
    const trpc = useTRPC();
    const { data: categoryData } = useSuspenseQuery(trpc.categories.getOne.queryOptions({ slug: slug, category: category }));

    return (
        <>
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.3),transparent_50%)]" />
                        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-amber-500/20 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
                    </div>
                </div>
                <div className="container px-4 md:px-6 relative mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="text-center lg:text-left">
                            {categoryData.featured && (
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg mb-6">
                                    <Award className="h-4 w-4" />
                                    Featured Collection
                                </div>
                            )}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-4">
                                {categoryData.name}
                            </h1>
                            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto lg:mx-0 mb-6" />
                            <p className="text-lg text-stone-300 max-w-2xl leading-relaxed mb-8">{categoryData.description}</p>
                            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 mb-8">
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl font-bold text-white mb-1">{categoryData.productCount}</div>
                                    <div className="text-sm text-stone-400 uppercase tracking-wide">Products</div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                                        <span className="text-3xl font-bold text-white">{4}</span>
                                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                    </div>
                                    <div className="text-sm text-stone-400 uppercase tracking-wide">Rating</div>
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="text-3xl font-bold text-white mb-1">2.3K</div>
                                    <div className="text-sm text-stone-400 uppercase tracking-wide">Customers</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-2xl"></div>
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shadow-2xl">
                                    <Image
                                        src={categoryData.thumbnail?.url || "/placeholder.png"}
                                        alt={`${categoryData.name} collection`}
                                        fill
                                        priority
                                        className="object-fit"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white border-b border-stone-200 sticky top-20 z-40 shadow-sm">
                <div className="container px-4 py-4 md:px-6 mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                            <Button size="sm" className="bg-stone-900 hover:bg-stone-800 text-white rounded-full whitespace-nowrap">
                                All Items
                            </Button>
                            {categoryData.subcategories.map((subcategory) => (
                                <Button
                                    key={subcategory.id}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full border-stone-300 hover:border-amber-500 hover:text-amber-600 whitespace-nowrap"
                                    asChild
                                >
                                    <Link href={`${generateTenantUrl(slug)}/categories/${subcategory.slug}`}>
                                        {subcategory.name}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <SearchFilters className="pl-10 w-64 rounded-full border-stone-300 focus:border-amber-500" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const CategoryProducts = ({ slug, category, categoryName }: { slug: string; category: string; categoryName: string }) => {
    const [filters] = useProductFilters()
    const trpc = useTRPC();

    const { data: productsData, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            ...filters,
            slug: slug,
            category: [category]
        },
        {
            getNextPageParam: (lastpage) => {
                return lastpage.data.length > 0 ? lastpage.nextCursor : undefined
            }
        }
    ))

    return (
        <section className="py-12">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-stone-900 mb-2">{categoryName} Collection</h2>
                    </div>
                    <div className="flex-shrink-0">
                        <Button
                            variant="outline"
                            className="border-stone-300 hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 rounded-full"
                            asChild
                        >
                            <Link href={`${generateTenantUrl(slug)}/products`} prefetch={false}>
                                View All Products
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
                {productsData?.pages?.[0]?.data.length === 0 ? (
                    <EmptyProducts
                        description={`We couldn't find any ${categoryName.toLowerCase()} products matching your current filters.`}
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {productsData?.pages.flatMap((page) => page.data).map((product, index) => (
                            <ProductCard
                                id={product.id}
                                key={product.slug}
                                name={product.name}
                                price={product.pricingCompareAtPrice ? parseFloat(product.pricingCompareAtPrice) : null}
                                originalPrice={parseFloat(product.pricingPrice)}
                                image={getProductImage(product.images)}
                                category={product.categoryName}
                                badge={product.badge}
                                featured={true}
                                slug={product.slug}
                                tenantSlug={slug}
                                priority={index < 2}
                                rating={product.reviewRating}
                                reviews={product.reviewCount}
                            />
                        ))}
                    </div>
                )}
                <div className="mt-16 text-center">
                    {hasNextPage && (
                        <Button
                            disabled={isFetchingNextPage}
                            onClick={() => fetchNextPage()}
                            size="lg"
                            variant="outline"
                            className="border-2 border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white px-12 py-6 text-lg rounded-full transition-all duration-300"
                        >
                            {isFetchingNextPage ? "Loading..." : "Load More Products"}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}

const ProductsSkeleton = () => {
    return (
        <section className="py-12">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                        <Skeleton className="h-8 w-48 mb-2" />
                    </div>
                    <div className="flex-shrink-0">
                        <Skeleton className="h-10 w-40 rounded-full" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-square w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-6 w-1/3" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export const CategoryHero = ({ slug, category }: { slug: string; category: string }) => {
    const trpc = useTRPC();
    const { data: categoryData } = useSuspenseQuery(trpc.categories.getOne.queryOptions({ slug: slug, category: category }));

    return (
        <>
            <CategoryHeroSection slug={slug} category={category} />

            <Suspense fallback={<ProductsSkeleton />}>
                <CategoryProducts
                    slug={slug}
                    category={category}
                    categoryName={categoryData.name}
                />
            </Suspense>
        </>
    )
}

export const CategoryHeroSkeleton = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
            <div className="container px-4 py-16 md:px-6 md:py-24 mx-auto">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <Skeleton className="h-8 w-40 rounded-full" />
                        </div>

                        <div className="mb-6">
                            <Skeleton className="h-12 w-full mb-2 md:h-16 lg:h-20" />
                            <Skeleton className="h-8 w-32 md:h-10 lg:h-12" />
                        </div>

                        <div className="mb-8">
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-5 w-4/5 mb-2" />
                            <Skeleton className="h-5 w-3/5" />
                        </div>

                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                                    ))}
                                </div>
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-center">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="p-4 rounded-lg bg-white/60 backdrop-blur-sm">
                                    <Skeleton className="h-8 w-12 mx-auto mb-1" />
                                    <Skeleton className="h-4 w-16 mx-auto" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                            <Skeleton className="h-full w-full" />
                        </div>

                        <div className="absolute -top-6 -right-6">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                        </div>
                        <div className="absolute -bottom-6 -left-6">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}