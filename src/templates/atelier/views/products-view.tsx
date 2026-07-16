import { Suspense } from "react"

import { AtelierProductsList } from "../components/lists"
import { ProductCardSkeleton } from "../components/product-card"

export const ProductsView = ({ slug }: { slug: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <section className="border-b border-tpl-line py-20 md:py-28">
            <div className="container mx-auto px-4 text-center md:px-6">
                <span className="atelier-tracked mb-5 block text-[10px] text-tpl-fg-subtle">The collection</span>
                <h1 className="atelier-serif mb-6 text-5xl tracking-tight text-tpl-fg md:text-7xl">
                    All pieces
                </h1>
                <p className="mx-auto max-w-md text-base leading-relaxed text-tpl-fg-muted">
                    Everything currently in the studio, in no particular hurry.
                </p>
            </div>
        </section>

        <div className="container mx-auto px-4 py-16 md:px-6">
            <Suspense
                fallback={
                    <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                }
            >
                <AtelierProductsList slug={slug} />
            </Suspense>
        </div>
    </div>
)
