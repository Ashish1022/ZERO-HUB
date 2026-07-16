"use client"

import Link from "next/link"
import toast from "react-hot-toast"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { generateTenantUrl } from "@/lib/utils"
import { useCart } from "@/modules/products/hooks/use-cart"
import { useWishlist } from "@/modules/products/hooks/use-wishlist"
import { useWishlistProducts } from "@/templates/shared"

import { ProductCard } from "../components/product-card"

export const WishlistView = ({ slug }: { slug: string }) => {
    const { wishlistItems, productIds } = useWishlist(slug)
    const { addProductToCart } = useCart(slug)
    const products = useWishlistProducts(slug, productIds)

    const isEmpty = wishlistItems.length === 0

    const addAllToCart = () => {
        productIds.forEach((productId) => addProductToCart(productId))
        toast.success("Everything added to your cart")
    }

    return (
        <div className="min-h-screen bg-tpl-surface">
            <section className="border-b border-tpl-line py-20 md:py-28">
                <div className="container mx-auto px-4 text-center md:px-6">
                    <span className="atelier-tracked mb-5 block text-[10px] text-tpl-fg-subtle">Kept</span>
                    <h1 className="atelier-serif mb-6 text-5xl tracking-tight text-tpl-fg md:text-7xl">
                        Your list
                    </h1>
                    <p className="text-base text-tpl-fg-muted" aria-live="polite">
                        {wishlistItems.length} {wishlistItems.length === 1 ? "piece" : "pieces"} saved
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 md:px-6">
                {isEmpty ? (
                    <div className="flex flex-col items-center py-24 text-center">
                        <Heart className="mb-8 h-10 w-10 text-tpl-fg-subtle" strokeWidth={1} />
                        <h2 className="atelier-serif mb-3 text-2xl text-tpl-fg">Nothing kept yet</h2>
                        <p className="mb-10 max-w-sm text-sm leading-relaxed text-tpl-fg-muted">
                            Save anything you&apos;re still thinking about, and it will wait here for you.
                        </p>
                        <Button
                            asChild
                            className="rounded-tpl bg-tpl-primary px-8 py-5 text-tpl-primary-fg hover:bg-tpl-primary-hover"
                        >
                            <Link
                                href={`${generateTenantUrl(slug)}/products`}
                                className="atelier-tracked text-[10px]"
                            >
                                View the collection
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="mb-12 flex justify-center">
                            <button
                                type="button"
                                onClick={addAllToCart}
                                className="atelier-tracked border-b border-tpl-fg pb-1 text-[10px] text-tpl-fg transition-colors hover:border-tpl-accent hover:text-tpl-accent"
                            >
                                Add everything to cart
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
                            {products.map((product, index) => (
                                <ProductCard key={product.slug} {...product} priority={index < 3} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
