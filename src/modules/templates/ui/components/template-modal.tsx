"use client"

import { motion } from "framer-motion"
import { ArrowUpCircle, Check, Crown, Download, Power, Sparkles, Star, User, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { MarketplaceEntry } from "@/modules/templates/server/service"
import { formatCompactNumber, formatPaise } from "@/modules/templates/lib/format"

interface TemplateModalProps {
    template: MarketplaceEntry | null
    isOpen: boolean
    onClose: () => void
    onPrimaryAction: () => void
    onDeactivate: () => void
    busy?: boolean
    signedIn?: boolean
}

const primaryAction = (template: MarketplaceEntry, signedIn: boolean) => {
    if (!signedIn) {
        return { label: template.pricing.model === 'free' ? 'Sign in to use' : 'Sign in to buy', icon: Sparkles, disabled: false }
    }
    if (template.active) return { label: 'Currently active', icon: Check, disabled: true }
    if (template.owned) {
        return template.updateAvailable
            ? { label: `Update to v${template.version}`, icon: ArrowUpCircle, disabled: false }
            : { label: 'Activate', icon: Power, disabled: false }
    }
    if (template.pricing.model === 'free') return { label: 'Use for free', icon: Download, disabled: false }
    return { label: `Buy ${formatPaise(template.pricing.amount)}`, icon: Crown, disabled: false }
}

export function TemplateModal({
    template,
    isOpen,
    onClose,
    onPrimaryAction,
    onDeactivate,
    busy = false,
    signedIn = false,
}: TemplateModalProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        setSelectedImage(0)
    }, [template?.slug])

    useEffect(() => {
        if (!isOpen) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isOpen, onClose])

    if (!template || !isOpen) return null

    const images = template.screenshots.length > 0 ? template.screenshots : [template.thumbnail]
    const action = primaryAction(template, signedIn)
    const ActionIcon = action.icon

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                className="relative bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                role="dialog"
                aria-modal="true"
                aria-label={template.name}
            >
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-white">{template.name}</h2>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                            v{template.version}
                        </Badge>
                        {template.active && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <Check className="w-3 h-3 mr-1" />
                                Active
                            </Badge>
                        )}
                        {!template.active && template.owned && (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Owned</Badge>
                        )}
                        {!template.owned && template.pricing.model === 'paid' && (
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                            </Badge>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close"
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800 shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                        <div className="space-y-4">
                            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden bg-zinc-800">
                                <Image
                                    src={images[selectedImage] || "/placeholder.png"}
                                    alt={`${template.name} preview ${selectedImage + 1}`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>

                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {images.map((image, index) => (
                                        <button
                                            key={image}
                                            onClick={() => setSelectedImage(index)}
                                            aria-label={`View preview ${index + 1}`}
                                            className={`relative h-20 rounded-md overflow-hidden transition-all duration-200 ${selectedImage === index
                                                ? 'ring-2 ring-blue-500 opacity-100'
                                                : 'opacity-50 hover:opacity-75'
                                                }`}
                                        >
                                            <Image
                                                src={image || "/placeholder.png"}
                                                alt=""
                                                fill
                                                sizes="120px"
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-3">
                                    {template.pricing.model === 'free' ? (
                                        <span className="text-2xl font-bold text-green-400">Free</span>
                                    ) : (
                                        <>
                                            <span className="text-2xl font-bold text-white">
                                                {formatPaise(template.pricing.amount)}
                                            </span>
                                            {template.pricing.compareAtAmount ? (
                                                <span className="text-sm text-zinc-500 line-through">
                                                    {formatPaise(template.pricing.compareAtAmount)}
                                                </span>
                                            ) : null}
                                            {template.pricing.discountPercent !== null && (
                                                <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                                                    -{template.pricing.discountPercent}%
                                                </Badge>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-zinc-400">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>
                                            {template.stats.ratingCount > 0
                                                ? template.stats.ratingAverage.toFixed(1)
                                                : 'New'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download className="w-4 h-4" />
                                        <span>{formatCompactNumber(template.stats.activeInstalls)}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                                <p className="text-zinc-300 leading-relaxed">{template.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <User className="w-4 h-4" />
                                    <span>by {template.author}</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="capitalize">{template.category}</span>
                                </div>
                            </div>

                            {template.updateAvailable && (
                                <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-200">
                                    You&apos;re on v{template.installedVersion}. Activating updates you to v
                                    {template.version}.
                                </div>
                            )}

                            {template.tags.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {template.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-400">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {template.features.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                                    <ul className="space-y-2">
                                        {template.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-zinc-300">
                                                <Check className="w-4 h-4 text-green-400 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                {template.active ? (
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                        onClick={onDeactivate}
                                        disabled={busy}
                                    >
                                        <Power className="w-4 h-4 mr-2" />
                                        Deactivate
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-1 bg-zinc-100 text-black hover:bg-zinc-200"
                                        onClick={onPrimaryAction}
                                        disabled={action.disabled || busy}
                                    >
                                        <ActionIcon className="w-4 h-4 mr-2" />
                                        {busy ? 'Working…' : action.label}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
