"use client"

import Link from "next/link"
import { memo } from "react"
import { Zap } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { generateTenantUrl } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export function FooterSkeleton() {
    return (
        <footer className="border-t border-tpl-line bg-tpl-surface">
            <div className="container mx-auto px-4 py-14 md:px-6">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-16" />
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
    Account: [
        { name: "Cart", path: "/cart" },
        { name: "Checkout", path: "/checkout" },
    ],
    Support: [{ name: "Contact", path: "/contact" }],
} as const

export const Footer = memo(({ slug }: { slug: string }) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))

    return (
        <footer className="relative overflow-hidden border-t border-tpl-line bg-tpl-surface">
            <div className="nova-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="container relative mx-auto px-4 py-14 md:px-6">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href={generateTenantUrl(slug)} className="mb-4 flex items-center gap-3">
                            <span className="nova-glow flex h-8 w-8 items-center justify-center rounded-tpl bg-tpl-accent">
                                <Zap className="h-4 w-4 text-tpl-accent-fg" strokeWidth={2.5} />
                            </span>
                            <span className="text-base font-semibold text-tpl-fg">{data.storeName}</span>
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-tpl-fg-muted">
                            Engineered products, shipped fast.
                        </p>
                    </div>

                    {Object.entries(LINKS).map(([heading, links]) => (
                        <div key={heading}>
                            <h3 className="nova-mono mb-4 text-xs text-tpl-accent">{heading}</h3>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={`${generateTenantUrl(slug)}${link.path}`}
                                            prefetch={false}
                                            className="text-sm text-tpl-fg-muted transition-colors hover:text-tpl-accent"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 border-t border-tpl-line pt-6">
                    <p className="nova-mono text-xs text-tpl-fg-subtle">
                        © {new Date().getFullYear()} {data.storeName}
                    </p>
                </div>
            </div>
        </footer>
    )
})

Footer.displayName = "NovaFooter"
