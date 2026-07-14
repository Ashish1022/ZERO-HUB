import { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavbarDropdown } from "./navbar-dropdown";
import { resourceItems } from "@/constants";
import { User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    featuresDropdownRef: React.RefObject<HTMLDivElement | null>;
    featuresContainerRef: React.RefObject<HTMLDivElement | null>;
    featuresOverflow: boolean;
    resourcesDropdownRef: React.RefObject<HTMLDivElement | null>;
    resourcesContainerRef: React.RefObject<HTMLDivElement | null>;
    resourcesOverflow: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NavLink = memo<{
    href: string;
    children: React.ReactNode;
    onNavigate: () => void;
}>(({ href, children, onNavigate }) => (
    <Link
        href={href}
        className="w-full text-left p-3 font-medium flex items-center text-base hover:bg-zinc-800/50 transition-colors"
        onClick={onNavigate}
    >
        {children}
    </Link>
));

NavLink.displayName = "NavLink";

const AuthSection = memo<{ onClose: () => void; user?: User | null }>(({ onClose, user }) => {
    const authButtonProps = useMemo(() => ({
        loginHref: user ? '/logout' : '/login',
        loginText: user ? 'Logout' : 'Login',
        dashboardHref: user ? '/admin' : '/sign-up',
        dashboardText: user ? 'Dashboard' : 'Start Selling'
    }), [user]);
    return (
        <div className="pt-4 border-t border-zinc-800 space-y-4 px-4">
            <Button
                variant="outline"
                className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                asChild
            >
                <Link href={authButtonProps.loginHref} prefetch onClick={onClose}>
                    {authButtonProps.loginText}
                </Link>
            </Button>

            <Button
                className="w-full bg-zinc-100 text-black hover:bg-zinc-200"
                asChild
            >
                <Link href={authButtonProps.dashboardHref} prefetch onClick={onClose}>
                    {authButtonProps.dashboardText}
                </Link>
            </Button>
        </div>
    );
});

AuthSection.displayName = "AuthSection";

export const NavbarSidebar = memo<Props>(({
    items,
    onOpenChange,
    open,
    resourcesContainerRef,
    resourcesDropdownRef,
    resourcesOverflow
}) => {
    const pathname = usePathname();
    const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

    const trpc = useTRPC();
    const sessionQueryOptions = useMemo(() =>
        trpc.auth.session.queryOptions(),
        [trpc]
    );
    const session = useQuery(sessionQueryOptions);

    // const featuresDropdownProps = useMemo(() => ({
    //     title: "Features",
    //     subtitle: "Explore Features",
    //     active: pathname,
    //     containerRef: featuresContainerRef,
    //     dropdownRef: featuresDropdownRef,
    //     items: featureItems,
    //     overflow: featuresOverflow,
    //     mobile: true
    // }), [pathname, featuresContainerRef, featuresDropdownRef, featuresOverflow]);

    const resourcesDropdownProps = useMemo(() => ({
        title: "Resources",
        subtitle: "Explore Resources",
        active: pathname,
        containerRef: resourcesContainerRef,
        dropdownRef: resourcesDropdownRef,
        items: resourceItems,
        overflow: resourcesOverflow,
        mobile: true
    }), [pathname, resourcesContainerRef, resourcesDropdownRef, resourcesOverflow]);

    const navigationItems = useMemo(() =>
        items.map((item) => (
            <NavLink
                key={item.href}
                href={item.href}
                onNavigate={handleClose}
            >
                {item.children}
            </NavLink>
        )),
        [items, handleClose]
    );

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none border-zinc-800 w-full"
                aria-label="Navigation menu"
            >
                <SheetHeader className="p-4 border-b border-zinc-800">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-auto h-full pb-2">
                    {/* <NavbarDropdown {...featuresDropdownProps} /> */}
                    <NavbarDropdown {...resourcesDropdownProps} />
                    {navigationItems}
                    <AuthSection onClose={handleClose} user={session.data?.user} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
});

NavbarSidebar.displayName = "NavbarSidebar";