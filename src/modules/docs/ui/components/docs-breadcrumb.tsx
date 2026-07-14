"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function DocsBreadcrumb() {
    const pathname = usePathname()

    // Generate breadcrumb items from pathname
    const pathSegments = pathname.split("/").filter(Boolean)

    // Remove 'docs' from the beginning if present
    const docsIndex = pathSegments.indexOf("docs")
    const relevantSegments = docsIndex !== -1 ? pathSegments.slice(docsIndex + 1) : pathSegments

    const breadcrumbItems = [
        { label: "Documentation", href: "/docs" },
        ...relevantSegments.map((segment, index) => {
            const href = "/docs/" + relevantSegments.slice(0, index + 1).join("/")
            const label = segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")

            return { label, href }
        }),
    ]

    if (breadcrumbItems.length <= 1) {
        return null
    }

    return (
        <nav className="flex items-center space-x-1 text-sm text-zinc-400">
            <Link href="/docs" className="flex items-center gap-1 hover:text-white transition-colors">
                <Home className="h-4 w-4" />
                <span className="sr-only">Documentation</span>
            </Link>

            {breadcrumbItems.slice(1).map((item, index) => (
                <React.Fragment key={item.href}>
                    <ChevronRight className="h-4 w-4 text-zinc-600" />
                    {index === breadcrumbItems.length - 2 ? (
                        <span className="font-medium text-white">{item.label}</span>
                    ) : (
                        <Link href={item.href} className="hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}
