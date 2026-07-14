"use client"

import Link from "next/link"
import Image from "next/image"
import toast from "react-hot-toast"
import { Heart, ShoppingBag, Star, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice, generateTenantUrl } from "@/lib/utils"
import { useCart } from "@/modules/products/hooks/use-cart"
import { useWishlist } from "@/modules/products/hooks/use-wishlist"

interface Props {
    id: string
    name: string
    slug: string
    price?: number | null
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    badge?: string | null
    rating?: number
    reviews?: number
    featured?: boolean | null
    tenantSlug: string
    priority?: boolean
}

export const ProductCard = ({
    id,
    name,
    slug,
    price,
    originalPrice,
    image,
    category,
    badge,
    rating,
    reviews,
    featured,
    tenantSlug,
    priority = false
}: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const hasDiscount = originalPrice && originalPrice !== price

    const StarRating = ({ rating }: { rating: number }) => {
        return (
            <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 flex-shrink-0 ${i < Math.floor(rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-300"
                            }`}
                    />
                ))}
            </div>
        )
    }

    const { addProductToCart, isProductInCart, removeProductFromCart } = useCart(tenantSlug)
    const { addProductToWishlist, isProductInWishlist, removeProductFromWislist } = useWishlist(tenantSlug)

    const alreadyInCart = isProductInCart(id)
    const alreadyInWishlist = isProductInWishlist(id)

    const handleAddToCart = () => {
        addProductToCart(id)
        toast.success("Product added to cart!")
    }

    const handleAddToWishlist = () => {
        addProductToWishlist(id)
        toast.success("Product added to wishlist!")
    }

    const handleRemoveFromWishlist = () => {
        removeProductFromWislist(id)
        toast.success("Product removed from wishlist!")
    }

    const handleRemoveFromCart = () => {
        removeProductFromCart(id)
        toast.success("Product removed from cart!")
    }

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <article className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
                {badge && (
                    <div className="absolute top-4 left-4 z-10">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badge === "Sale"
                                ? "bg-red-100 text-red-800"
                                : badge === "Bestseller"
                                    ? "bg-green-100 text-green-800"
                                    : badge === "New"
                                        ? "bg-blue-100 text-blue-800"
                                        : badge === "Trending"
                                            ? "bg-purple-100 text-purple-800"
                                            : badge === "Limited"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {badge}
                        </span>
                    </div>
                )}

                <Link href={`${generateTenantUrl(tenantSlug)}/products/${slug}`} aria-label={`View ${name}`}>
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
                        <div className="absolute inset-0 bg-stone-100" />

                        {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 bg-stone-100 animate-pulse" />
                        )}

                        <Image
                            src={image || "/placeholder.png"}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            priority={priority}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </Link>

                <div className="absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 transform translate-x-0 min-h-[40px] min-w-[40px]">
                    {alreadyInWishlist ? (
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg flex-shrink-0"
                            aria-label="Remove from wishlist"
                            onClick={handleRemoveFromWishlist}
                            type="button"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg flex-shrink-0"
                            aria-label="Add to wishlist"
                            onClick={handleAddToWishlist}
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                        {category && (
                            <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">
                                {category}
                            </p>
                        )}
                    </div>

                    <Link href={`${generateTenantUrl(tenantSlug)}/products/${slug}`}>
                        <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 leading-tight line-clamp-2 flex items-start">
                            <span>{name}</span>
                        </h3>
                    </Link>

                    <div className="mb-3">
                        {rating && reviews && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
                                    <StarRating rating={rating} />
                                </div>
                                <span className="text-sm text-stone-600 whitespace-nowrap">({reviews})</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="text-xl font-bold text-stone-900 whitespace-nowrap">
                                {formatPrice(price) || '0.00'}
                            </div>
                            {hasDiscount && (
                                <div className="text-sm text-stone-500 line-through whitespace-nowrap">
                                    {formatPrice(originalPrice)}
                                </div>
                            )}
                        </div>
                        {featured && (
                            <div className="flex items-center gap-1 ml-2 flex-shrink-0" aria-label="Featured product">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-amber-400" />
                                ))}
                            </div>
                        )}
                    </div>

                    {alreadyInCart ? (
                        <Button
                            className="w-full bg-stone-900 hover:bg-amber-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                            size="sm"
                            type="button"
                            onClick={handleRemoveFromCart}
                        >
                            <>
                                <Trash2 className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>Remove from Cart</span>
                            </>
                        </Button>
                    ) : (
                        <Button
                            className="w-full bg-stone-900 hover:bg-amber-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                            size="sm"
                            type="button"
                            onClick={handleAddToCart}
                        >
                            <>
                                <ShoppingBag className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>Add to Cart</span>
                            </>
                        </Button>
                    )}
                </div>
            </div>
        </article>
    )
}

ProductCard.displayName = 'ProductCard'

export function ProductCardSkeleton() {
    return (
        <div className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="absolute top-4 left-4 z-10">
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
                    <Skeleton className="h-full w-full" />
                </div>

                <div className="absolute top-4 right-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                <div className="p-6">
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-5 w-full mb-1" />
                    <Skeleton className="h-5 w-3/4 mb-3" />

                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                            ))}
                        </div>
                        <Skeleton className="h-4 w-8" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-12" />
                    </div>

                    <Skeleton className="h-10 w-full rounded-full" />
                </div>
            </div>
        </div>
    )
}