"use client"

import Link from "next/link"
import Image from "next/image"
import toast from "react-hot-toast"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice, generateTenantUrl } from "@/lib/utils"
import { useCart } from "@/modules/products/hooks/use-cart"
import { useWishlist } from "@/modules/products/hooks/use-wishlist"
import type { ProductCardData } from "@/templates/shared"

export function ProductCardSkeleton() {
    return (
        <div className="flex h-full flex-col">
            <Skeleton className="aspect-3/4 w-full rounded-tpl" />
            <div className="flex flex-col items-center gap-2 pt-5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-20" />
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
    priority = false,
}: Props) => {
    const { addProductToCart } = useCart(tenantSlug)
    const { addProductToWishlist, removeProductFromWislist, isProductInWishlist } =
        useWishlist(tenantSlug)

    const inWishlist = isProductInWishlist(id)

    const toggleWishlist = () => {
        if (inWishlist) {
            removeProductFromWislist(id)
            toast.success("Removed from wishlist")
        } else {
            addProductToWishlist(id)
            toast.success("Saved")
        }
    }

    return (
        <article className="group flex h-full flex-col">
            <div className="relative aspect-3/4 overflow-hidden rounded-tpl bg-tpl-surface-muted">
                <Link href={`${generateTenantUrl(tenantSlug)}/products/${slug}`} aria-label={name}>
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority={priority}
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                    ) : (
                        <div className="atelier-serif flex h-full items-center justify-center text-sm text-tpl-fg-subtle">
                            No image
                        </div>
                    )}
                </Link>

                {badge && (
                    <span className="atelier-tracked absolute left-4 top-4 bg-tpl-surface px-2.5 py-1 text-[9px] text-tpl-fg">
                        {badge}
                    </span>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={inWishlist ? `Remove ${name} from wishlist` : `Save ${name}`}
                    onClick={toggleWishlist}
                    className="absolute right-3 top-3 h-8 w-8 bg-tpl-surface/80 text-tpl-fg backdrop-blur-sm hover:bg-tpl-surface"
                >
                    <Heart
                        className={`h-3.5 w-3.5 ${inWishlist ? "fill-tpl-accent text-tpl-accent" : ""}`}
                        strokeWidth={1.5}
                    />
                </Button>
            </div>

            <div className="flex flex-1 flex-col items-center pt-5 text-center">
                {category && (
                    <span className="atelier-tracked mb-2 text-[9px] text-tpl-fg-subtle">{category}</span>
                )}

                <h3 className="atelier-serif mb-2 line-clamp-2 text-lg leading-snug text-tpl-fg">
                    <Link
                        href={`${generateTenantUrl(tenantSlug)}/products/${slug}`}
                        className="transition-colors hover:text-tpl-accent"
                    >
                        {name}
                    </Link>
                </h3>

                <div className="mb-3 flex items-baseline justify-center gap-2">
                    {strikePrice && (
                        <span className="text-xs text-tpl-fg-subtle line-through">
                            {formatPrice(strikePrice)}
                        </span>
                    )}
                    <span className="atelier-serif text-base text-tpl-fg">{formatPrice(displayPrice)}</span>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        addProductToCart(id)
                        toast.success("Added to cart")
                    }}
                    className="atelier-tracked mt-auto border-b border-tpl-fg pb-0.5 text-[9px] text-tpl-fg opacity-0 transition-all duration-300 hover:border-tpl-accent hover:text-tpl-accent focus-visible:opacity-100 group-hover:opacity-100"
                >
                    Add to cart
                </button>
            </div>
        </article>
    )
}
