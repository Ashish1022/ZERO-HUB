"use client"

import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Clock, Truck } from "lucide-react"

import {
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import {
    RadioGroup,
    RadioGroupItem
} from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { checkoutSchema } from "@/modules/checkout/schema"
import { formatPrice } from "@/lib/utils"

interface DeliveryOption {
    id: string
    name: string
    description: string
    duration: string
    price: number
    icon: React.ReactNode
    badge?: string
    badgeColor?: string
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}


const getDeliveryDate = (businessDays: number) => {
    const today = new Date()
    const deliveryDate = new Date(today)
    let daysAdded = 0

    while (daysAdded < businessDays) {
        deliveryDate.setDate(deliveryDate.getDate() + 1)
        const dayOfWeek = deliveryDate.getDay()

        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            daysAdded++
        }
    }

    return deliveryDate
}

const standardDelivery = getDeliveryDate(7)
const expressDelivery = getDeliveryDate(2)

const deliveryOptions: DeliveryOption[] = [
    {
        id: "standard",
        name: "Standard Delivery",
        description: "5-7 business days",
        duration: `Arrives by ${formatDate(standardDelivery)}`,
        price: 15.00,
        icon: <Truck className="h-4 w-4 text-stone-600" />
    },
    {
        id: "express",
        name: "Express Delivery",
        description: "1-2 business days",
        duration: `Arrives by ${formatDate(expressDelivery)}`,
        price: 25.00,
        icon: <Clock className="h-4 w-4 text-amber-600" />,
        badge: "Fast",
        badgeColor: "bg-amber-100 text-amber-800"
    }
]

interface Props {
    form: UseFormReturn<z.infer<typeof checkoutSchema>>
}

export const DeliveryForm = ({ form }: Props) => {

    const selectedOption = form.watch("deliveryOption")

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-sm font-bold text-amber-800">3</span>
                </div>
                <h2 className="text-xl font-bold text-stone-900">Delivery Options</h2>
            </div>
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="deliveryOption"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="space-y-4"
                                >
                                    {deliveryOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            className={`flex items-start space-x-3 rounded-lg border p-4 transition-colors ${selectedOption === option.id
                                                ? "border-amber-300 bg-amber-50/50"
                                                : "border-stone-200 hover:border-amber-300"
                                                }`}
                                        >
                                            <RadioGroupItem
                                                value={option.id}
                                                id={option.id}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <Label
                                                    htmlFor={option.id}
                                                    className="flex items-center justify-between cursor-pointer"
                                                >
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {option.icon}
                                                            <span className="font-medium">{option.name}</span>
                                                            {option.badge && (
                                                                <span className={`text-xs px-2 py-1 rounded-full ${option.badgeColor}`}>
                                                                    {option.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-stone-600">{option.description}</p>
                                                        <p className="text-sm text-stone-600">{option.duration}</p>
                                                    </div>
                                                    <span className="font-bold text-stone-900">
                                                        {formatPrice(option.price)}
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}