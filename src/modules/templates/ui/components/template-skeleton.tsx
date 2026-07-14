"use client"

import { motion } from "framer-motion"

interface TemplateSkeletonProps {
    viewMode: "grid" | "list"
}

export function TemplateSkeleton({ viewMode }: TemplateSkeletonProps) {
    if (viewMode === "list") {
        return (
            <motion.div
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Image skeleton */}
                    <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                        <div className="w-full h-full bg-zinc-800 animate-pulse" />
                        {/* Premium badge skeleton */}
                        <div className="absolute top-3 left-3">
                            <div className="h-6 w-20 bg-zinc-700 rounded-full animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                {/* Title skeleton */}
                                <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse mb-2" />
                                {/* Author skeleton */}
                                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                            </div>
                            {/* Price skeleton */}
                            <div className="h-6 w-16 bg-zinc-800 rounded animate-pulse" />
                        </div>

                        {/* Description skeleton */}
                        <div className="space-y-2 mb-4">
                            <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                            <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                        </div>

                        {/* Tags skeleton */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-6 w-16 bg-zinc-800 rounded-full animate-pulse" />
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            {/* Stats skeleton */}
                            <div className="flex items-center gap-4">
                                <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
                            </div>

                            {/* Buttons skeleton */}
                            <div className="flex gap-2">
                                <div className="h-8 w-20 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-8 w-24 bg-zinc-800 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image skeleton */}
            <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-zinc-800 animate-pulse" />
                {/* Premium badge skeleton */}
                <div className="absolute top-3 left-3">
                    <div className="h-6 w-20 bg-zinc-700 rounded-full animate-pulse" />
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    {/* Title skeleton */}
                    <div className="h-5 w-32 bg-zinc-800 rounded animate-pulse" />
                    {/* Price skeleton */}
                    <div className="h-5 w-12 bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Description skeleton */}
                <div className="space-y-2 mb-3">
                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Tags skeleton */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-5 w-12 bg-zinc-800 rounded-full animate-pulse" />
                    ))}
                </div>

                {/* Stats skeleton */}
                <div className="flex items-center justify-between mb-3">
                    <div className="h-4 w-8 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-zinc-800 rounded animate-pulse" />
                </div>

                {/* Button skeleton */}
                <div className="h-8 w-full bg-zinc-800 rounded animate-pulse" />
            </div>
        </motion.div>
    )
}
