import Link from "next/link";
import { Suspense } from "react";
import { CategoryHero, CategoryHeroSkeleton } from "../components/categories/category-hero";

import { generateTenantUrl } from "@/lib/utils";
import { CategoriesListView } from "./categories-list-view";

export const CategoryView = ({ slug, category }: { slug: string; category: string }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
            <div className="bg-white border-b border-stone-200">
                <div className="container px-4 py-4 md:px-6">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={`${generateTenantUrl(slug)}`} className="text-stone-600 hover:text-amber-600 transition-colors">
                            Home
                        </Link>
                        <span className="text-stone-400">/</span>
                        <Link href={`${generateTenantUrl(slug)}/categories`} className="text-stone-600 hover:text-amber-600 transition-colors">
                            Categories
                        </Link>
                    </nav>
                </div>
            </div>
            <Suspense fallback={<CategoryHeroSkeleton />}>
                <CategoryHero category={category} slug={slug} />
            </Suspense>
            <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
                <div className="container px-2 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-stone-900 mb-4">Complete Your Journey</h2>
                        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                            Discover complementary pieces that work perfectly together
                        </p>
                    </div>
                    <CategoriesListView slug={slug} queryType="featured" />
                </div>
            </section>
        </div>
    )
}