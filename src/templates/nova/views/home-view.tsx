import Link from "next/link"
import { Suspense } from "react"
import { ArrowRight, Cpu, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { generateTenantUrl } from "@/lib/utils"

import { NovaFeaturedCategories, NovaFeaturedProducts } from "../components/lists"
import { CategoryCardSkeleton } from "../components/category-card"
import { ProductCardSkeleton } from "../components/product-card"

const SPECS = [
    { icon: Truck, label: "Free shipping", detail: "On orders over ₹2,000" },
    { icon: ShieldCheck, label: "2-year warranty", detail: "On every product" },
    { icon: Cpu, label: "Tested & certified", detail: "Before it ships" },
] as const

const GridFallback = ({ card: Card, count }: { card: () => React.JSX.Element; count: number }) => (
    <div className="grid grid-cols-2 gap-px bg-tpl-line sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
            <Card key={index} />
        ))}
    </div>
)

export const HomeView = ({ slug }: { slug: string }) => (
    <div className="bg-tpl-surface">
        <section className="relative overflow-hidden border-b border-tpl-line py-24 md:py-32">
            <div className="nova-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <div
                className="nova-scanline absolute inset-x-0 top-0 h-32 bg-linear-to-b from-tpl-accent/10 to-transparent"
                style={{ animation: "nova-scan 6s linear infinite" }}
                aria-hidden="true"
            />
            <div className="container relative mx-auto px-4 md:px-6">
                <span className="nova-mono mb-6 inline-flex items-center gap-2 border border-tpl-accent px-3 py-1.5 text-[10px] text-tpl-accent">
                    <span className="nova-glow h-1.5 w-1.5 rounded-full bg-tpl-accent" />
                    New drop live
                </span>

                <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-tpl-fg md:text-7xl">
                    Built for
                    <span className="block text-tpl-accent">people who read specs</span>
                </h1>

                <p className="mb-10 max-w-xl text-lg leading-relaxed text-tpl-fg-muted">
                    No filler, no fluff. Every product here is chosen for what it does, tested before it
                    ships, and priced without theatre.
                </p>

                <Button
                    size="lg"
                    asChild
                    className="nova-glow rounded-none bg-tpl-primary px-8 py-6 text-sm font-semibold text-tpl-primary-fg hover:bg-tpl-primary-hover"
                >
                    <Link href={`${generateTenantUrl(slug)}/products`} className="nova-mono">
                        Browse everything
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </section>

        <section className="border-b border-tpl-line bg-tpl-surface-raised">
            <div className="container mx-auto grid grid-cols-1 divide-y divide-tpl-line px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-6">
                {SPECS.map(({ icon: Icon, label, detail }) => (
                    <div key={label} className="flex items-center gap-4 py-6 md:px-6">
                        <Icon className="h-5 w-5 shrink-0 text-tpl-accent" />
                        <div>
                            <p className="text-sm font-medium text-tpl-fg">{label}</p>
                            <p className="text-xs text-tpl-fg-muted">{detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="container mx-auto px-4 py-20 md:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <span className="nova-mono mb-2 block text-[10px] text-tpl-accent">Featured</span>
                    <h2 className="text-3xl font-bold tracking-tight text-tpl-fg">This week&apos;s picks</h2>
                </div>
                <Link
                    href={`${generateTenantUrl(slug)}/products`}
                    prefetch={false}
                    className="nova-mono hidden shrink-0 items-center gap-2 text-xs text-tpl-accent hover:underline sm:flex"
                >
                    All products
                    <ArrowRight className="h-3 w-3" />
                </Link>
            </div>
            <Suspense fallback={<GridFallback card={ProductCardSkeleton} count={8} />}>
                <NovaFeaturedProducts slug={slug} />
            </Suspense>
        </section>

        <section className="border-t border-tpl-line bg-tpl-surface-muted">
            <div className="container mx-auto px-4 py-20 md:px-6">
                <div className="mb-8">
                    <span className="nova-mono mb-2 block text-[10px] text-tpl-accent">Categories</span>
                    <h2 className="text-3xl font-bold tracking-tight text-tpl-fg">Shop by category</h2>
                </div>
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <CategoryCardSkeleton key={index} />
                            ))}
                        </div>
                    }
                >
                    <NovaFeaturedCategories slug={slug} />
                </Suspense>
            </div>
        </section>
    </div>
)
