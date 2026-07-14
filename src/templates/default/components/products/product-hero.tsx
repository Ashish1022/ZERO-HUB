"use client"

import Image from "next/image"
import { Heart, Share2, ShieldCheck, StarIcon, Trash2, Truck } from "lucide-react";
import { ProductReview } from "./product-review";
import toast from "react-hot-toast";

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice, generateTenantUrl } from "@/lib/utils";
import { useCart } from "@/modules/products/hooks/use-cart";
import { useWishlist } from "@/modules/products/hooks/use-wishlist";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const ProductHero = ({ product, slug }: { slug: string, product: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ product: product, slug: slug }));

    const { addProductToCart } = useCart(slug)
    const { addProductToWishlist, isProductInWishlist, removeProductFromWislist } = useWishlist(slug)

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const getCurrentImage = () => {
        if (!data.images || data.images.length === 0) return "/placeholder.png";

        const selectedImage = data.images[selectedImageIndex];
        if (selectedImage?.image && typeof selectedImage.image === 'object' && 'url' in selectedImage.image) {
            return selectedImage.image.url || "/placeholder.png";
        }
        return "/placeholder.png";
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                        {data.badge && (
                            <div className="absolute top-4 left-4 z-10">
                                <Badge className="bg-green-100 text-green-800">{data.badge}</Badge>
                            </div>
                        )}
                        <Image
                            src={getCurrentImage()}
                            alt={data.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {data.images?.map((image, i) => (
                            <div key={i}
                                className={`relative aspect-square overflow-hidden rounded-xl border bg-white cursor-pointer transition-all duration-200 hover:scale-105 ${selectedImageIndex === i
                                    ? "border-amber-400 ring-2 ring-amber-200 shadow-md"
                                    : "border-stone-200 hover:border-amber-300"
                                    }`}
                                onClick={() => setSelectedImageIndex(i)}
                            >
                                <Image
                                    src={image.image.url || "/placeholder.png"}
                                    alt={`${data.name} - View ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                {selectedImageIndex === i && (
                                    <div className="absolute inset-0 bg-amber-100 bg-opacity-20" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-stone-900 mb-4 md:text-4xl">{data.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(data.reviewRating)
                                            ? "fill-amber-400 text-amber-400"
                                            : i < data.reviewRating
                                                ? "fill-amber-400 text-amber-400 [clip-path:inset(0_50%_0_0)]"
                                                : "text-stone-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-stone-600">
                                {data.reviewRating} ({data.reviewCount} reviews)
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-stone-900">
                            {formatPrice(data.pricing.compareAtPrice)}
                        </div>
                        {data.pricing.price && (
                            <div className="text-xl text-stone-500 line-through">{formatPrice(data.pricing.price)}</div>
                        )}
                        {data.pricing.compareAtPrice && (
                            <Badge className="bg-red-100 text-red-800">Save {formatPrice(data.pricing.price - data.pricing.compareAtPrice)}</Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${data.inventory?.quantity ? "bg-green-500" : "bg-red-500"}`} />
                        <span className={`font-medium ${data.inventory?.quantity ? "text-green-700" : "text-red-700"}`}>
                            {data.inventory?.quantity ? `In Stock (${data.inventory?.quantity} available)` : "Out of Stock"}
                        </span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="flex-1 bg-stone-900 hover:bg-amber-600 text-white rounded-full py-6 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                disabled={!data.inventory?.quantity}
                                onClick={() => {
                                    addProductToCart(data.id)
                                    toast.success("Product added to cart!")
                                }}
                            >
                                Add to Cart
                            </Button>
                            {isProductInWishlist(data.id) ? (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-stone-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 rounded-full py-6 transition-all duration-300 cursor-pointer"
                                    onClick={() => {
                                        removeProductFromWislist(data.id)
                                        toast.success("Product removed from wishlist")
                                    }}
                                >
                                    <Trash2 className="h-5 w-5 mr-2" />
                                    Remove
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-stone-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 rounded-full py-6 transition-all duration-300 cursor-pointer"
                                    onClick={() => {
                                        addProductToWishlist(data.id)
                                        toast.success("Product added to wishlist")
                                    }}
                                >
                                    <Heart className="h-5 w-5 mr-2" />
                                    Save
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-14 w-14 border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white rounded-full transition-all duration-300 cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${generateTenantUrl(slug)}/products/${data.slug}`)
                                    toast.success("Link copied!")
                                }}
                            >
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-amber-100 p-2">
                                    <Truck className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-stone-900">Free Shipping</p>
                                    <p className="text-sm text-stone-600">Delivery in 3-5 business days</p>
                                </div>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-amber-100 p-2">
                                    <ShieldCheck className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-stone-900">2-Year Warranty</p>
                                    <p className="text-sm text-stone-600">Shop with confidence</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-xl font-bold text-stone-900">Description</h3>
                        {data.description ? (
                            <p className="text-stone-600 leading-relaxed" >{data.description}</p>
                        ) : (
                            <p className="text-gray-600">No description provided.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <Tabs defaultValue="specifications" className="w-full">
                    <TabsList className="w-full justify-start bg-stone-100 rounded-full p-1">
                        <TabsTrigger value="specifications" className="rounded-full">
                            Specifications
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-full">
                            Reviews ({data.reviewCount})
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="specifications" className="mt-6">
                        <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
                            {data.specifications && data.specifications.length > 0 ? (
                                data.specifications.map((spec) => (
                                    <div key={spec.value}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4">
                                            <div className="font-medium text-stone-900">{spec.name}</div>
                                            <div className="text-stone-600">{spec.value}</div>
                                        </div>
                                        <Separator />
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    No specifications available
                                </div>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="reviews" className="mt-8">
                        <ProductReview
                            ratingDistribution={data.ratingDistribution}
                            reviewCount={data.reviewCount}
                            reviewRating={data.reviewRating}
                            reviews={data.reviews}
                            product={product}
                            slug={slug}
                        />
                    </TabsContent>
                </Tabs>
            </div >
        </>
    )
}