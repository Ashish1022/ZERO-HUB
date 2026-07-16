"use client"

import { useFeaturedCategories, useFeaturedProducts, useProductsList, useCategoriesList } from "@/templates/shared"

import { CategoryCard } from "./category-card"
import { ProductCard } from "./product-card"

const PRODUCT_GRID = "grid grid-cols-2 gap-px bg-tpl-line sm:grid-cols-3 lg:grid-cols-4"
const CATEGORY_GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"

const EmptyState = ({ message }: { message: string }) => (
    <div className="border border-tpl-line bg-tpl-surface-raised py-20 text-center">
        <p className="nova-mono text-xs text-tpl-fg-subtle">{message}</p>
    </div>
)

export const NovaFeaturedProducts = ({ slug }: { slug: string }) => {
    const products = useFeaturedProducts(slug)
    if (products.length === 0) return <EmptyState message="No featured products yet" />

    return (
        <div className={PRODUCT_GRID}>
            {products.map((product, index) => (
                <ProductCard key={product.slug} {...product} priority={index < 4} />
            ))}
        </div>
    )
}

export const NovaProductsList = ({ slug, limit = 12 }: { slug: string; limit?: number }) => {
    const products = useProductsList(slug, { limit })
    if (products.length === 0) return <EmptyState message="No products found" />

    return (
        <div className={PRODUCT_GRID}>
            {products.map((product, index) => (
                <ProductCard key={product.slug} {...product} priority={index < 4} />
            ))}
        </div>
    )
}

export const NovaCategoryProducts = ({ slug, category }: { slug: string; category: string }) => {
    const products = useProductsList(slug, { category: [category] })
    if (products.length === 0) return <EmptyState message="Nothing in this category yet" />

    return (
        <div className={PRODUCT_GRID}>
            {products.map((product, index) => (
                <ProductCard key={product.slug} {...product} priority={index < 4} />
            ))}
        </div>
    )
}

export const NovaFeaturedCategories = ({ slug }: { slug: string }) => {
    const categories = useFeaturedCategories(slug)
    if (categories.length === 0) return <EmptyState message="No featured categories yet" />

    return (
        <div className={CATEGORY_GRID}>
            {categories.map((category) => (
                <CategoryCard key={category.slug} {...category} />
            ))}
        </div>
    )
}

export const NovaCategoriesList = ({ slug }: { slug: string }) => {
    const categories = useCategoriesList(slug)
    if (categories.length === 0) return <EmptyState message="No categories yet" />

    return (
        <div className={CATEGORY_GRID}>
            {categories.map((category) => (
                <CategoryCard key={category.slug} {...category} />
            ))}
        </div>
    )
}
