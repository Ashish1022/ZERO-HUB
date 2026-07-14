"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { BookOpen, List, Menu, MessageCircle, Search, X } from "lucide-react"
import { Github } from "@/components/brand-icons"

import { DocsBreadcrumb } from "@/modules/docs/ui/components/docs-breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DocsSearch } from "@/modules/docs/ui/components/docs-search"
import { DocsSidebar } from "@/modules/docs/ui/components/docs-sidebar"
import { usePathname } from "next/navigation"
import { DocsToc } from "@/modules/docs/ui/components/docs-toc"

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [tocOpen, setTocOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const pathname = usePathname()

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setSearchOpen(true)
            }
            if (e.key === "Escape") {
                setSidebarOpen(false)
                setTocOpen(false)
                setSearchOpen(false)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Close sidebars on route change
    useEffect(() => {
        setSidebarOpen(false)
        setTocOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile sidebars are open
    useEffect(() => {
        if ((sidebarOpen || tocOpen) && window.innerWidth < 1024) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [sidebarOpen, tocOpen])

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="sticky top-0 z-50 h-14 sm:h-16 border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl">
                <div className="flex h-full items-center justify-between px-3 sm:px-4 md:px-6">
                    {/* Left side - Logo and title */}
                    <div className="flex items-center gap-2 min-w-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 hover:bg-zinc-800/50 mr-2"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                        >
                            {sidebarOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
                        </Button>

                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                        <h1 className="text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            Documentation
                        </h1>
                        <Badge variant="outline" className="hidden sm:inline-flex border-blue-500/20 text-blue-400 text-xs ml-2">
                            v2.0
                        </Badge>
                    </div>

                    {/* Right side - Search and actions */}
                    <div className="flex items-center gap-2">
                        {/* Desktop search */}
                        <div className="hidden md:flex">
                            <Button
                                variant="outline"
                                className="w-48 lg:w-64 xl:w-72 justify-start text-zinc-400 border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800/50 h-9"
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="text-sm truncate">Search docs...</span>
                                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-xs text-zinc-400">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </Button>
                        </div>

                        {/* Mobile search */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden h-8 w-8 sm:h-9 sm:w-9 hover:bg-zinc-800/50"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>

                        {/* Mobile TOC toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="xl:hidden h-8 w-8 sm:h-9 sm:w-9 hover:bg-zinc-800/50"
                            onClick={() => setTocOpen(!tocOpen)}
                            aria-label={tocOpen ? "Close table of contents" : "Open table of contents"}
                        >
                            <List className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>

                        {/* Desktop actions */}
                        <div className="hidden lg:flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 h-9">
                                <Github className="h-4 w-4" />
                                <span className="hidden xl:inline ml-2">GitHub</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 h-9">
                                <MessageCircle className="h-4 w-4" />
                                <span className="hidden xl:inline ml-2">Support</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main layout container */}
            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
                    <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-zinc-800/50 bg-zinc-950">
                        <div className="p-6">
                            <DocsSidebar />
                        </div>
                    </div>
                </aside>

                {/* Main content area */}
                <div className="flex-1 min-w-0">
                    <div className="flex">
                        {/* Main content */}
                        <main className="flex-1 min-w-0">
                            <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 xl:py-8">
                                <DocsBreadcrumb />
                                <div className="mt-4 lg:mt-6">{children}</div>
                            </div>
                        </main>

                        {/* Desktop TOC */}
                        <aside className="hidden xl:block w-64 flex-shrink-0">
                            <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l border-zinc-800/50 bg-zinc-950">
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/50">
                                            <List className="h-4 w-4 text-blue-400" />
                                            <h3 className="text-sm font-semibold text-white">Table of Contents</h3>
                                        </div>
                                        <DocsToc />
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 top-14 sm:top-16 z-20 bg-zinc-950/80 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    />
                    <aside className="fixed top-14 sm:top-16 left-0 z-30 w-full max-w-xs sm:max-w-sm h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800/50 lg:hidden">
                        <div className="h-full overflow-y-auto p-4 sm:p-6">
                            <DocsSidebar />
                        </div>
                    </aside>
                </>
            )}

            {/* Mobile TOC Overlay */}
            {tocOpen && (
                <>
                    <div
                        className="fixed inset-0 top-14 sm:top-16 z-20 bg-zinc-950/80 backdrop-blur-sm xl:hidden"
                        onClick={() => setTocOpen(false)}
                        aria-label="Close table of contents"
                    />
                    <aside className="fixed top-14 sm:top-16 right-0 z-30 w-full max-w-xs sm:max-w-sm h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-800/50 xl:hidden">
                        <div className="h-full overflow-y-auto p-4 sm:p-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/50">
                                    <List className="h-4 w-4 text-blue-400" />
                                    <h3 className="text-sm font-semibold text-white">Table of Contents</h3>
                                </div>
                                <DocsToc />
                            </div>
                        </div>
                    </aside>
                </>
            )}

            {/* Search modal */}
            <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
    )
}

export default DocsLayout
