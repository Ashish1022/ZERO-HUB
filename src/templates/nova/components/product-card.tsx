"use client"

import Link from "next/link"
import Image from "next/image"
import toast from "react-hot-toast"
import { Heart, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice, generateTenantUrl } from "@/lib/utils"
import { useCart } from "@/modules/products/hooks/use-cart"
import { useWishlist } from "@/modules/products/hooks/use-wishlist"
import type { ProductCardData } from "@/templates/shared"

export function ProductCardSkeleton() {
    return (
        <div className="flex h-full flex-col border border-tpl-line bg-tpl-surface-raised">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="flex flex-1 flex-col gap-3 p-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-auto h-7 w-20" />
            </div>
        </div>
    )
}

interface Props extends ProductCardData {
    priority?: boolean
}

export const ProductCard = ({
    id,
    name,
    slug,
    tenantSlug,
    displayPrice,
    strikePrice,
    image,
    category,
    badge,
    rating,
    reviews,
    priority = false,
}: Props) => {
    const { addProductToCart, getProductQuantity } = useCart(tenantSlug)
    const { addProductToWishlist, removeProductFromWislist, isProductInWishlist } =
        useWishlist(tenantSlug)

    const inWishlist = isProductInWishlist(id)
    const inCart = getProductQuantity(id) > 0

    const toggleWishlist = () => {
        if (inWishlist) {
            removeProductFromWislist(id)
            toast.success("Removed from wishlist")
        } else {
            addProductToWishlist(id)
            toast.success("Added to wishlist")
        }
    }

    const discount =
        strikePrice && strikePrice > displayPrice
            ? Math.round(((strikePrice - displayPrice) / strikePrice) * 100)
            : null

    return (
        <article className="group relative flex h-full flex-col border border-tpl-line bg-tpl-surface-raised transition-colors duration-300 hover:border-tpl-accent">
            <div className="relative aspect-square overflow-hidden bg-tpl-surface-muted">
                <Link href={`${generateTenantUrl(tenantSlug)}/products/${slug}`} aria-label={name}>
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            priority={priority}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-tpl-fg-subtle">
                            <span className="nova-mono text-xs">No image</span>
                        </div>
                    )}
                </Link>

                <div className="pointer-events-none absolute left-0 top-0 flex flex-col gap-1 p-3">
                    {badge && (
                        <span className="nova-mono bg-tpl-accent px-2 py-1 text-[10px] font-semibold text-tpl-accent-fg">
                            {badge}
                        </span>
                    )}
                    {discount !== null && (
                        <span className="nova-mono bg-tpl-critical px-2 py-1 text-[10px] font-semibold text-white">
                            -{discount}%
                        </span>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={inWishlist ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
                    onClick={toggleWishlist}
                    className="absolute right-2 top-2 h-8 w-8 bg-tpl-surface/70 text-tpl-fg backdrop-blur-sm hover:bg-tpl-surface hover:text-tpl-accent"
                >
                    <Heart className={`h-4 w-4 ${inWishlist ? "fill-tpl-critical text-tpl-critical" : ""}`} />
                </Button>
            </div>

            <div className="flex flex-1 flex-col p-4">
                {category && <span className="nova-mono mb-2 text-[10px] text-tpl-accent">{category}</span>}

                <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-tpl-fg">
                    <Link
                        href={`${generateTenantUrl(tenantSlug)}/products/${slug}`}
                        className="transition-colors hover:text-tpl-accent"
                    >
                        {name}
                    </Link>
                </h3>

                {rating !== null && rating > 0 && (
                    <div className="mb-3 flex items-center gap-1.5">
                        <Star className="h-3 w-3 fill-tpl-accent text-tpl-accent" />
                        <span className="nova-mono text-[11px] text-tpl-fg-muted">
                            {rating.toFixed(1)}
                            {reviews ? ` (${reviews})` : ""}
                        </span>
                    </div>
                )}

                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                    <div className="flex flex-col">
                        {strikePrice && (
                            <span className="nova-mono text-[11px] text-tpl-fg-subtle line-through">
                                {formatPrice(strikePrice)}
                            </span>
                        )}
                        <span className="nova-mono text-base font-semibold text-tpl-fg">
                            {formatPrice(displayPrice)}
                        </span>
                    </div>

                    <Button
                        size="icon"
                        aria-label={`Add ${name} to cart`}
                        onClick={() => {
                            addProductToCart(id)
                            toast.success("Added to cart")
                        }}
                        className={`h-9 w-9 rounded-none border border-tpl-accent transition-all ${inCart
                            ? "bg-tpl-accent-soft text-tpl-accent"
                            : "bg-transparent text-tpl-accent hover:nova-glow hover:bg-tpl-accent hover:text-tpl-accent-fg"
                            }`}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </article>
    )
}
