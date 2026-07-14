import { Suspense } from "react"
import { ProductCardSkeleton } from "../components/products/product-card"
import { ProductsList } from "../components/products/products-list"
import { FeaturedProductsList } from "../components/products/featured-products-list";

export const ProductsListView = ({ slug, queryType }: { slug: string; queryType: 'infinite' | 'featured' }) => {
    return (
        <div>
            <Suspense fallback={
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            }>
                {queryType === 'infinite' ? (
                    <ProductsList slug={slug} />
                ) : (
                    <FeaturedProductsList slug={slug} />
                )}
            </Suspense>
        </div>
    )
}