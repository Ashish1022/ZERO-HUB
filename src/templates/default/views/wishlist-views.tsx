"use client"

import { ArrowRight, Heart, ShoppingBag } from "lucide-react"
import toast from "react-hot-toast";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "../components/products/product-card";

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { useWishlist } from "@/modules/products/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { generateTenantUrl } from "@/lib/utils";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/modules/products/hooks/use-cart";

const EmptyWishlistState = ({ slug }: { slug: string }) => (
    <section
        className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white py-20 text-center shadow-sm"
        aria-label="Empty wishlist"
    >
        <div className="relative w-40 h-40 mb-8">
            <div className="absolute inset-0 bg-red-100 rounded-full opacity-50 animate-pulse" aria-hidden="true"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="h-20 w-20 text-red-500" strokeWidth={1.5} aria-hidden="true" />
            </div>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-stone-900">Your wishlist is empty</h2>
        <p className="mb-8 text-xl text-stone-600 max-w-md">
            Start adding products you love to keep track of them and shop later.
        </p>
        <Button
            asChild
            className="bg-stone-900 hover:bg-amber-600 text-white rounded-full px-8 py-6 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            size="lg"
        >
            <Link href={`${generateTenantUrl(slug)}/products`} className="flex items-center gap-2">
                Start Shopping
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
        </Button>
    </section>
)
EmptyWishlistState.displayName = 'EmptyWishlistState'

const WishlistHero = () => (
    <section className="relative py-16 md:py-20 overflow-hidden" aria-label="Wishlist header">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100/50 to-transparent" aria-hidden="true" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse delay-1000" aria-hidden="true" />

        <div className="container relative px-4 md:px-6 mx-auto">
            <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-stone-700 shadow-lg mb-6">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" aria-hidden="true" />
                    Your Favorites
                </div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
                    My Wishlist
                </h1>
                <p className="mb-8 text-xl text-stone-600 leading-relaxed">
                    Keep track of your favorite products and never miss out on the items you love
                </p>
            </div>
        </div>
    </section>
)
WishlistHero.displayName = 'WishlistHero'

export const WishlistView = ({ slug }: { slug: string }) => {

    const { wishlistItems, productIds } = useWishlist(slug);
    const { addProductToCart } = useCart(slug);

    const wishlistCount = wishlistItems.length
    const isEmpty = wishlistCount === 0

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.checkout.getMany.queryOptions({ productIds: productIds }));

    const handleAllAddToCart = () => {
        productIds.map((productId) => (addProductToCart(productId)))
        toast.success("Products added to cart!")
    }

    return (
        <div className="bg-gradient-to-b from-stone-50 to-white min-h-screen">
            <WishlistHero />
            <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
                {!isEmpty ? (
                    <>
                        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-stone-900 mb-2">Saved Items</h2>
                                <p className="text-stone-600" aria-live="polite">
                                    {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} in your wishlist
                                </p>
                            </div>
                        </header>
                        <Tabs defaultValue="grid" className="w-full">
                            <TabsContent value="grid" className="mt-0">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {data?.docs.map((product) => (
                                        <ProductCard
                                            id={product.id}
                                            key={product.slug}
                                            name={product.name}
                                            price={product.pricing.compareAtPrice}
                                            originalPrice={product.pricing.price}
                                            image={product.image?.url}
                                            category={product.category.name}
                                            badge={product.badge}
                                            featured={true}
                                            slug={product.slug}
                                            tenantSlug={slug}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                        <div className="mt-12 flex justify-center" role="region" aria-label="Wishlist actions">
                            <Button
                                className="bg-stone-900 hover:bg-amber-600 text-white rounded-full px-8 py-6 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                size="lg"
                                onClick={handleAllAddToCart}
                                disabled={productIds.length === 0}
                                aria-label={`Add all ${wishlistCount} products to cart`}
                            >
                                <ShoppingBag className="h-5 w-5 mr-2" aria-hidden="true" />
                                Add All to Cart ({wishlistCount})
                            </Button>
                        </div>
                    </>
                ) : (
                    <EmptyWishlistState slug={slug} />
                )}
            </div>
        </div>
    )
}

export default function WishlistLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
            <main role="main" aria-label="Loading wishlist">
                <section className="relative py-16 md:py-20 overflow-hidden" aria-label="Loading header">
                    <div className="container relative px-4 md:px-6 mx-auto">
                        <div className="mx-auto max-w-3xl text-center">
                            <Skeleton className="inline-block mb-6 h-8 w-32 rounded-full" />
                            <Skeleton className="h-12 w-64 mx-auto mb-6 md:h-16" />
                            <div className="mb-8 space-y-2">
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-3/4 mx-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
                    <section aria-label="Loading products">
                        <div className="mb-8">
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-5 w-40" />
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[...Array(8)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Skeleton className="h-14 w-48 rounded-full" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
