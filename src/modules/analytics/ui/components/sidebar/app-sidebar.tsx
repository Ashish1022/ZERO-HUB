"use client"

import * as React from "react"
import {
    BarChart3,
    PackageSearch,
    Users,
    Wallet,
    Boxes,
    CreditCard,
    ClipboardListIcon,
    DatabaseIcon,
    FileIcon,
    HelpCircleIcon,
    SearchIcon,
    SettingsIcon,
    LayoutDashboardIcon,
    ArrowUpCircleIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"
import { NavAnalytics } from "./nav-analytics"
import { NavMain } from "./nav-main"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboardIcon,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircleIcon,
        },
        {
            title: "Search",
            url: "#",
            icon: SearchIcon,
        },
    ],
    analytics: [
        {
            name: "Sales Analytics",
            url: "/dashboard/sales",
            icon: BarChart3,
        },
        {
            name: "Orders Analytics",
            url: "#",
            icon: PackageSearch,
        },
        {
            name: "Revenue Analytics",
            url: "#",
            icon: Wallet,
        },
        {
            name: "Inventory Analytics",
            url: "#",
            icon: Boxes,
        },
        {
            name: "Payment Analytics",
            url: "#",
            icon: CreditCard,
        },
        {
            name: "Customers Analytics",
            url: "#",
            icon: Users,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: DatabaseIcon,
        },
        {
            name: "Reports",
            url: "#",
            icon: ClipboardListIcon,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: FileIcon,
        },
    ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    storeName: string
}

export function AppSidebar({ storeName, ...props }: AppSidebarProps) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <div>
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">{storeName}</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="hide-scrollbar">
                <NavMain items={data.navMain} />
                <NavAnalytics items={data.analytics} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
        </Sidebar>
    )
}