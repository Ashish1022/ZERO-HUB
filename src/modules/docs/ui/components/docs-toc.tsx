"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DocsTocProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DocsToc({ className, ...props }: DocsTocProps) {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
    const [activeId, setActiveId] = useState<string>("")
    const pathname = usePathname()

    useEffect(() => {
        setHeadings([])
        setActiveId("")
        const timeoutId = setTimeout(() => {
            const elements = Array.from(document.querySelectorAll("h2, h3"))
                .filter((element) => element.id)
                .map((element) => ({
                    id: element.id,
                    text: element.textContent || "",
                    level: Number(element.tagName.substring(1)),
                }))

            setHeadings(elements)

            if (elements.length > 0) {
                setActiveId(elements[0].id)
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id)
                        }
                    })
                },
                {
                    rootMargin: "0px 0px -80% 0px",
                    threshold: 0.1,
                },
            )

            elements.forEach(({ id }) => {
                const element = document.getElementById(id)
                if (element) {
                    observer.observe(element)
                }
            })

            return () => {
                elements.forEach(({ id }) => {
                    const element = document.getElementById(id)
                    if (element) {
                        observer.unobserve(element)
                    }
                })
                observer.disconnect()
            }
        }, 100)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [pathname])

    if (headings.length === 0) {
        return null
    }

    return (
        <div className={cn("space-y-2", className)} {...props}>
            <p className="font-medium">On This Page</p>
            <ul className="space-y-2 text-sm ml-6">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "inline-block transition-colors hover:text-zinc-100",
                                activeId === heading.id ? "text-zinc-100 font-medium" : "text-zinc-400",
                                heading.level === 3 && "pl-4",
                            )}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
