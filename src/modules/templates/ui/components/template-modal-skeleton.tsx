"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface TemplateModalSkeletonProps {
    isOpen: boolean
    onClose: () => void
}

export function TemplateModalSkeleton({ isOpen, onClose }: TemplateModalSkeletonProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <motion.div
                className="relative bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        {/* Title skeleton */}
                        <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
                        {/* Badge skeleton */}
                        <div className="h-6 w-20 bg-zinc-800 rounded-full animate-pulse" />
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
                        {/* Preview skeleton */}
                        <div className="space-y-4">
                            {/* Main preview */}
                            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                                <div className="w-full h-full bg-zinc-800 animate-pulse" />
                            </div>

                            {/* Additional previews */}
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="relative h-20 rounded-md overflow-hidden">
                                        <div className="w-full h-full bg-zinc-800 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details skeleton */}
                        <div className="space-y-6">
                            {/* Price and Stats */}
                            <div className="flex items-center justify-between">
                                <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
                                <div className="flex items-center gap-4">
                                    <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse" />
                                    <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse mb-2" />
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                                    <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-4 w-28 bg-zinc-800 rounded animate-pulse" />
                            </div>

                            {/* Tags */}
                            <div>
                                <div className="h-6 w-28 bg-zinc-800 rounded animate-pulse mb-2" />
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-6 w-16 bg-zinc-800 rounded-full animate-pulse" />
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse mb-2" />
                                <div className="space-y-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="h-4 w-4 bg-zinc-800 rounded animate-pulse" />
                                            <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <div className="flex-1 h-10 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-10 w-24 bg-zinc-800 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
