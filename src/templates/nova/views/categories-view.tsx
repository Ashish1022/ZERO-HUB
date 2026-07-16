import { Suspense } from "react"

import { NovaCategoriesList } from "../components/lists"
import { CategoryCardSkeleton } from "../components/category-card"

export const CategoriesView = ({ slug }: { slug: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <section className="relative overflow-hidden border-b border-tpl-line py-16">
            <div className="nova-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="container relative mx-auto px-4 md:px-6">
                <span className="nova-mono mb-3 block text-[10px] text-tpl-accent">Index</span>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-tpl-fg md:text-6xl">
                    Categories
                </h1>
                <p className="max-w-xl text-tpl-fg-muted">Pick a shelf and start narrowing down.</p>
            </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:px-6">
            <Suspense
                fallback={
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CategoryCardSkeleton key={index} />
                        ))}
                    </div>
                }
            >
                <NovaCategoriesList slug={slug} />
            </Suspense>
        </div>
    </div>
)
