"use client"

import Link from "next/link";

import { Facebook, Instagram, X } from "@/components/brand-icons";
import { Skeleton } from "@/components/ui/skeleton"
import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { memo, useMemo } from "react";

interface Props {
    slug: string
}

export const Footer = memo(({ slug }: Props) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

    const navigation = useMemo(() => [
        { name: "Home", href: generateTenantUrl(slug) },
        { name: "Shop", href: `${generateTenantUrl(slug)}/products` },
        { name: "Categories", href: `${generateTenantUrl(slug)}/categories` },
        { name: "Contact", href: `${generateTenantUrl(slug)}/contact` },
    ], [slug])

    return (
        <footer className="border-t bg-white">
            <div className="container px-4 py-12 md:px-6 lg:py-16 mx-auto">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <Link href={`${generateTenantUrl(slug)}`} className="text-2xl font-bold text-stone-900 hover:text-amber-600 transition-colors">
                        {data.storeName}
                    </Link>
                    <nav className="flex flex-wrap items-center justify-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-amber-600 relative group py-2 rounded-sm"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>
                    <div className="flex gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-stone-100 hover:text-amber-600 transition-colors"
                            asChild
                        >
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-stone-100 hover:text-amber-600 transition-colors"
                            asChild
                        >
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-stone-100 hover:text-amber-600 transition-colors"
                            asChild
                        >
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <X className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </Button>
                    </div>
                    <p className="text-sm text-stone-600">© 2025 {data.storeName}. All rights reserved.</p>
                </div>
            </div>
        </footer >
    )
})

Footer.displayName = "Footer"

export function FooterSkeleton() {
    return (
        <footer className="border-t bg-white">
            <div className="container px-4 py-12 md:px-6">
                <div className="flex flex-col items-center justify-center gap-8 text-center">
                    <Skeleton className="h-8 w-20" />

                    <div className="flex flex-wrap items-center justify-center gap-8">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-5 w-16" />
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-10 rounded-full" />
                        ))}
                    </div>

                    <Skeleton className="h-4 w-48" />
                </div>
            </div>
        </footer>
    )
}

FooterSkeleton.displayName = "FooterSkeleton"