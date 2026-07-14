"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Grid, List, Crown, Zap, Sparkles, Filter, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TemplateCard } from "@/modules/templates/ui/components/template-card"
import { TemplateModal } from "@/modules/templates/ui/components/template-modal"
import { TemplateModalSkeleton } from "@/modules/templates/ui/components/template-modal-skeleton"
import { TemplatesGridSkeleton } from "@/modules/templates/ui/components/template-grid-skeleton"

const templates = [
    {
        id: "1",
        title: "Modern Dashboard",
        description: "A sleek and modern dashboard template with analytics widgets and data visualization components.",
        category: "Dashboard",
        price: 0,
        isPremium: false,
        rating: 0,
        downloads: 0,
        preview: "/templates/1.png",
        tags: ["React", "TypeScript", "Charts", "Analytics"],
        author: "ZERO | HUB Team",
        lastUpdated: "2024-01-15",
        features: ["Responsive Design", "Dark/Light Mode", "Chart Components", "Data Tables"],
    },
    // {
    //     id: "2",
    //     title: "E-commerce Admin",
    //     description: "Complete e-commerce admin panel with product management, order tracking, and customer analytics.",
    //     category: "E-commerce",
    //     price: 49,
    //     isPremium: true,
    //     rating: 4.9,
    //     downloads: 890,
    //     preview: "/placeholder.svg?height=300&width=400",
    //     tags: ["React", "E-commerce", "Admin", "CRM"],
    //     author: "Pro Templates",
    //     lastUpdated: "2024-01-20",
    //     features: ["Product Management", "Order Tracking", "Customer Analytics", "Inventory Management"],
    // },
    // {
    //     id: "3",
    //     title: "Landing Page Pro",
    //     description: "High-converting landing page template with multiple sections and call-to-action components.",
    //     category: "Landing Page",
    //     price: 29,
    //     isPremium: true,
    //     rating: 4.7,
    //     downloads: 2100,
    //     preview: "/placeholder.svg?height=300&width=400",
    //     tags: ["Landing", "Marketing", "Conversion", "SEO"],
    //     author: "Design Studio",
    //     lastUpdated: "2024-01-18",
    //     features: ["Hero Section", "Testimonials", "Pricing Tables", "Contact Forms"],
    // },
    // {
    //     id: "4",
    //     title: "Blog Template",
    //     description: "Clean and minimal blog template with article management and comment system.",
    //     category: "Blog",
    //     price: 0,
    //     isPremium: false,
    //     rating: 4.5,
    //     downloads: 1680,
    //     preview: "/placeholder.svg?height=300&width=400",
    //     tags: ["Blog", "Content", "Minimal", "SEO"],
    //     author: "SaaSApp Team",
    //     lastUpdated: "2024-01-12",
    //     features: ["Article Management", "Comment System", "SEO Optimized", "Social Sharing"],
    // },
    // {
    //     id: "5",
    //     title: "SaaS Starter Kit",
    //     description: "Complete SaaS application template with authentication, billing, and user management.",
    //     category: "SaaS",
    //     price: 99,
    //     isPremium: true,
    //     rating: 5.0,
    //     downloads: 450,
    //     preview: "/placeholder.svg?height=300&width=400",
    //     tags: ["SaaS", "Authentication", "Billing", "Full-stack"],
    //     author: "Enterprise Solutions",
    //     lastUpdated: "2024-01-22",
    //     features: ["User Authentication", "Stripe Integration", "Admin Panel", "API Documentation"],
    // },
    // {
    //     id: "6",
    //     title: "Portfolio Showcase",
    //     description: "Creative portfolio template for designers and developers to showcase their work.",
    //     category: "Portfolio",
    //     price: 0,
    //     isPremium: false,
    //     rating: 4.6,
    //     downloads: 980,
    //     preview: "/placeholder.svg?height=300&width=400",
    //     tags: ["Portfolio", "Creative", "Showcase", "Responsive"],
    //     author: "Creative Collective",
    //     lastUpdated: "2024-01-10",
    //     features: ["Project Gallery", "Contact Form", "Smooth Animations", "Mobile Optimized"],
    // },
    // {
    //     id: "7",
    //     title: "CRM Dashboard",
    //     description: "Customer relationship management dashboard with lead tracking and sales analytics.",
    //     category: "Dashboard",
    //     price: 79,
    //     isPremium: true,
    //     rating: 4.8,
    //     downloads: 320,
    //     preview: "/placeholder.svg?height=300&width=400",
    //     tags: ["CRM", "Sales", "Analytics", "Business"],
    //     author: "Business Tools",
    //     lastUpdated: "2024-01-25",
    //     features: ["Lead Management", "Sales Pipeline", "Customer Analytics", "Report Generation"],
    // },
    // {
    //     id: "8",
    //     title: "Documentation Site",
    //     description: "Professional documentation template with search, navigation, and code highlighting.",
    //     category: "Documentation",
    //     price: 0,
    //     isPremium: false,
    //     rating: 4.4,
    //     downloads: 750,
    //     preview: "/placeholder.svg?height=300&width=400",
    //     tags: ["Documentation", "Technical", "Search", "Navigation"],
    //     author: "SaaSApp Team",
    //     lastUpdated: "2024-01-08",
    //     features: ["Search Functionality", "Code Highlighting", "Navigation Menu", "Responsive Layout"],
    // },
]

const categories = ["All", "Dashboard", "E-commerce", "Landing Page", "Blog", "SaaS", "Portfolio", "Documentation"]
const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
]

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [priceFilter, setPriceFilter] = useState("all")
    const [sortBy, setSortBy] = useState("popular")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isModalLoading, setIsModalLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const filteredAndSortedTemplates = useMemo(() => {
        const filtered = templates.filter((template) => {
            const matchesSearch =
                template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesCategory = selectedCategory === "All" || template.category === selectedCategory

            const matchesPrice =
                priceFilter === "all" ||
                (priceFilter === "free" && template.price === 0) ||
                (priceFilter === "paid" && template.price > 0)

            return matchesSearch && matchesCategory && matchesPrice
        })

        // Sort templates
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
                case "price-low":
                    return a.price - b.price
                case "price-high":
                    return b.price - a.price
                case "rating":
                    return b.rating - a.rating
                case "popular":
                default:
                    return b.downloads - a.downloads
            }
        })

        return filtered
    }, [searchQuery, selectedCategory, priceFilter, sortBy])

    const handleTemplatePreview = (template: (typeof templates)[0]) => {
        setIsModalLoading(true)
        setSelectedTemplate(template)

        // Simulate loading delay for modal content
        setTimeout(() => {
            setIsModalLoading(false)
        }, 400)
    }

    const handleModalClose = () => {
        setSelectedTemplate(null)
        setIsModalLoading(false)
    }

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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">Premium Template Collection</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                            <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                                Premium
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Templates
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Discover our collection of professionally designed templates to{" "}
                            <span className="text-white font-medium">accelerate your development</span> process. From dashboards to
                            landing pages, find the perfect starting point for your next project.
                        </p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.2 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 px-8 py-6 text-lg"
                            >
                                <Crown className="mr-2 h-5 w-5" />
                                Browse Premium
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
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
                    <motion.div
                        className="flex flex-col lg:flex-row gap-6 items-center justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                            <Input
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-3 bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-500 rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <Filter className="h-4 w-4" />
                                <span>Filter by:</span>
                            </div>

                            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={isLoading}>
                                <SelectTrigger className="w-44 bg-zinc-900/80 border-zinc-700 text-white rounded-xl backdrop-blur-sm">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 rounded-xl">
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category} className="text-white hover:bg-zinc-800 rounded-lg">
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={priceFilter} onValueChange={setPriceFilter} disabled={isLoading}>
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

                            <Select value={sortBy} onValueChange={setSortBy} disabled={isLoading}>
                                <SelectTrigger className="w-52 bg-zinc-900/80 border-zinc-700 text-white rounded-xl backdrop-blur-sm">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 rounded-xl">
                                    {sortOptions.map((option) => (
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
                                    className={`rounded-none ${viewMode === "grid" ? "bg-zinc-700 text-white" : "hover:bg-zinc-800 text-zinc-400"}`}
                                    disabled={isLoading}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className={`rounded-none ${viewMode === "list" ? "bg-zinc-700 text-white" : "hover:bg-zinc-800 text-zinc-400"}`}
                                    disabled={isLoading}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {!isLoading && (
                        <motion.div
                            className="mt-6 flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-sm text-zinc-400">
                                Showing <span className="text-white font-medium">{filteredAndSortedTemplates.length}</span> of{" "}
                                <span className="text-white font-medium">{templates.length}</span> templates
                            </div>
                            {filteredAndSortedTemplates.length > 0 && (
                                <div className="text-sm text-zinc-500">Updated recently • High quality • Production ready</div>
                            )}
                        </motion.div>
                    )}
                </div>
            </section>

            <section className="py-16 bg-zinc-950">
                <div className="container mx-auto">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <TemplatesGridSkeleton viewMode={viewMode} count={8} />
                            </motion.div>
                        ) : filteredAndSortedTemplates.length > 0 ? (
                            <motion.div
                                key={`${viewMode}-${filteredAndSortedTemplates.length}`}
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
                                {filteredAndSortedTemplates.map((template, index) => (
                                    <motion.div
                                        key={template.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <TemplateCard
                                            template={template}
                                            viewMode={viewMode}
                                            onPreview={() => handleTemplatePreview(template)}
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
                                    We couldn&apos;t find any templates matching your criteria. Try adjusting your search or browse all
                                    templates.
                                </p>
                                <Button
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSelectedCategory("All")
                                        setPriceFilter("all")
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                >
                                    Clear All Filters
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {isModalLoading ? (
                <TemplateModalSkeleton isOpen={!!selectedTemplate} onClose={handleModalClose} />
            ) : (
                <TemplateModal
                    template={selectedTemplate}
                    isOpen={!!selectedTemplate && !isModalLoading}
                    onClose={handleModalClose}
                />
            )}
        </div>
    )
}
