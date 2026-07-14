import { Star, Download, Eye, Crown, ExternalLink, Sparkles } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

interface Template {
    id: string
    title: string
    description: string
    category: string
    price: number
    isPremium: boolean
    rating: number
    downloads: number
    preview: string
    tags: string[]
    author: string
    lastUpdated: string
    features: string[]
}

interface TemplateCardProps {
    template: Template
    viewMode: "grid" | "list"
    onPreview: () => void
}

export function TemplateCard({ template, viewMode, onPreview }: TemplateCardProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`
        }
        return num.toString()
    }

    if (viewMode === "list") {
        return (
            <div
                className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-700/70 transition-all duration-500 backdrop-blur-sm group"
            >
                <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                        <Image
                            src={template.preview || "/placeholder.svg"}
                            alt={template.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {template.isPremium && (
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30 backdrop-blur-sm">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Premium
                                </Badge>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                                size="sm"
                                onClick={onPreview}
                                className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
                            >
                                <Eye className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                    {template.title}
                                </h3>
                                <p className="text-zinc-400 text-sm flex items-center gap-2">
                                    <Sparkles className="h-3 w-3" />
                                    by {template.author}
                                </p>
                            </div>
                            <div className="text-right">
                                {template.price === 0 ? (
                                    <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                        Free
                                    </span>
                                ) : (
                                    <span className="text-2xl font-bold text-white">{formatPrice(template.price)}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-zinc-300 mb-6 line-clamp-2 leading-relaxed">{template.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {template.tags.slice(0, 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30 backdrop-blur-sm"
                                >
                                    {tag}
                                </Badge>
                            ))}
                            {template.tags.length > 3 && (
                                <Badge variant="outline" className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30 backdrop-blur-sm">
                                    +{template.tags.length - 3}
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{template.rating}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    <span>{formatNumber(template.downloads)}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onPreview}
                                    className="border-zinc-700 text-zinc-300 hover:bg-black hover:text-white backdrop-blur-sm"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                </Button>
                                <Button
                                    size="sm"
                                    disabled
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {/* {template.price === 0 ? "Download" : "Purchase"} */}
                                    Coming soon...
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-700/70 transition-all duration-500 group backdrop-blur-sm"
        >
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={template.preview || "/placeholder.svg"}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {template.isPremium && (
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30 backdrop-blur-sm">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                        </Badge>
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        onClick={onPreview}
                        className="bg-black hover:bg-black/90 text-white border-white/20 backdrop-blur-sm shadow-lg"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </Button>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white line-clamp-1 text-lg group-hover:text-blue-300 transition-colors">
                        {template.title}
                    </h3>
                    {template.price === 0 ? (
                        <span className="text-sm font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Free
                        </span>
                    ) : (
                        <span className="text-sm font-bold text-white">{formatPrice(template.price)}</span>
                    )}
                </div>

                <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">{template.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.slice(0, 2).map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="border-zinc-700/50 text-zinc-400 text-xs bg-zinc-800/30 backdrop-blur-sm"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {template.tags.length > 2 && (
                        <Badge
                            variant="outline"
                            className="border-zinc-700/50 text-zinc-400 text-xs bg-zinc-800/30 backdrop-blur-sm"
                        >
                            +{template.tags.length - 2}
                        </Badge>
                    )}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                    <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Download className="w-3 h-3" />
                        <span>{formatNumber(template.downloads)}</span>
                    </div>
                </div>

                <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                    size="sm"
                    disabled
                >
                    {/* {template.price === 0 ? "Download Free" : `Purchase $${template.price}`} */}
                    Coming soon...
                </Button>
            </div>
        </div>
    )
}
