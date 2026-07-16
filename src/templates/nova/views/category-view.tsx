"use client"

import Link from "next/link"
import { Suspense } from "react"
import { ChevronRight } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { generateTenantUrl } from "@/lib/utils"

import { NovaCategoryProducts } from "../components/lists"
import { ProductCardSkeleton } from "../components/product-card"

const CategoryHeader = ({ slug, category }: { slug: string; category: string }) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.categories.getOne.queryOptions({ slug, category }))

    return (
        <section className="relative overflow-hidden border-b border-tpl-line py-16">
            <div className="nova-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="container relative mx-auto px-4 md:px-6">
                <nav aria-label="Breadcrumb" className="nova-mono mb-6 flex items-center gap-2 text-[10px]">
                    <Link href={generateTenantUrl(slug)} className="text-tpl-fg-subtle hover:text-tpl-accent">
                        Home
                    </Link>
                    <ChevronRight className="h-3 w-3 text-tpl-fg-subtle" />
                    <Link
                        href={`${generateTenantUrl(slug)}/categories`}
                        className="text-tpl-fg-subtle hover:text-tpl-accent"
                    >
                        Categories
                    </Link>
                    <ChevronRight className="h-3 w-3 text-tpl-fg-subtle" />
                    <span className="text-tpl-accent">{data.name}</span>
                </nav>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-tpl-fg md:text-6xl">{data.name}</h1>
                {data.description && (
                    <p className="max-w-xl text-tpl-fg-muted">{data.description}</p>
                )}
            </div>
        </section>
    )
}

const HeaderFallback = () => (
    <section className="border-b border-tpl-line py-16">
        <div className="container mx-auto px-4 md:px-6">
            <div className="mb-6 h-3 w-40 animate-pulse bg-tpl-line" />
            <div className="mb-4 h-12 w-72 animate-pulse bg-tpl-line md:h-16" />
            <div className="h-4 w-full max-w-xl animate-pulse bg-tpl-line" />
        </div>
    </section>
)

export const CategoryView = ({ slug, category }: { slug: string; category: string }) => (
    <div className="min-h-screen bg-tpl-surface">
        <Suspense fallback={<HeaderFallback />}>
            <CategoryHeader slug={slug} category={category} />
        </Suspense>

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
                <NovaCategoryProducts slug={slug} category={category} />
            </Suspense>
        </div>
    </div>
)
