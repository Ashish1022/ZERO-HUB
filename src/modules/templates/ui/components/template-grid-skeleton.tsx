"use client"

import { TemplateSkeleton } from "./template-skeleton"

interface TemplatesGridSkeletonProps {
    viewMode: "grid" | "list"
    count?: number
}

export function TemplatesGridSkeleton({ viewMode, count = 8 }: TemplatesGridSkeletonProps) {
    return (
        <div
            className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
        >
            {Array.from({ length: count }).map((_, index) => (
                <TemplateSkeleton key={index} viewMode={viewMode} />
            ))}
        </div>
    )
}
