import { Suspense } from "react"
import { Sparkles } from "lucide-react"
import { ProductsGrid } from "../components/products/products-grid"
import { FiltersSkeleton } from "../components/products/product-filters"
import { ProductCardSkeleton } from "../components/products/product-card"

import { Skeleton } from "@/components/ui/skeleton"

export const ProductsView = ({ slug }: { slug: string }) => {
    return (
        <div className="bg-gradient-to-b from-stone-50 to-white min-h-screen">
            <section className="relative py-16 md:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.png')] bg-cover bg-center opacity-5" />
                <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="container relative px-4 md:px-6 mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-stone-700 shadow-lg mb-6">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            Curated Collection
                        </div>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">All Products</h1>
                        <p className="mb-8 text-xl text-stone-600 leading-relaxed">
                            Discover our complete collection of thoughtfully designed products for modern living
                        </p>
                    </div>
                </div>
            </section>
            <Suspense fallback={<ProductsLoading />}>
                <ProductsGrid slug={slug} />
            </Suspense>
        </div>
    )
}

export function ProductsLoading() {
    return (
        <main>
            <div className="container px-4 py-8 md:px-6 md:py-12 mx-auto">
                <div className="mb-8 flex flex-col gap-2">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-5 w-64" />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                    <div className="hidden lg:block">
                        <div className="sticky top-24">
                            <FiltersSkeleton />
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[...Array(9)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Skeleton className="h-12 w-48 rounded-full mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}