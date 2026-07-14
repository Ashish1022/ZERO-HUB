"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Link from "next/link";

export const Header = () => {
    const router = useRouter();
    return (
        <header className="h-16 border-b border-zinc-800/50 w-full bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto flex justify-between font-medium items-center h-full px-2 lg:px-6">
                <Link
                    href="/"
                    className="group flex items-center text-xl font-bold tracking-tighter text-white hover:scale-105 transition-transform duration-200"
                >
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700 group-hover:shadow-lg">
                        <span className="text-sm font-bold">Z</span>
                    </div>
                    ZERO<span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">HUB</span>
                </Link>
                <Button variant="ghost" className="text-zinc-400" onClick={() => router.push("/")}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                </Button>
            </div>
        </header>
    )
}