"use client"

import { ProductCard } from "./product-card"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

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

export const FeaturedProductsList = ({ slug }: { slug: string; }) => {
    const trpc = useTRPC()

    const { data } = useSuspenseQuery(trpc.products.getFeatured.queryOptions({
        slug: slug,
    }))

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            {data.map((product, index) => (
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
    )
}