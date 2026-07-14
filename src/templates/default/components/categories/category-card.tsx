import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    name: string
    image?: string | null
    itemCount?: number | null
    href: string
    description?: string | null
}

export const CategoryCard = ({ itemCount, href, name, image, description }: Props) => {

    return (
        <Link href={href} className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                    <Image
                        src={image || "/placeholder.png"}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{itemCount ? itemCount : 0} product{itemCount === 1 ? '' : 's'}</span>
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                        {name}
                    </h3>
                    {description && (
                        <p className="text-stone-600 text-sm truncate">{description}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export function CategoryCardSkeleton() {
    return (
        <div className="block">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                    <Skeleton className="h-full w-full" />
                </div>

                <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        </div>
    )
}