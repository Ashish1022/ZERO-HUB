"use client"

import { SearchInput } from "./search-input"

import { useProductFilters } from "@/modules/products/hooks/use-product-filter";

export const SearchFilters = ({ className }: { className: string }) => {

    const [filters, setFilters] = useProductFilters();

    return (
        <SearchInput
            defaultValue={filters.search}
            onChange={(value) => setFilters({ search: value })}
            className={className}
        />
    )
}