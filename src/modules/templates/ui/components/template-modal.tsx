"use client"

import { motion } from "framer-motion"
import { X, Star, Download, Crown, ExternalLink, Check, Calendar, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface TemplateModalProps {
    template: Template | null
    isOpen: boolean
    onClose: () => void
}

const images = ['/templates/4.png', '/templates/5.png', '/templates/7.jpg', '/templates/6.jpg']

export function TemplateModal({ template, isOpen, onClose }: TemplateModalProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    if (!template) return null

    const allImages = [template.preview, ...images]

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`
        }
        return num.toString()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

                    {/* Modal */}
                    <motion.div
                        className="relative bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-white">{template.title}</h2>
                                {template.isPremium && (
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
                                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                                {/* Preview */}
                                <div className="space-y-4">
                                    <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                                        <Image
                                            src={allImages[selectedImage] || "/placeholder.svg"}
                                            alt={template.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Clickable preview thumbnails */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {allImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`relative h-20 rounded-md overflow-hidden transition-all duration-200 ${selectedImage === index
                                                    ? 'ring-2 ring-blue-500 opacity-100'
                                                    : 'opacity-50 hover:opacity-75'
                                                    }`}
                                            >
                                                <Image
                                                    src={image || `/placeholder.svg?height=80&width=120&text=Preview ${index + 1}`}
                                                    alt={`Preview ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-6">
                                    {/* Price and Stats */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {template.price === 0 ? (
                                                <span className="text-2xl font-bold text-green-400">Free</span>
                                            ) : (
                                                <span className="text-2xl font-bold text-white">${template.price}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-zinc-400">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span>{template.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Download className="w-4 h-4" />
                                                <span>{formatNumber(template.downloads)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                                        <p className="text-zinc-300 leading-relaxed">{template.description}</p>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <User className="w-4 h-4" />
                                            <span>by {template.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(template.lastUpdated)}</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Technologies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {template.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-400">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                                        <ul className="space-y-2">
                                            {template.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-zinc-300">
                                                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 pt-4">
                                        <Button className="flex-1 bg-zinc-100 text-black hover:bg-zinc-200" disabled>
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            {/* {template.price === 0 ? "Download Free" : `Purchase $${template.price}`} */} Coming soon...
                                        </Button>
                                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                            Live Demo
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    )
}