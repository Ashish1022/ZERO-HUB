"use client"

import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, Menu, ShoppingBag, Sparkles } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useWishlist } from "@/modules/products/hooks/use-wishlist";
import { useCart } from "@/modules/products/hooks/use-cart";

export const HeaderSkeleton = () => (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
        <div className="container flex h-16 sm:h-20 items-center px-4 md:px-6 mx-auto">
            <div className="w-11 h-9 ml-2 lg:hidden flex-shrink-0">
                <Skeleton className="h-9 w-9" />
            </div>

            <div className="mr-4 sm:mr-8 flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
                <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex-shrink-0" />
                <Skeleton className="h-6 sm:h-8 w-24 sm:w-32 flex-shrink-0" />
            </div>

            <nav className="hidden lg:flex lg:gap-6 xl:gap-8 flex-grow">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-12 sm:w-16 flex-shrink-0" />
                ))}
            </nav>

            <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="relative">
                        <Skeleton className="h-9 w-9" />
                    </div>
                ))}
            </div>
        </div>
    </header>
)

HeaderSkeleton.displayName = "HeaderSkeleton"

export const Header = ({ slug }: { slug: string }) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

    const navigation = useMemo(() => [
        { name: "Home", href: generateTenantUrl(slug) },
        { name: "Shop", href: `${generateTenantUrl(slug)}/products` },
        { name: "Categories", href: `${generateTenantUrl(slug)}/categories` },
        { name: "Contact", href: `${generateTenantUrl(slug)}/contact` },
    ], [slug]);

    const [isOpen, setIsOpen] = useState(false)

    const handleLinkClick = () => {
        setIsOpen(false)
    }

    const { wishlistItems } = useWishlist(slug)
    const { totalItems } = useCart(slug);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
            <div className="container flex h-16 sm:h-20 items-center px-4 md:px-6 mx-auto">
                <Link
                    href={`${generateTenantUrl(slug)}`}
                    className="mr-4 sm:mr-8 flex items-center gap-2 sm:gap-3 rounded-lg p-1 -m-1"
                >
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-stone-900 to-stone-700 bg-clip-text text-transparent truncate max-w-[120px] sm:max-w-none">
                        {data.storeName}
                    </span>
                </Link>
                <nav className="hidden lg:flex lg:gap-6 xl:gap-8">
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
                <div className="ml-auto flex items-center gap-1 sm:gap-2">

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-stone-100 relative"
                        asChild
                    >
                        <Link href={`${generateTenantUrl(slug)}/wishlist`} aria-label="Wishlist (3 items)">
                            <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="absolute -right-0.5 -top-0.5 sm:-right-1 sm:-top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-[9px] sm:text-[10px] text-white font-medium">
                                {wishlistItems.length}
                            </span>
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-stone-100 relative"
                        asChild
                    >
                        <Link href={`${generateTenantUrl(slug)}/cart`} aria-label="Shopping cart">
                            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="absolute -right-0.5 -top-0.5 sm:-right-1 sm:-top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-amber-500 text-[9px] sm:text-[10px] text-white font-medium animate-pulse">
                                {totalItems}
                            </span>
                        </Link>
                    </Button>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 lg:hidden hover:bg-stone-100"
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full bg-white">
                        <nav className="flex flex-col gap-4 sm:gap-6 mt-12 sm:mt-16">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className="text-base sm:text-lg font-medium transition-colors hover:text-amber-600 border-b border-stone-100 p-3 rounded-sm"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}