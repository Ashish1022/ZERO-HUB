import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    heading: string
    text?: string
    badge?: string
    badgeVariant?: "default" | "secondary" | "destructive" | "outline"
}

export const DocsHeader = ({
    heading,
    text,
    badge,
    badgeVariant = "outline",
    className,
    ...props
}: DocsPageHeaderProps) => {
    return (
        <div className={cn("space-y-4 pb-8 border-b border-zinc-800/50", className)} {...props}>
            <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                    {heading}
                </h1>
                {badge && (
                    <Badge variant={badgeVariant} className="text-xs">
                        {badge}
                    </Badge>
                )}
            </div>
            {text && <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">{text}</p>}
        </div>
    )
}