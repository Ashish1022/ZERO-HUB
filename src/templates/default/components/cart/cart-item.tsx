import Image from "next/image"
import { memo, useCallback } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"

interface Props {
    id: string
    image?: string | null
    name: string
    price: number
    incrementQuantity: (productId: string) => void
    removeProduct: (productId: string) => void
    decrementQuantity: (productId: string) => void
    productQuantity: number
}

export const CartItem = memo(({
    image,
    name,
    price,
    incrementQuantity,
    decrementQuantity,
    id,
    productQuantity,
    removeProduct
}: Props) => {

    const handlePlusClick = useCallback(() => incrementQuantity(id), [incrementQuantity, id])
    const handleMinusClick = useCallback(() => decrementQuantity(id), [decrementQuantity, id])
    const handleRemove = useCallback(() => removeProduct(id), [removeProduct, id])

    const totalPrice = price * productQuantity

    return (
        <article
            className="grid grid-cols-1 border-b p-4 sm:grid-cols-6 sm:items-center"
            aria-label={`${name} in cart`}
        >
            <div className="col-span-3 flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-md bg-gray-50">
                    <Image
                        src={image || "/placeholder.png"}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                </div>
                <div>
                    <h3 className="font-medium text-stone-900">{name}</h3>
                    <div className="mt-1 sm:hidden">
                        <span className="text-gray-500" aria-label={`Price: ${formatPrice(price)}`}>
                            {formatPrice(price)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block text-stone-900" aria-label={`Unit price: ${formatPrice(price)}`}>
                {formatPrice(price)}
            </div>

            <div className="mt-4 flex items-center sm:mt-0">
                <div className="flex items-center" role="group" aria-label="Quantity controls">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none hover:bg-stone-100 focus:ring-2 focus:ring-stone-400 focus:ring-offset-1"
                        onClick={handleMinusClick}
                        aria-label={`Decrease quantity of ${name}`}
                        disabled={productQuantity <= 1}
                    >
                        <Minus className="h-3 w-3" aria-hidden="true" />
                    </Button>
                    <Input
                        type="number"
                        value={productQuantity}
                        readOnly
                        className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        aria-label={`Quantity: ${productQuantity}`}
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none hover:bg-stone-100 focus:ring-2 focus:ring-stone-400 focus:ring-offset-1"
                        onClick={handlePlusClick}
                        aria-label={`Increase quantity of ${name}`}
                    >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                    </Button>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between sm:mt-0 sm:justify-start">
                <div className="sm:pr-6 font-semibold text-stone-900" aria-label={`Total: ${formatPrice(totalPrice)}`}>
                    {formatPrice(totalPrice)}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                    onClick={handleRemove}
                    aria-label={`Remove ${name} from cart`}
                >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
            </div>
        </article>
    )
})

CartItem.displayName = 'CartItem'