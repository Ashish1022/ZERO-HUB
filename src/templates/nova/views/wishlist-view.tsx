"use client"

import Link from "next/link"
import toast from "react-hot-toast"
import { ArrowRight, Heart, ShoppingBag } from "lucide-react"

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
        toast.success("Everything added to cart")
    }

    return (
        <div className="min-h-screen bg-tpl-surface">
            <section className="relative overflow-hidden border-b border-tpl-line py-16">
                <div className="nova-grid absolute inset-0 opacity-30" aria-hidden="true" />
                <div className="container relative mx-auto px-4 md:px-6">
                    <span className="nova-mono mb-3 block text-[10px] text-tpl-accent">Saved</span>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-tpl-fg md:text-6xl">Wishlist</h1>
                    <p className="text-tpl-fg-muted" aria-live="polite">
                        {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12 md:px-6">
                {isEmpty ? (
                    <div className="flex flex-col items-center border border-tpl-line bg-tpl-surface-raised py-24 text-center">
                        <Heart className="mb-6 h-12 w-12 text-tpl-fg-subtle" strokeWidth={1.5} />
                        <h2 className="mb-2 text-xl font-semibold text-tpl-fg">Nothing saved yet</h2>
                        <p className="mb-8 max-w-sm text-sm text-tpl-fg-muted">
                            Tap the heart on any product to keep it here for later.
                        </p>
                        <Button
                            asChild
                            className="nova-glow rounded-none bg-tpl-primary px-6 text-tpl-primary-fg hover:bg-tpl-primary-hover"
                        >
                            <Link href={`${generateTenantUrl(slug)}/products`} className="nova-mono text-xs">
                                Browse products
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 flex justify-end">
                            <Button
                                onClick={addAllToCart}
                                className="nova-glow rounded-none bg-tpl-primary text-tpl-primary-fg hover:bg-tpl-primary-hover"
                            >
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                <span className="nova-mono text-xs">Add all to cart</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-tpl-line sm:grid-cols-3 lg:grid-cols-4">
                            {products.map((product, index) => (
                                <ProductCard key={product.slug} {...product} priority={index < 4} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
