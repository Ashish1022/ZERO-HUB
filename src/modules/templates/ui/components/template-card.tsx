"use client"

import { ArrowUpCircle, Check, Crown, Download, Eye, Power, Sparkles, Star } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { MarketplaceEntry } from "@/modules/templates/server/service"
import { formatCompactNumber, formatPaise } from "@/modules/templates/lib/format"

interface TemplateCardProps {
    template: MarketplaceEntry
    viewMode: "grid" | "list"
    onPreview: () => void
    onPrimaryAction: () => void
    onDeactivate: () => void
    busy?: boolean
    signedIn?: boolean
}

const primaryAction = (template: MarketplaceEntry, signedIn: boolean) => {
    if (!signedIn) {
        return { label: template.pricing.model === 'free' ? 'Sign in to use' : 'Sign in to buy', icon: Sparkles, disabled: false }
    }
    if (template.active) {
        return { label: 'Active', icon: Check, disabled: true }
    }
    if (template.owned) {
        return template.updateAvailable
            ? { label: `Update to v${template.version}`, icon: ArrowUpCircle, disabled: false }
            : { label: 'Activate', icon: Power, disabled: false }
    }
    if (template.pricing.model === 'free') {
        return { label: 'Use for free', icon: Download, disabled: false }
    }
    return { label: `Buy ${formatPaise(template.pricing.amount)}`, icon: Crown, disabled: false }
}

const PriceTag = ({ template, large }: { template: MarketplaceEntry; large?: boolean }) => {
    const size = large ? 'text-2xl' : 'text-sm'

    if (template.pricing.model === 'free') {
        return (
            <span className={`${size} font-bold bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent`}>
                Free
            </span>
        )
    }

    return (
        <div className="flex items-center gap-2">
            {template.pricing.compareAtAmount ? (
                <span className="text-xs text-zinc-500 line-through">
                    {formatPaise(template.pricing.compareAtAmount)}
                </span>
            ) : null}
            <span className={`${size} font-bold text-white`}>{formatPaise(template.pricing.amount)}</span>
        </div>
    )
}

const StatusBadges = ({ template }: { template: MarketplaceEntry }) => (
    <>
        {template.active && (
            <Badge className="bg-linear-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 backdrop-blur-sm">
                <Check className="w-3 h-3 mr-1" />
                Active
            </Badge>
        )}
        {!template.active && template.owned && (
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 backdrop-blur-sm">
                Owned
            </Badge>
        )}
        {!template.owned && template.pricing.model === 'paid' && (
            <Badge className="bg-linear-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30 backdrop-blur-sm">
                <Crown className="w-3 h-3 mr-1" />
                Premium
            </Badge>
        )}
        {template.pricing.discountPercent !== null && !template.owned && (
            <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 backdrop-blur-sm">
                -{template.pricing.discountPercent}%
            </Badge>
        )}
    </>
)

export function TemplateCard({
    template,
    viewMode,
    onPreview,
    onPrimaryAction,
    onDeactivate,
    busy = false,
    signedIn = false,
}: TemplateCardProps) {
    const action = primaryAction(template, signedIn)
    const ActionIcon = action.icon

    if (viewMode === "list") {
        return (
            <div className="bg-linear-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-700/70 transition-all duration-500 backdrop-blur-sm group">
                <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                        <Image
                            src={template.thumbnail || "/placeholder.png"}
                            alt={template.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <StatusBadges template={template} />
                        </div>
                    </div>

                    <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-4 gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                    {template.name}
                                </h3>
                                <p className="text-zinc-400 text-sm flex items-center gap-2">
                                    <Sparkles className="h-3 w-3 shrink-0" />
                                    by {template.author} · v{template.version}
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <PriceTag template={template} large />
                            </div>
                        </div>

                        <p className="text-zinc-300 mb-6 line-clamp-2 leading-relaxed">{template.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {template.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30 backdrop-blur-sm">
                                    {tag}
                                </Badge>
                            ))}
                            {template.tags.length > 3 && (
                                <Badge variant="outline" className="border-zinc-700/50 text-zinc-400 bg-zinc-800/30 backdrop-blur-sm">
                                    +{template.tags.length - 3}
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-6 text-sm text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">
                                        {template.stats.ratingCount > 0 ? template.stats.ratingAverage.toFixed(1) : 'New'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    <span>{formatCompactNumber(template.stats.activeInstalls)} active</span>
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
                                {template.active ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={onDeactivate}
                                        disabled={busy}
                                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                    >
                                        <Power className="w-4 h-4 mr-2" />
                                        Deactivate
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        onClick={onPrimaryAction}
                                        disabled={action.disabled || busy}
                                        className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                                    >
                                        <ActionIcon className="w-4 h-4 mr-2" />
                                        {busy ? 'Working…' : action.label}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-linear-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-700/70 transition-all duration-500 group backdrop-blur-sm flex flex-col h-full">
            <div className="relative h-52 overflow-hidden shrink-0">
                <Image
                    src={template.thumbnail || "/placeholder.png"}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <StatusBadges template={template} />
                </div>
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

            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3 gap-3">
                    <h3 className="font-bold text-white line-clamp-1 text-lg group-hover:text-blue-300 transition-colors">
                        {template.name}
                    </h3>
                    <div className="shrink-0">
                        <PriceTag template={template} />
                    </div>
                </div>

                <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">{template.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="border-zinc-700/50 text-zinc-400 text-xs bg-zinc-800/30 backdrop-blur-sm">
                            {tag}
                        </Badge>
                    ))}
                    {template.tags.length > 2 && (
                        <Badge variant="outline" className="border-zinc-700/50 text-zinc-400 text-xs bg-zinc-800/30 backdrop-blur-sm">
                            +{template.tags.length - 2}
                        </Badge>
                    )}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 mt-auto">
                    <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                            {template.stats.ratingCount > 0 ? template.stats.ratingAverage.toFixed(1) : 'New'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Download className="w-3 h-3" />
                        <span>{formatCompactNumber(template.stats.activeInstalls)} active</span>
                    </div>
                </div>

                {template.active ? (
                    <Button
                        variant="outline"
                        className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        size="sm"
                        onClick={onDeactivate}
                        disabled={busy}
                    >
                        <Power className="w-4 h-4 mr-2" />
                        Deactivate
                    </Button>
                ) : (
                    <Button
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                        size="sm"
                        onClick={onPrimaryAction}
                        disabled={action.disabled || busy}
                    >
                        <ActionIcon className="w-4 h-4 mr-2" />
                        {busy ? 'Working…' : action.label}
                    </Button>
                )}
            </div>
        </div>
    )
}
