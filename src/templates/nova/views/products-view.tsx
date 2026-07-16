import { Suspense } from "react"

import { NovaProductsList } from "../components/lists"
import { ProductCardSkeleton } from "../components/product-card"

export const ProductsView = ({ slug }: { slug: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <section className="relative overflow-hidden border-b border-tpl-line py-16">
            <div className="nova-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="container relative mx-auto px-4 md:px-6">
                <span className="nova-mono mb-3 block text-[10px] text-tpl-accent">Catalogue</span>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-tpl-fg md:text-6xl">
                    All products
                </h1>
                <p className="max-w-xl text-tpl-fg-muted">
                    Everything in stock, no sponsored placement, no reordering by margin.
                </p>
            </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:px-6">
            <Suspense
                fallback={
                    <div className="grid grid-cols-2 gap-px bg-tpl-line sm:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                }
            >
                <NovaProductsList slug={slug} />
            </Suspense>
        </div>
    </div>
)
