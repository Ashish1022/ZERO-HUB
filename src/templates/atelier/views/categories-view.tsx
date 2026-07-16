import { Suspense } from "react"

import { AtelierCategoriesList } from "../components/lists"
import { CategoryCardSkeleton } from "../components/category-card"

export const CategoriesView = ({ slug }: { slug: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <section className="border-b border-tpl-line py-20 md:py-28">
            <div className="container mx-auto px-4 text-center md:px-6">
                <span className="atelier-tracked mb-5 block text-[10px] text-tpl-fg-subtle">Index</span>
                <h1 className="atelier-serif mb-6 text-5xl tracking-tight text-tpl-fg md:text-7xl">
                    Collections
                </h1>
                <p className="mx-auto max-w-md text-base leading-relaxed text-tpl-fg-muted">
                    Grouped by what they are, not by what sells.
                </p>
            </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:px-6">
            <Suspense
                fallback={
                    <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-x-10">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CategoryCardSkeleton key={index} />
                        ))}
                    </div>
                }
            >
                <AtelierCategoriesList slug={slug} />
            </Suspense>
        </div>
    </div>
)
