import { cn } from "@/lib/utils";
import { ChevronDown, LucideIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { memo, RefObject, useMemo } from "react";

interface DropdownItem {
    icon: LucideIcon;
    description: string;
    label: string;
    href: string;
}

interface NavbarDropdownProps {
    subtitle: string;
    active: string;
    title: string;
    items: DropdownItem[];
    dropdownRef?: RefObject<HTMLDivElement | null>;
    containerRef?: RefObject<HTMLDivElement | null>;
    overflow?: boolean;
    mobile?: boolean;
}

const DropdownItemComponent = memo<{
    item: DropdownItem;
    mobile?: boolean;
}>(({ item, mobile = false }) => {
    const baseClasses = "flex flex-col p-3 rounded-md transition-all duration-200 group";
    const hoverClasses = mobile
        ? "hover:bg-zinc-800/40"
        : "hover:bg-zinc-800/60";

    return (
        <Link
            href={item.href}
            className={cn(baseClasses, hoverClasses)}
        >
            <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                <span className="text-zinc-300 group-hover:text-white text-sm font-medium transition-colors">
                    {item.label}
                </span>
            </div>
            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 ml-7 mt-1 leading-relaxed transition-colors">
                {item.description}
            </span>
        </Link>
    );
});

DropdownItemComponent.displayName = "DropdownItemComponent";

const MobileDropdown = memo<{
    title: string;
    subtitle?: string;
    items: DropdownItem[];
    containerRef?: RefObject<HTMLDivElement | null>;
    overflow?: boolean;
}>(({ title, subtitle, items, containerRef, overflow }) => {
    const containerClasses = useMemo(() => {
        const baseClasses = "space-y-1 px-2 pb-2";
        return overflow
            ? cn(baseClasses, "max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent")
            : baseClasses;
    }, [overflow]);

    return (
        <details className="group">
            <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-800/30 rounded-md transition-colors">
                <span className="text-zinc-300 font-medium">{title}</span>
                <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform group-open:rotate-180" />
            </summary>

            {subtitle && (
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="h-3 w-3" />
                        {subtitle}
                    </div>
                    <div className="h-px bg-zinc-800 mt-2" />
                </div>
            )}

            <div ref={containerRef} className={containerClasses}>
                {items.map((item) => (
                    <DropdownItemComponent key={item.href} item={item} mobile />
                ))}
            </div>
        </details>
    );
});

MobileDropdown.displayName = "MobileDropdown";

const DesktopDropdown = memo<{
    title: string;
    subtitle?: string;
    active: string;
    items: DropdownItem[];
    dropdownRef?: RefObject<HTMLDivElement | null>;
    containerRef?: RefObject<HTMLDivElement | null>;
    overflow?: boolean;
}>(({ title, subtitle, active, items, dropdownRef, containerRef, overflow }) => {
    const isActive = useMemo(() => active === '/features', [active]);

    const containerClasses = useMemo(() => {
        const baseClasses = "grid gap-2";
        const responsiveClasses = "grid-cols-1 sm:grid-cols-2";
        const overflowClasses = "max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent hover:scrollbar-thumb-zinc-600";

        return overflow
            ? cn(baseClasses, responsiveClasses, overflowClasses)
            : baseClasses;
    }, [overflow]);

    return (
        <div className="relative group">
            <button
                className="group relative px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 hover:bg-zinc-800/30 rounded-md"
                aria-expanded="false"
                aria-haspopup="true"
                aria-label={`${title} menu`}
            >
                <span className={cn(
                    'transition-colors',
                    isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                )}>
                    {title}
                </span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />

                {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white" />
                )}

                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white/60 transition-transform duration-200 group-hover:scale-x-100" />
            </button>

            <div
                ref={dropdownRef}
                className="absolute left-0 top-full mt-2 w-72 sm:w-80 md:w-96 lg:w-[320px]
                  origin-top-left opacity-0 invisible scale-95 transform 
                  transition-all duration-300 ease-out delay-75
                  group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:delay-0
                  z-50"
                role="menu"
                aria-label={`${title} dropdown menu`}
            >
                <div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800/60 rounded-xl shadow-2xl p-5 overflow-hidden">
                    {subtitle && (
                        <>
                            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">
                                <Sparkles className="h-3 w-3 text-zinc-500" />
                                {subtitle}
                            </div>
                            <div className="h-px bg-gradient-to-r from-zinc-700 via-zinc-800 to-transparent mb-4" />
                        </>
                    )}

                    <div ref={containerRef} className={containerClasses}>
                        {items.map((item) => (
                            <DropdownItemComponent key={item.href} item={item} />
                        ))}
                    </div>
                </div>

                <div className="absolute -top-1 left-6 w-2 h-2 bg-zinc-900 border-l border-t border-zinc-800/60 rotate-45" />
            </div>
        </div>
    );
});

DesktopDropdown.displayName = "DesktopDropdown";

export const NavbarDropdown = memo<NavbarDropdownProps>(({
    active,
    title,
    dropdownRef,
    items = [],
    overflow = false,
    containerRef,
    subtitle,
    mobile = false
}) => {
    if (!items.length) {
        return (
            <button className="group relative px-3 py-2 text-sm transition-colors flex items-center cursor-not-allowed opacity-50">
                <span className="text-zinc-500">{title}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
            </button>
        );
    }

    return mobile ? (
        <MobileDropdown
            title={title}
            subtitle={subtitle}
            items={items}
            containerRef={containerRef}
            overflow={overflow}
        />
    ) : (
        <DesktopDropdown
            title={title}
            subtitle={subtitle}
            active={active}
            items={items}
            dropdownRef={dropdownRef}
            containerRef={containerRef}
            overflow={overflow}
        />
    );
});

NavbarDropdown.displayName = "NavbarDropdown";