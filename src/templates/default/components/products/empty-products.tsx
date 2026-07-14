"use client"

import { useState } from "react"
import { PackageOpen, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useProductFilters } from "@/modules/products/hooks/use-product-filter"

interface EmptyProductsProps {
    title?: string
    description?: string
    showResetButton?: boolean
}

export default function EmptyProducts({
    title = "No products found",
    description = "We couldn't find any products matching your current filters.",
    showResetButton = true,
}: EmptyProductsProps) {

    const [, setFilters] = useProductFilters();
    const [, setPriceRange] = useState([0, 2000])
    const [, setSelectedCategories] = useState<string[]>([])

    const clearFilters = () => {
        setPriceRange([0, 2000])
        setSelectedCategories([])
        setFilters({
            minPrice: "",
            maxPrice: "",
            category: [],
            tags: []
        })
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="relative w-40 h-40 mb-8">
                <div className="absolute inset-0 bg-amber-100 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <PackageOpen className="h-20 w-20 text-amber-500" strokeWidth={1.5} />
                </div>
            </div>

            <h3 className="text-2xl font-bold text-stone-900 mb-3">{title}</h3>
            <p className="text-stone-600 max-w-md mb-8">{description}</p>

            {showResetButton && (
                <Button
                    onClick={clearFilters}
                    className="bg-stone-900 hover:bg-amber-600 text-white rounded-full transition-all duration-300"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Filters
                </Button>
            )}
        </div>
    )
}
