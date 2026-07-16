import Link from "next/link"
import { Suspense } from "react"
import { ChevronRight } from "lucide-react"

import { generateTenantUrl } from "@/lib/utils"
import { ProductHero } from "@/templates/shared"

import { NovaProductsList } from "../components/lists"
import { ProductCardSkeleton } from "../components/product-card"

export const ProductView = ({ slug, product }: { slug: string; product: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <nav aria-label="Breadcrumb" className="nova-mono mb-8 flex items-center gap-2 text-[10px]">
                <Link href={generateTenantUrl(slug)} className="text-tpl-fg-subtle hover:text-tpl-accent">
                    Home
                </Link>
                <ChevronRight className="h-3 w-3 text-tpl-fg-subtle" />
                <Link
                    href={`${generateTenantUrl(slug)}/products`}
                    className="text-tpl-fg-subtle hover:text-tpl-accent"
                >
                    Products
                </Link>
            </nav>

            <ProductHero slug={slug} product={product} />

            <section className="mt-20">
                <span className="nova-mono mb-2 block text-[10px] text-tpl-accent">Related</span>
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-tpl-fg">You might also like</h2>
                <Suspense
                    fallback={
                        <div className="grid grid-cols-2 gap-px bg-tpl-line sm:grid-cols-3 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    }
                >
                    <NovaProductsList slug={slug} limit={4} />
                </Suspense>
            </section>
        </div>
    </div>
)
