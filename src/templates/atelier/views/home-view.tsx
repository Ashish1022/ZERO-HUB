import Link from "next/link"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { generateTenantUrl } from "@/lib/utils"

import { AtelierFeaturedCategories, AtelierFeaturedProducts } from "../components/lists"
import { CategoryCardSkeleton } from "../components/category-card"
import { ProductCardSkeleton } from "../components/product-card"

export const HomeView = ({ slug }: { slug: string }) => (
    <div className="bg-tpl-surface">
        <section className="border-b border-tpl-line py-28 md:py-40">
            <div className="container mx-auto px-4 text-center md:px-6">
                <span className="atelier-tracked mb-6 block text-[10px] text-tpl-fg-subtle">
                    Established for the considered
                </span>

                <h1 className="atelier-serif mx-auto mb-10 max-w-3xl text-5xl leading-[1.1] tracking-tight text-tpl-fg md:text-7xl">
                    Fewer things,
                    <span className="block italic text-tpl-accent">chosen well</span>
                </h1>

                <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-tpl-fg-muted">
                    A small collection of pieces we would keep ourselves — made properly, priced
                    honestly, and meant to stay.
                </p>

                <Button
                    size="lg"
                    asChild
                    className="rounded-tpl bg-tpl-primary px-10 py-6 text-tpl-primary-fg hover:bg-tpl-primary-hover"
                >
                    <Link href={`${generateTenantUrl(slug)}/products`} className="atelier-tracked text-[10px]">
                        View the collection
                    </Link>
                </Button>
            </div>
        </section>

        <section className="container mx-auto px-4 py-24 md:px-6">
            <div className="mb-14 text-center">
                <span className="atelier-tracked mb-3 block text-[10px] text-tpl-fg-subtle">Collections</span>
                <h2 className="atelier-serif text-4xl tracking-tight text-tpl-fg">Browse by collection</h2>
            </div>
            <Suspense
                fallback={
                    <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-x-10">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CategoryCardSkeleton key={index} />
                        ))}
                    </div>
                }
            >
                <AtelierFeaturedCategories slug={slug} />
            </Suspense>
        </section>

        <section className="border-t border-tpl-line bg-tpl-surface-muted">
            <div className="container mx-auto px-4 py-24 md:px-6">
                <div className="mb-14 text-center">
                    <span className="atelier-tracked mb-3 block text-[10px] text-tpl-fg-subtle">Selected</span>
                    <h2 className="atelier-serif text-4xl tracking-tight text-tpl-fg">This season&apos;s pieces</h2>
                </div>
                <Suspense
                    fallback={
                        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    }
                >
                    <AtelierFeaturedProducts slug={slug} />
                </Suspense>

                <div className="mt-16 text-center">
                    <Link
                        href={`${generateTenantUrl(slug)}/products`}
                        prefetch={false}
                        className="atelier-tracked border-b border-tpl-fg pb-1 text-[10px] text-tpl-fg transition-colors hover:border-tpl-accent hover:text-tpl-accent"
                    >
                        See everything
                    </Link>
                </div>
            </div>
        </section>
    </div>
)
