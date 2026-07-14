import { Suspense } from "react"
import { CategoriesList } from "../components/categories/categories-list"
import { CategoryCardSkeleton } from "../components/categories/category-card"
import { FeaturedCategoriesList } from "../components/categories/featured-categories-list";

export const CategoriesListView = ({ slug, queryType }: { slug: string; queryType: 'infinite' | 'featured' }) => {
    return (
        <Suspense fallback={
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <CategoryCardSkeleton key={i} />
                ))}
            </div>
        }>
            {queryType === 'infinite' ? (

                <CategoriesList slug={slug} />
            ) : (
                <FeaturedCategoriesList slug={slug} />
            )}
        </Suspense>
    )
}