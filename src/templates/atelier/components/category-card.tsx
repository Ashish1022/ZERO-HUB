import Link from "next/link"
import Image from "next/image"

import { Skeleton } from "@/components/ui/skeleton"
import type { CategoryCardData } from "@/templates/shared"

export function CategoryCardSkeleton() {
    return (
        <div className="flex flex-col">
            <Skeleton className="aspect-4/5 w-full rounded-tpl" />
            <Skeleton className="mt-4 h-6 w-32" />
        </div>
    )
}

interface Props extends CategoryCardData {
    index?: number
}

export const CategoryCard = ({ name, image, productCount, href, index }: Props) => (
    <Link href={href} prefetch={false} className="group flex flex-col">
        <div className="relative aspect-4/5 overflow-hidden rounded-tpl bg-tpl-surface-muted">
            {image ? (
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
            ) : (
                <div className="atelier-serif flex h-full items-center justify-center text-sm text-tpl-fg-subtle">
                    {name}
                </div>
            )}
        </div>

        <div className="flex items-baseline gap-3 pt-4">
            {index !== undefined && (
                <span className="atelier-serif text-xs text-tpl-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                </span>
            )}
            <div>
                <h3 className="atelier-serif text-xl leading-tight text-tpl-fg transition-colors group-hover:text-tpl-accent">
                    {name}
                </h3>
                <span className="atelier-tracked mt-1 block text-[9px] text-tpl-fg-subtle">
                    {productCount} {productCount === 1 ? "piece" : "pieces"}
                </span>
            </div>
        </div>
    </Link>
)
