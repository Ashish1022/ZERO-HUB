"use client"

import {
    useCategoriesList,
    useFeaturedCategories,
    useFeaturedProducts,
    useProductsList,
} from "@/templates/shared"

import { CategoryCard } from "./category-card"
import { ProductCard } from "./product-card"

const PRODUCT_GRID = "grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10"
const CATEGORY_GRID = "grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-x-10"

const EmptyState = ({ message }: { message: string }) => (
    <div className="py-24 text-center">
        <p className="atelier-serif text-lg text-tpl-fg-subtle">{message}</p>
    </div>
)

export const AtelierFeaturedProducts = ({ slug }: { slug: string }) => {
    const products = useFeaturedProducts(slug)
    if (products.length === 0) return <EmptyState message="No featured pieces yet" />

    return (
        <div className={PRODUCT_GRID}>
            {products.map((product, index) => (
                <ProductCard key={product.slug} {...product} priority={index < 3} />
            ))}
        </div>
    )
}

export const AtelierProductsList = ({ slug, limit = 12 }: { slug: string; limit?: number }) => {
    const products = useProductsList(slug, { limit })
    if (products.length === 0) return <EmptyState message="Nothing here yet" />

    return (
        <div className={PRODUCT_GRID}>
            {products.map((product, index) => (
                <ProductCard key={product.slug} {...product} priority={index < 3} />
            ))}
        </div>
    )
}

export const AtelierCategoryProducts = ({ slug, category }: { slug: string; category: string }) => {
    const products = useProductsList(slug, { category: [category] })
    if (products.length === 0) return <EmptyState message="Nothing in this collection yet" />

    return (
        <div className={PRODUCT_GRID}>
            {products.map((product, index) => (
                <ProductCard key={product.slug} {...product} priority={index < 3} />
            ))}
        </div>
    )
}

export const AtelierFeaturedCategories = ({ slug }: { slug: string }) => {
    const categories = useFeaturedCategories(slug)
    if (categories.length === 0) return <EmptyState message="No collections yet" />

    return (
        <div className={CATEGORY_GRID}>
            {categories.map((category, index) => (
                <CategoryCard key={category.slug} {...category} index={index} />
            ))}
        </div>
    )
}

export const AtelierCategoriesList = ({ slug }: { slug: string }) => {
    const categories = useCategoriesList(slug)
    if (categories.length === 0) return <EmptyState message="No collections yet" />

    return (
        <div className={CATEGORY_GRID}>
            {categories.map((category, index) => (
                <CategoryCard key={category.slug} {...category} index={index} />
            ))}
        </div>
    )
}
