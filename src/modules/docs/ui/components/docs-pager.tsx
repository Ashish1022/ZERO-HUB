import type React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocsPagerProps extends React.HTMLAttributes<HTMLDivElement> {
    prev?: {
        href: string
        title: string
    }
    next?: {
        href: string
        title: string
    }
}

export function DocsPager({ prev, next, className, ...props }: DocsPagerProps) {
    return (
        <div className={cn("flex items-center justify-between mt-12 pt-6 border-t border-zinc-800", className)} {...props}>
            {prev ? (
                <Link
                    href={prev.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm transition-colors hover:bg-zinc-900"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {prev.title}
                </Link>
            ) : (
                <div />
            )}
            {next && (
                <Link
                    href={next.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm transition-colors hover:bg-zinc-900"
                >
                    {next.title}
                    <ChevronRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    )
}
