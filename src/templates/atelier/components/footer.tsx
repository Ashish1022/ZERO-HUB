"use client"

import Link from "next/link"
import { memo } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { generateTenantUrl } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export function FooterSkeleton() {
    return (
        <footer className="border-t border-tpl-line bg-tpl-surface">
            <div className="container mx-auto px-4 py-20 md:px-6">
                <div className="mx-auto mb-16 max-w-md text-center">
                    <Skeleton className="mx-auto mb-4 h-8 w-48" />
                    <Skeleton className="mx-auto h-4 w-full" />
                </div>
                <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}

const LINKS = {
    Shop: [
        { name: "All products", path: "/products" },
        { name: "Categories", path: "/categories" },
        { name: "Wishlist", path: "/wishlist" },
    ],
    Orders: [
        { name: "Cart", path: "/cart" },
        { name: "Checkout", path: "/checkout" },
    ],
    Studio: [{ name: "Contact", path: "/contact" }],
} as const

export const Footer = memo(({ slug }: { slug: string }) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))

    return (
        <footer className="border-t border-tpl-line bg-tpl-surface">
            <div className="container mx-auto px-4 py-20 md:px-6">
                <div className="mx-auto mb-16 max-w-md text-center">
                    <Link
                        href={generateTenantUrl(slug)}
                        className="atelier-serif mb-4 block text-3xl tracking-tight text-tpl-fg"
                    >
                        {data.storeName}
                    </Link>
                    <p className="text-sm leading-relaxed text-tpl-fg-muted">
                        Considered pieces, made to last and chosen with care.
                    </p>
                </div>

                <div className="atelier-rule mb-12 h-px w-full" aria-hidden="true" />

                <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                    {Object.entries(LINKS).map(([heading, links]) => (
                        <div key={heading}>
                            <h3 className="atelier-tracked mb-5 text-[10px] text-tpl-fg-subtle">{heading}</h3>
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={`${generateTenantUrl(slug)}${link.path}`}
                                            prefetch={false}
                                            className="atelier-serif text-base text-tpl-fg-muted transition-colors hover:text-tpl-accent"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="atelier-tracked mt-16 text-center text-[10px] text-tpl-fg-subtle">
                    © {new Date().getFullYear()} {data.storeName}
                </p>
            </div>
        </footer>
    )
})

Footer.displayName = "AtelierFooter"
