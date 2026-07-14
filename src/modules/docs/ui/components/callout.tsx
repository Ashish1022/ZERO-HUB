import type React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "warning" | "info" | "success"
}

export function Callout({ children, variant = "default", className, ...props }: CalloutProps) {
    const icons = {
        default: Info,
        warning: AlertCircle,
        info: Info,
        success: CheckCircle,
    }

    const Icon = icons[variant]

    const variantStyles = {
        default: "bg-zinc-900 border-zinc-800 text-zinc-100",
        warning: "bg-amber-950/20 border-amber-800/30 text-amber-200",
        info: "bg-blue-950/20 border-blue-800/30 text-blue-200",
        success: "bg-green-950/20 border-green-800/30 text-green-200",
    }

    const iconColors = {
        default: "text-zinc-400",
        warning: "text-amber-400",
        info: "text-blue-400",
        success: "text-green-400",
    }

    return (
        <div className={cn("flex items-start gap-4 rounded-lg border p-4", variantStyles[variant], className)} {...props}>
            <Icon className={cn("mt-1 h-5 w-5 flex-shrink-0", iconColors[variant])} />
            <div>{children}</div>
        </div>
    )
}
