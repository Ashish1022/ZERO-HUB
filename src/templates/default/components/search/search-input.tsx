"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input"

export const SearchInput = ({
    defaultValue,
    onChange,
    className
}: {
    defaultValue?: string | undefined;
    onChange?: (value: string) => void
    className: string
}) => {

    const [searchValue, setSearchValue] = useState(defaultValue || "")

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChange?.(searchValue);
        }, 500);
        return () => clearTimeout(timeoutId)
    }, [searchValue, onChange])

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
                placeholder="Search products..."
                className={className}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    )
}