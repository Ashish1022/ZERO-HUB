import Link from "next/link";
import { Suspense } from "react";
import { ProductsList } from "../components/products/products-list";
import { ProductHero } from "../components/products/product-hero";
import { ProductCardSkeleton } from "../components/products/product-card";

import { generateTenantUrl } from "@/lib/utils";

export const ProductView = ({ slug, product }: { slug: string; product: string }) => {
    return (
        <div className="container px-4 py-8 md:px-6 md:py-12 mx-auto">
            <nav className="mb-6 flex items-center gap-2 text-sm">
                <Link href={`${generateTenantUrl(slug)}`} className="text-stone-600 hover:text-amber-600 transition-colors">
                    Home
                </Link>
                <span className="text-stone-400">/</span>
                <Link href={`${generateTenantUrl(slug)}/products`} className="text-stone-600 hover:text-amber-600 transition-colors">
                    Products
                </Link>
            </nav>
            <ProductHero slug={slug} product={product} />
            <div className="mt-20">
                <h2 className="mb-8 text-3xl font-bold text-stone-900">You Might Also Like</h2>
                <Suspense fallback={
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                }>
                    <ProductsList slug={slug} />
                </Suspense>
            </div>
        </div>
    )
}