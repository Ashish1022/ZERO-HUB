"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Heart, Menu, ShoppingBag } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { generateTenantUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/modules/products/hooks/use-cart"
import { useWishlist } from "@/modules/products/hooks/use-wishlist"

export const HeaderSkeleton = () => (
    <header className="sticky top-0 z-50 w-full border-b border-tpl-line bg-tpl-surface/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
            <Skeleton className="h-9 w-9 lg:hidden" />
            <div className="flex flex-1 justify-center lg:justify-start">
                <Skeleton className="h-7 w-40" />
            </div>
            <nav className="hidden flex-1 justify-center gap-10 lg:flex">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-16" />
                ))}
            </nav>
            <div className="flex flex-1 justify-end gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
            </div>
        </div>
    </header>
)

HeaderSkeleton.displayName = "AtelierHeaderSkeleton"

export const Header = ({ slug }: { slug: string }) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))

    const [isOpen, setIsOpen] = useState(false)

    const navigation = useMemo(
        () => [
            { name: "Home", href: generateTenantUrl(slug) },
            { name: "Shop", href: `${generateTenantUrl(slug)}/products` },
            { name: "Categories", href: `${generateTenantUrl(slug)}/categories` },
            { name: "Contact", href: `${generateTenantUrl(slug)}/contact` },
        ],
        [slug],
    )

    const { wishlistItems } = useWishlist(slug)
    const { totalItems } = useCart(slug)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-tpl-line bg-tpl-surface/90 backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
                <div className="flex flex-1 items-center lg:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Open menu"
                                className="text-tpl-fg hover:bg-tpl-surface-muted"
                            >
                                <Menu className="h-5 w-5" strokeWidth={1.5} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full border-tpl-line bg-tpl-surface">
                            <SheetTitle className="sr-only">Menu</SheetTitle>
                            <nav className="mt-16 flex flex-col gap-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="atelier-serif border-b border-tpl-line px-2 py-4 text-xl text-tpl-fg transition-colors hover:text-tpl-accent"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                <nav className="hidden flex-1 justify-start gap-10 lg:flex">
                    {navigation.slice(0, 2).map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="atelier-tracked text-[10px] text-tpl-fg-muted transition-colors hover:text-tpl-accent"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <Link
                    href={generateTenantUrl(slug)}
                    className="atelier-serif flex-1 truncate text-center text-2xl tracking-tight text-tpl-fg"
                >
                    {data.storeName}
                </Link>

                <nav className="hidden flex-1 justify-end gap-10 lg:flex">
                    {navigation.slice(2).map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="atelier-tracked text-[10px] text-tpl-fg-muted transition-colors hover:text-tpl-accent"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end gap-1 lg:flex-none lg:pl-10">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="relative text-tpl-fg hover:bg-tpl-surface-muted"
                    >
                        <Link
                            href={`${generateTenantUrl(slug)}/wishlist`}
                            aria-label={`Wishlist, ${wishlistItems.length} items`}
                        >
                            <Heart className="h-4 w-4" strokeWidth={1.5} />
                            {wishlistItems.length > 0 && (
                                <span className="atelier-serif absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-tpl-accent px-1 text-[10px] text-tpl-accent-fg">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="relative text-tpl-fg hover:bg-tpl-surface-muted"
                    >
                        <Link
                            href={`${generateTenantUrl(slug)}/cart`}
                            aria-label={`Cart, ${totalItems} items`}
                        >
                            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="atelier-serif absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-tpl-fg px-1 text-[10px] text-tpl-surface">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
