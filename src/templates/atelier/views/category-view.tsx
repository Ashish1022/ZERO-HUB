"use client"

import Link from "next/link"
import { Suspense } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { generateTenantUrl } from "@/lib/utils"

import { AtelierCategoryProducts } from "../components/lists"
import { ProductCardSkeleton } from "../components/product-card"

const CategoryHeader = ({ slug, category }: { slug: string; category: string }) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.categories.getOne.queryOptions({ slug, category }))

    return (
        <section className="border-b border-tpl-line py-20 md:py-28">
            <div className="container mx-auto px-4 text-center md:px-6">
                <nav
                    aria-label="Breadcrumb"
                    className="atelier-tracked mb-6 flex items-center justify-center gap-3 text-[9px] text-tpl-fg-subtle"
                >
                    <Link href={generateTenantUrl(slug)} className="hover:text-tpl-accent">
                        Home
                    </Link>
                    <span aria-hidden="true">·</span>
                    <Link href={`${generateTenantUrl(slug)}/categories`} className="hover:text-tpl-accent">
                        Collections
                    </Link>
                </nav>

                <h1 className="atelier-serif mb-6 text-5xl tracking-tight text-tpl-fg md:text-7xl">
                    {data.name}
                </h1>
                {data.description && (
                    <p className="mx-auto max-w-md text-base leading-relaxed text-tpl-fg-muted">
                        {data.description}
                    </p>
                )}
            </div>
        </section>
    )
}

const HeaderFallback = () => (
    <section className="border-b border-tpl-line py-20 md:py-28">
        <div className="container mx-auto flex flex-col items-center px-4 md:px-6">
            <div className="mb-6 h-3 w-40 animate-pulse rounded-tpl bg-tpl-line" />
            <div className="mb-6 h-14 w-72 animate-pulse rounded-tpl bg-tpl-line md:h-20 md:w-96" />
            <div className="h-4 w-full max-w-md animate-pulse rounded-tpl bg-tpl-line" />
        </div>
    </section>
)

export const CategoryView = ({ slug, category }: { slug: string; category: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <Suspense fallback={<HeaderFallback />}>
            <CategoryHeader slug={slug} category={category} />
        </Suspense>

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
                <AtelierCategoryProducts slug={slug} category={category} />
            </Suspense>
        </div>
    </div>
)
