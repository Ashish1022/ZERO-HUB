import { BarChart3, BookOpen, ChevronDown, CreditCard, Database, FileText, HelpCircle, Layers, Mail, Map, Package, Palette, Rocket, Settings, Shield, ShoppingCart, Star, Store, Tags, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type DocsSidebarNavProps = React.HTMLAttributes<HTMLDivElement>

export const DocsSidebar = ({ className, ...props }: DocsSidebarNavProps) => {
    return (
        <div className={cn("space-y-6 scrollbar-hide", className)} {...props}>
            <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-white">Getting Started</h4>
                </div>
                <div className="space-y-1">
                    <NavLink href="/docs" exact icon={<BookOpen className="h-4 w-4" />}>
                        Overview
                    </NavLink>
                    <NavLink href="/docs/introduction" icon={<FileText className="h-4 w-4" />}>
                        Introduction
                    </NavLink>
                </div>
            </div>

            <div className="space-y-3">
                <NavGroup icon={<Store className="h-4 w-4 text-green-400" />} title="Get Started" badge="Essential" defaultOpen>
                    <NavLink href="/docs/get-started/account-setup" icon={<Users className="h-4 w-4" />}>
                        Account Creation & Setup
                    </NavLink>
                    <NavLink href="/docs/get-started/account-subscription" icon={<CreditCard className="h-4 w-4" />}>
                        Purchase Subscription
                    </NavLink>
                    <NavLink href="/docs/get-started/account-verification" icon={<Shield className="h-4 w-4" />}>
                        Bank Account Verification
                    </NavLink>
                </NavGroup>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    <h4 className="text-sm font-semibold text-white">Dashboard Docs</h4>
                </div>

                <NavGroup icon={<Package className="h-4 w-4 text-blue-400" />} title="Products" badge="Core">
                    <NavLink href="/docs/dashboard/products/create" icon={<Package className="h-4 w-4" />}>
                        Create Products
                    </NavLink>
                    <NavLink href="/docs/dashboard/products/update" icon={<Settings className="h-4 w-4" />}>
                        Update Products
                    </NavLink>
                    <NavLink href="/docs/dashboard/products/delete" icon={<FileText className="h-4 w-4" />}>
                        Delete Products
                    </NavLink>
                    <NavLink href="/docs/dashboard/products/inventory" icon={<Database className="h-4 w-4" />}>
                        Inventory Management
                    </NavLink>
                </NavGroup>

                <NavGroup icon={<Tags className="h-4 w-4 text-green-400" />} title="Categories">
                    <NavLink href="/docs/dashboard/categories/create" icon={<Tags className="h-4 w-4" />}>
                        Create Categories
                    </NavLink>
                    <NavLink href="/docs/dashboard/categories/update" icon={<Settings className="h-4 w-4" />}>
                        Update Categories
                    </NavLink>
                    <NavLink href="/docs/dashboard/categories/delete" icon={<FileText className="h-4 w-4" />}>
                        Delete Categories
                    </NavLink>
                    <NavLink href="/docs/dashboard/categories/organization" icon={<Layers className="h-4 w-4" />}>
                        Category Organization
                    </NavLink>
                </NavGroup>

                <NavGroup icon={<Star className="h-4 w-4 text-yellow-400" />} title="Reviews">
                    <NavLink href="/docs/dashboard/reviews/management" icon={<Star className="h-4 w-4" />}>
                        Review Management
                    </NavLink>
                    <NavLink href="/docs/dashboard/reviews/moderation" icon={<Shield className="h-4 w-4" />}>
                        Review Moderation
                    </NavLink>
                    <NavLink href="/docs/dashboard/reviews/responses" icon={<Mail className="h-4 w-4" />}>
                        Responding to Reviews
                    </NavLink>
                </NavGroup>

                <NavGroup icon={<Users className="h-4 w-4 text-cyan-400" />} title="Customers">
                    <NavLink href="/docs/dashboard/customers/management" icon={<Users className="h-4 w-4" />}>
                        Customer Management
                    </NavLink>
                    <NavLink href="/docs/dashboard/customers/profiles" icon={<FileText className="h-4 w-4" />}>
                        Customer Profiles
                    </NavLink>
                    <NavLink href="/docs/dashboard/customers/support" icon={<HelpCircle className="h-4 w-4" />}>
                        Customer Support
                    </NavLink>
                </NavGroup>

                <NavGroup icon={<ShoppingCart className="h-4 w-4 text-orange-400" />} title="Orders">
                    <NavLink href="/docs/dashboard/orders/management" icon={<ShoppingCart className="h-4 w-4" />}>
                        Order Management
                    </NavLink>
                    <NavLink href="/docs/dashboard/orders/fulfillment" icon={<Package className="h-4 w-4" />}>
                        Order Fulfillment
                    </NavLink>
                    <NavLink href="/docs/dashboard/orders/tracking" icon={<Map className="h-4 w-4" />}>
                        Order Tracking
                    </NavLink>
                    <NavLink href="/docs/dashboard/orders/returns" icon={<FileText className="h-4 w-4" />}>
                        Returns & Refunds
                    </NavLink>
                </NavGroup>
            </div>

            <div className="space-y-3">
                <NavGroup icon={<Palette className="h-4 w-4 text-pink-400" />} title="Templates" badge="Popular">
                    <NavLink href="/docs/templates/purchase" icon={<CreditCard className="h-4 w-4" />}>
                        Purchase Templates
                    </NavLink>
                    <NavLink href="/docs/templates/change" icon={<Settings className="h-4 w-4" />}>
                        Change Templates
                    </NavLink>
                    <NavLink href="/docs/templates/customize" icon={<Palette className="h-4 w-4" />}>
                        Template Customization
                    </NavLink>
                    <NavLink href="/docs/templates/marketplace" icon={<Store className="h-4 w-4" />}>
                        Template Marketplace
                    </NavLink>
                </NavGroup>
            </div>

            {/* <div className="space-y-3">
                <NavGroup icon={<Paintbrush className="h-4 w-4 text-amber-400" />} title="Templates" badge="Secure">
                    <NavLink href="/docs/templates/purchase" icon={<Key className="h-4 w-4" />}>
                        Purchase Templates
                    </NavLink>
                    <NavLink href="/docs/templates/apply" icon={<Globe className="h-4 w-4" />}>
                        Apply Templates
                    </NavLink>
                    <NavLink href="/docs/templates/customize" icon={<Users className="h-4 w-4" />}>
                        Customize Templates
                    </NavLink>
                    <NavLink href="/docs/templates/custom" icon={<Shield className="h-4 w-4" />}>
                        Custom Templates
                    </NavLink>
                </NavGroup>
            </div> */}

            {/* <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <HelpCircle className="h-4 w-4 text-cyan-400" />
                    <h4 className="text-sm font-semibold text-white">Resources</h4>
                </div>
                <div className="space-y-1">
                    <NavLink href="/docs/resources/faq" icon={<HelpCircle className="h-4 w-4" />}>
                        FAQ
                    </NavLink>
                    <NavLink href="/docs/resources/changelog" icon={<Clock className="h-4 w-4" />}>
                        Changelog
                    </NavLink>
                    <NavLink href="/docs/resources/roadmap" icon={<Map className="h-4 w-4" />}>
                        Roadmap
                    </NavLink>
                </div>
            </div> */}
        </div>
    )
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    href: string
    exact?: boolean
    icon?: React.ReactNode
}

function NavLink({ children, href, exact = false, icon, className, ...props }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname?.startsWith(href)

    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-zinc-800/50",
                isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-2 border-blue-500 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white",
                className,
            )}
            {...props}
        >
            {icon && (
                <span
                    className={cn(
                        "transition-colors duration-200",
                        isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300",
                    )}
                >
                    {icon}
                </span>
            )}
            <span className="flex-1">{children}</span>
        </Link>
    )
}

interface NavGroupProps {
    title: string
    children: React.ReactNode
    icon?: React.ReactNode
    defaultOpen?: boolean
    badge?: string
}

function NavGroup({ title, children, icon, defaultOpen = false, badge }: NavGroupProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const pathname = usePathname()

    const childLinks = React.Children.toArray(children) as React.ReactElement<NavLinkProps>[]
    const isActive = childLinks.some((child) => pathname?.startsWith(child.props.href))

    React.useEffect(() => {
        if (isActive) {
            setIsOpen(true)
        }
    }, [isActive])

    return (
        <div className="space-y-1">
            <button
                className={cn(
                    "group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-zinc-800/50",
                    isActive || isOpen ? "text-white" : "text-zinc-400 hover:text-white",
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <span
                            className={cn(
                                "transition-colors duration-200",
                                isActive || isOpen ? "text-current" : "text-zinc-500 group-hover:text-zinc-300",
                            )}
                        >
                            {icon}
                        </span>
                    )}
                    <span>{title}</span>
                    {badge && (
                        <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            {badge}
                        </Badge>
                    )}
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
            </button>
            {isOpen && <div className="ml-6 space-y-1 border-l border-zinc-800 pl-4">{children}</div>}
        </div>
    )
}