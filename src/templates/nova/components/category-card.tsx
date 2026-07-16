import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import type { CategoryCardData } from "@/templates/shared"

export function CategoryCardSkeleton() {
    return (
        <div className="relative aspect-4/3 border border-tpl-line bg-tpl-surface-raised">
            <Skeleton className="h-full w-full rounded-none" />
        </div>
    )
}

export const CategoryCard = ({ name, image, productCount, href, description }: CategoryCardData) => (
    <Link
        href={href}
        prefetch={false}
        className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden border border-tpl-line bg-tpl-surface-raised transition-colors duration-300 hover:border-tpl-accent"
    >
        {image ? (
            <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
            />
        ) : (
            <div className="nova-grid absolute inset-0 opacity-60" aria-hidden="true" />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-tpl-surface via-tpl-surface/60 to-transparent" />

        <div className="relative p-5">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold leading-tight text-tpl-fg">{name}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-tpl-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            {description && (
                <p className="mt-1 line-clamp-1 text-xs text-tpl-fg-muted">{description}</p>
            )}
            <span className="nova-mono mt-2 block text-[10px] text-tpl-accent">
                {productCount} {productCount === 1 ? "item" : "items"}
            </span>
        </div>
    </Link>
)
