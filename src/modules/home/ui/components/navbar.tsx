"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { NavbarDropdown } from "./navbar-dropdown"
import { usePathname } from "next/navigation"
import { NavbarSidebar } from "./navbar-sidebar"
import { useState, useCallback, memo, useRef, useLayoutEffect, useMemo, startTransition } from "react"

import { Button } from "@/components/ui/button"
import { resourceItems } from "@/constants"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { User } from "@/payload-types"

interface NavItem {
    href: string;
    children: string;
}

const navbarItems: NavItem[] = [
    { href: "/docs", children: "Documentation" },
    { href: "/about", children: "About" },
    { href: "/contact", children: "Contact" },
]

const NavLink = memo<{
    href: string;
    children: React.ReactNode;
    active?: boolean;
}>(({ href, children, active }) => (
    <Link
        href={href}
        className="group relative px-3 py-2 text-sm transition-colors hover:bg-zinc-800/30 rounded-md"
    >
        <span className={active ? "text-white" : "text-zinc-400 group-hover:text-white"}>
            {children}
        </span>
        {active && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-white rounded-full" />
        )}
    </Link>
))

NavLink.displayName = "NavLink"

const Logo = memo(() => (
    <Link
        href="/"
        className="group flex items-center text-xl font-bold tracking-tighter text-white hover:scale-105 transition-transform duration-200"
    >
        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700 group-hover:shadow-lg">
            <span className="text-sm font-bold">Z</span>
        </div>
        ZERO<span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">HUB</span>
    </Link>
))

Logo.displayName = "Logo"

const AuthButtons = memo(({ user }: { user?: User | null }) => (

    <div className="hidden md:flex items-center gap-3">
        <Button
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all duration-200"
            asChild
        >
            <Link href={user ? '/logout' : '/login'} prefetch>
                {user ? 'Logout' : 'Login'}
            </Link>
        </Button>

        <Button
            className="bg-zinc-100 text-black hover:bg-zinc-200 transition-all relative overflow-hidden group"
        >
            <Link href={user ? '/admin' : '/sign-up'} prefetch className="relative z-30">
                {user ? 'Dashboard' : 'Start Selling'}
            </Link>
            <span className="absolute inset-0 bg-zinc-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </Button>
    </div>
))

AuthButtons.displayName = "AuthButtons"

const MobileMenuButton = memo<{
    isSidebarOpen: boolean;
    onToggle: () => void;
}>(({ isSidebarOpen, onToggle }) => (
    <Button
        className="size-10 border-transparent md:hidden hover:bg-zinc-800/50 transition-colors"
        variant="ghost"
        onClick={onToggle}
        aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isSidebarOpen}
        aria-controls="mobile-navigation"
    >
        <MenuIcon className={`h-5 w-5 transition-transform duration-200 ${isSidebarOpen ? 'rotate-90' : ''}`} />
    </Button>
))

MobileMenuButton.displayName = "MobileMenuButton"

const useOverflowDetection = () => {
    const [featuresOverflow, setFeaturesOverflow] = useState(false)
    const [resourcesOverflow, setResourcesOverflow] = useState(false)

    const featuresDropdownRef = useRef<HTMLDivElement | null>(null)
    const resourcesDropdownRef = useRef<HTMLDivElement | null>(null)
    const featuresContainerRef = useRef<HTMLDivElement | null>(null)
    const resourcesContainerRef = useRef<HTMLDivElement | null>(null)

    const checkOverflow = useCallback(() => {
        const checkSingleOverflow = (
            dropdownRef: React.RefObject<HTMLDivElement | null>,
            containerRef: React.RefObject<HTMLDivElement | null>,
            setOverflow: (overflow: boolean) => void
        ) => {
            if (dropdownRef.current && containerRef.current) {
                const dropdownRect = dropdownRef.current.getBoundingClientRect()
                const maxHeight = window.innerHeight - dropdownRect.top - 20
                setOverflow(containerRef.current.scrollHeight > maxHeight)
            }
        }

        checkSingleOverflow(featuresDropdownRef, featuresContainerRef, setFeaturesOverflow)
        checkSingleOverflow(resourcesDropdownRef, resourcesContainerRef, setResourcesOverflow)
    }, [])

    useLayoutEffect(() => {
        checkOverflow()

        let timeoutId: NodeJS.Timeout | null = null

        const handleResize = () => {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(checkOverflow, 100)
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [checkOverflow])

    return {
        featuresOverflow,
        resourcesOverflow,
        featuresDropdownRef,
        resourcesDropdownRef,
        featuresContainerRef,
        resourcesContainerRef,
    }
}

export const Navbar = memo(() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathname = usePathname()

    const overflowData = useOverflowDetection()
    const handleSidebarToggle = useCallback(() => {
        startTransition(() => {
            setIsSidebarOpen(prev => !prev)
        })
    }, [])

    const activeRoutes = useMemo(() => ({
        home: pathname === '/',
        docs: pathname === '/docs',
        about: pathname === '/about',
        contact: pathname === '/contact'
    }), [pathname])

    const sidebarProps = useMemo(() => ({
        onOpenChange: setIsSidebarOpen,
        open: isSidebarOpen,
        items: navbarItems,
        ...overflowData
    }), [isSidebarOpen, overflowData])

    const trpc = useTRPC();
    const sessionQueryOptions = useMemo(() =>
        trpc.auth.session.queryOptions(),
        [trpc]
    )
    const session = useQuery(sessionQueryOptions)

    return (
        <header className="h-16 border-b border-zinc-800/50 w-full bg-zinc-950/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto flex justify-between font-medium items-center h-full px-4 lg:px-6">
                <NavbarSidebar {...sidebarProps} />

                <Logo />

                <nav className="md:flex items-center gap-2 hidden">
                    <NavLink
                        href="/"
                        active={activeRoutes.home}
                    >
                        Home
                    </NavLink>
                    <NavbarDropdown
                        title="Resources"
                        subtitle="Explore Resources"
                        active={pathname}
                        containerRef={overflowData.resourcesContainerRef}
                        dropdownRef={overflowData.resourcesDropdownRef}
                        items={resourceItems}
                        overflow={overflowData.resourcesOverflow}
                    />
                    {navbarItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            active={pathname === item.href}
                        >
                            {item.children}
                        </NavLink>
                    ))}
                </nav>

                <AuthButtons user={session.data?.user} />

                <MobileMenuButton
                    isSidebarOpen={isSidebarOpen}
                    onToggle={handleSidebarToggle}
                />
            </div>
        </header>
    )
})

Navbar.displayName = "Navbar"