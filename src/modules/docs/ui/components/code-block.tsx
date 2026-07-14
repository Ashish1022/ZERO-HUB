"use client"

import type React from "react"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    language?: string
    children: string
    variant?: "code" | "command"
}

export function CodeBlock({ language, children, variant = "code", className, ...props }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(children)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const isCommand = variant === "command"

    return (
        <div className="relative group">
            <pre
                className={cn(
                    "px-4 py-3 rounded-lg overflow-x-auto text-sm",
                    isCommand ? "bg-zinc-950 border border-zinc-800 font-mono" : "bg-[#282c34] text-[#abb2bf] border border-zinc-700/50 rounded-[0.5rem]",
                    className,
                )}
                {...props}
            >
                {!isCommand && language && (
                    <div className="absolute top-2 right-12 bg-zinc-700/50 rounded px-2 py-0.5 text-xs font-mono text-zinc-300">
                        {language}
                    </div>
                )}
                {isCommand && (
                    <div className="absolute top-2 left-2 text-zinc-500">
                        <Terminal className="h-4 w-4" />
                    </div>
                )}
                <code className={cn("font-mono", isCommand ? "pl-6 text-zinc-300" : "text-zinc-100")}>
                    {isCommand
                        ? children
                            .split("\n")
                            .map((line) => (line.trim() ? `$ ${line}` : line))
                            .join("\n")
                        : children}
                </code>
            </pre>
            <button
                className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-700/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                onClick={onCopy}
                aria-label="Copy code"
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
        </div>
    )
}
