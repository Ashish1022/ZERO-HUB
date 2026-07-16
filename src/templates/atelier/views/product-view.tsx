import Link from "next/link"
import { Suspense } from "react"

import { generateTenantUrl } from "@/lib/utils"
import { ProductHero } from "@/templates/shared"

import { AtelierProductsList } from "../components/lists"
import { ProductCardSkeleton } from "../components/product-card"

export const ProductView = ({ slug, product }: { slug: string; product: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <div className="container mx-auto px-4 py-10 md:px-6 md:py-16">
            <nav
                aria-label="Breadcrumb"
                className="atelier-tracked mb-10 flex items-center gap-3 text-[9px] text-tpl-fg-subtle"
            >
                <Link href={generateTenantUrl(slug)} className="hover:text-tpl-accent">
                    Home
                </Link>
                <span aria-hidden="true">·</span>
                <Link href={`${generateTenantUrl(slug)}/products`} className="hover:text-tpl-accent">
                    Collection
                </Link>
            </nav>

            <ProductHero slug={slug} product={product} />

            <section className="mt-28">
                <div className="mb-14 text-center">
                    <span className="atelier-tracked mb-3 block text-[10px] text-tpl-fg-subtle">
                        Also consider
                    </span>
                    <h2 className="atelier-serif text-4xl tracking-tight text-tpl-fg">You might also like</h2>
                </div>
                <Suspense
                    fallback={
                        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    }
                >
                    <AtelierProductsList slug={slug} limit={3} />
                </Suspense>
            </section>
        </div>
    </div>
)
