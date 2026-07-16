"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Search, Grid, List, Crown, Zap, Sparkles, Filter, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTRPC } from "@/trpc/client"
import type { MarketplaceEntry } from "@/modules/templates/server/service"

import { TemplateCard } from "../components/template-card"
import { TemplateModal } from "../components/template-modal"
import { useTemplateActions } from "../hooks/use-template-actions"

const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "general", label: "General" },
    { value: "fashion", label: "Fashion" },
    { value: "electronics", label: "Electronics" },
    { value: "grocery", label: "Grocery" },
    { value: "furniture", label: "Furniture" },
    { value: "beauty", label: "Beauty" },
    { value: "digital", label: "Digital" },
    { value: "minimal", label: "Minimal" },
]

const SORT_OPTIONS = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name (A–Z)" },
] as const

interface Props {
    signedIn: boolean
}

export const MarketplaceView = ({ signedIn }: Props) => {
    const trpc = useTRPC()
    const router = useRouter()

    const [filters, setFilters] = useQueryStates({
        search: parseAsString.withDefault(""),
        category: parseAsString.withDefault("all"),
        pricing: parseAsStringEnum(["all", "free", "paid"]).withDefault("all"),
        sort: parseAsStringEnum(["popular", "newest", "price-low", "price-high", "name"]).withDefault("popular"),
    })

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

    const { data: templates } = useSuspenseQuery(
        trpc.templates.list.queryOptions({
            search: filters.search || undefined,
            category: filters.category === "all" ? undefined : filters.category,
            pricing: filters.pricing,
            sort: filters.sort,
        }),
    )

    const { activate, deactivate, purchase, isBusy, isDeactivating } = useTemplateActions()

    const selected = templates.find((template) => template.slug === selectedSlug) ?? null

    const handlePrimaryAction = (template: MarketplaceEntry) => {
        if (!signedIn) {
            router.push("/login")
            return
        }
        if (template.active) return

        if (template.owned || template.pricing.model === "free") {
            activate(template.slug)
            return
        }

        void purchase(template.slug)
    }

    const clearFilters = () =>
        setFilters({ search: "", category: "all", pricing: "all", sort: "popular" })

    const hasActiveFilters =
        Boolean(filters.search) || filters.category !== "all" || filters.pricing !== "all"

    return (
        <div className="min-h-screen relative">
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="container relative z-10 mx-auto">
                    <motion.div
                        className="text-center max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">Storefront Template Collection</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                            <span className="bg-linear-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                                Premium
                            </span>
                            <br />
                            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Templates
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Pick a look for your store and{" "}
                            <span className="text-white font-medium">switch any time</span>. Every template is
                            production-ready, responsive, and built for speed — activate one and your storefront
                            changes instantly.
                        </p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.2 }}
                        >
                            <Button
                                size="lg"
                                onClick={() => setFilters({ pricing: "paid" })}
                                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 px-8 py-6 text-lg"
                            >
                                <Crown className="mr-2 h-5 w-5" />
                                Browse Premium
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => setFilters({ pricing: "free" })}
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-6 text-lg backdrop-blur-sm"
                            >
                                <Zap className="mr-2 h-5 w-5" />
                                Free Templates
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-8 border-y border-zinc-800/50 backdrop-blur-sm bg-zinc-950/50">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        <div className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                            <Input
                                placeholder="Search templates..."
                                value={filters.search}
                                onChange={(event) => setFilters({ search: event.target.value || null })}
                                className="pl-12 pr-4 py-3 bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <Filter className="h-4 w-4" />
                                <span>Filter by:</span>
                            </div>

                            <Select
                                value={filters.category}
                                onValueChange={(value) => setFilters({ category: value })}
                            >
                                <SelectTrigger className="w-44 bg-zinc-900/80 border-zinc-700 text-white rounded-xl backdrop-blur-sm">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 rounded-xl">
                                    {CATEGORIES.map((category) => (
                                        <SelectItem
                                            key={category.value}
                                            value={category.value}
                                            className="text-white hover:bg-zinc-800 rounded-lg"
                                        >
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.pricing}
                                onValueChange={(value) =>
                                    setFilters({ pricing: value as "all" | "free" | "paid" })
                                }
                            >
                                <SelectTrigger className="w-36 bg-zinc-900/80 border-zinc-700 text-white rounded-xl backdrop-blur-sm">
                                    <SelectValue placeholder="Price" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 rounded-xl">
                                    <SelectItem value="all" className="text-white hover:bg-zinc-800 rounded-lg">
                                        All Prices
                                    </SelectItem>
                                    <SelectItem value="free" className="text-white hover:bg-zinc-800 rounded-lg">
                                        Free Only
                                    </SelectItem>
                                    <SelectItem value="paid" className="text-white hover:bg-zinc-800 rounded-lg">
                                        Premium Only
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.sort}
                                onValueChange={(value) =>
                                    setFilters({ sort: value as (typeof SORT_OPTIONS)[number]["value"] })
                                }
                            >
                                <SelectTrigger className="w-52 bg-zinc-900/80 border-zinc-700 text-white rounded-xl backdrop-blur-sm">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 rounded-xl">
                                    {SORT_OPTIONS.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                            className="text-white hover:bg-zinc-800 rounded-lg"
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    aria-label="Grid view"
                                    className={`rounded-none ${viewMode === "grid" ? "bg-zinc-700 text-white" : "hover:bg-zinc-800 text-zinc-400"}`}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    aria-label="List view"
                                    className={`rounded-none ${viewMode === "list" ? "bg-zinc-700 text-white" : "hover:bg-zinc-800 text-zinc-400"}`}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-zinc-400">
                            Showing <span className="text-white font-medium">{templates.length}</span>{" "}
                            {templates.length === 1 ? "template" : "templates"}
                        </div>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-zinc-400 hover:text-white"
                            >
                                Clear filters
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-zinc-950">
                <div className="container mx-auto">
                    <AnimatePresence mode="wait">
                        {templates.length > 0 ? (
                            <motion.div
                                key={viewMode}
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                                        : "space-y-6"
                                }
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {templates.map((template, index) => (
                                    <motion.div
                                        key={template.slug}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                                    >
                                        <TemplateCard
                                            template={template}
                                            viewMode={viewMode}
                                            signedIn={signedIn}
                                            busy={isBusy(template.slug) || isDeactivating}
                                            onPreview={() => setSelectedSlug(template.slug)}
                                            onPrimaryAction={() => handlePrimaryAction(template)}
                                            onDeactivate={() => deactivate()}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                className="text-center py-24"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-8xl mb-6">🔍</div>
                                <h3 className="text-2xl font-bold mb-4">No templates found</h3>
                                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                                    We couldn&apos;t find any templates matching your criteria. Try adjusting your
                                    search or browse all templates.
                                </p>
                                <Button
                                    onClick={clearFilters}
                                    className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                >
                                    Clear All Filters
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <TemplateModal
                template={selected}
                isOpen={Boolean(selected)}
                signedIn={signedIn}
                busy={selected ? isBusy(selected.slug) || isDeactivating : false}
                onClose={() => setSelectedSlug(null)}
                onPrimaryAction={() => selected && handlePrimaryAction(selected)}
                onDeactivate={() => deactivate()}
            />
        </div>
    )
}
