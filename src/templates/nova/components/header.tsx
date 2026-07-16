"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Heart, Menu, ShoppingBag, Zap } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { generateTenantUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/modules/products/hooks/use-cart"
import { useWishlist } from "@/modules/products/hooks/use-wishlist"

export const HeaderSkeleton = () => (
    <header className="sticky top-0 z-50 w-full border-b border-tpl-line bg-tpl-surface/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
            <Skeleton className="h-9 w-9 shrink-0 lg:hidden" />
            <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 shrink-0 rounded-tpl" />
                <Skeleton className="h-6 w-28" />
            </div>
            <nav className="hidden grow gap-8 lg:flex">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-14" />
                ))}
            </nav>
            <div className="ml-auto flex gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
            </div>
        </div>
    </header>
)

HeaderSkeleton.displayName = "NovaHeaderSkeleton"

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
        <header className="sticky top-0 z-50 w-full border-b border-tpl-line bg-tpl-surface/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open menu"
                            className="mr-2 text-tpl-fg hover:bg-tpl-surface-raised hover:text-tpl-accent lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full border-tpl-line bg-tpl-surface">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <nav className="mt-14 flex flex-col">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="nova-mono border-b border-tpl-line p-4 text-sm text-tpl-fg-muted transition-colors hover:text-tpl-accent"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                <Link href={generateTenantUrl(slug)} className="mr-10 flex items-center gap-3">
                    <span className="nova-glow flex h-9 w-9 items-center justify-center rounded-tpl bg-tpl-accent">
                        <Zap className="h-4 w-4 text-tpl-accent-fg" strokeWidth={2.5} />
                    </span>
                    <span className="max-w-35 truncate text-lg font-semibold tracking-tight text-tpl-fg sm:max-w-none">
                        {data.storeName}
                    </span>
                </Link>

                <nav className="hidden lg:flex lg:gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="nova-mono group relative py-2 text-xs text-tpl-fg-muted transition-colors hover:text-tpl-accent"
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-0 h-px w-0 bg-tpl-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="relative text-tpl-fg hover:bg-tpl-surface-raised hover:text-tpl-accent"
                    >
                        <Link
                            href={`${generateTenantUrl(slug)}/wishlist`}
                            aria-label={`Wishlist, ${wishlistItems.length} items`}
                        >
                            <Heart className="h-5 w-5" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tpl-critical px-1 text-[10px] font-medium text-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="relative text-tpl-fg hover:bg-tpl-surface-raised hover:text-tpl-accent"
                    >
                        <Link
                            href={`${generateTenantUrl(slug)}/cart`}
                            aria-label={`Cart, ${totalItems} items`}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="nova-glow absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tpl-accent px-1 text-[10px] font-medium text-tpl-accent-fg">
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
