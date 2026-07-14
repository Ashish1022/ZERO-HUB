import Link from "next/link";
import { memo, useMemo } from "react";

import { CONTACT_INFO, FOOTER_SECTIONS, LEGAL_LINKS, SOCIAL_LINKS } from "@/constants";


const FooterLink = memo<{
    href: string;
    children: React.ReactNode;
    className?: string;
}>(({ href, children, className = "" }) => (
    <Link
        href={href}
        className={`group relative inline-block text-sm text-zinc-400 transition-colors hover:text-white ${className}`}
    >
        <span className="relative z-10">{children}</span>
        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
));

FooterLink.displayName = "FooterLink";

const FooterContactLink = memo<{
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}>(({ href, icon: Icon, children }) => (
    <Link
        href={href}
        className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
    >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition-colors group-hover:bg-zinc-800 group-hover:text-white">
            <Icon className="h-4 w-4" />
        </span>
        <span>{children}</span>
    </Link>
));

FooterContactLink.displayName = "FooterContactLink";

const SocialLink = memo<{
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}>(({ href, icon: Icon, label }) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        aria-label={label}
    >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-500 transition-all duration-300 hover:bg-zinc-800 hover:text-white hover:scale-110">
            <Icon className="h-5 w-5" />
        </div>
    </Link>
));

SocialLink.displayName = "SocialLink";

const Logo = memo(() => (
    <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 before:absolute before:inset-0 before:-z-10 before:animate-pulse before:rounded-full before:bg-zinc-800 before:opacity-50 before:blur-xl">
        <span className="text-2xl font-bold">Z</span>
    </div>
));

Logo.displayName = "Logo";

const FooterHeader = memo(() => (
    <div className="mb-16 flex flex-col items-center text-center">
        <Logo />
        <h2 className="mb-4 text-2xl font-bold tracking-tighter text-white">
            ZERO<span className="text-zinc-500">HUB</span>
        </h2>
        <p className="mx-auto max-w-md text-zinc-400">
            Powerful tools for modern businesses. Simplify your workflow and boost productivity with our innovative ZERO | HUB platform.
        </p>
    </div>
));

FooterHeader.displayName = "FooterHeader";

const FooterSection = memo<{
    title: string;
    links: ReadonlyArray<{ href: string; label: string }>;
}>(({ title, links }) => (
    <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            {title}
        </h4>
        <ul className="space-y-3">
            {links.map(({ href, label }) => (
                <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                </li>
            ))}
        </ul>
    </div>
));

FooterSection.displayName = "FooterSection";

const ContactSection = memo(() => (
    <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Connect
        </h4>
        <ul className="space-y-3">
            {CONTACT_INFO.map(({ icon, href, label }) => (
                <li key={href}>
                    <FooterContactLink href={href} icon={icon}>
                        {label}
                    </FooterContactLink>
                </li>
            ))}
            <li className="pt-2">
                <div className="flex space-x-4">
                    {SOCIAL_LINKS.map(({ href, icon, label }) => (
                        <SocialLink key={href} href={href} icon={icon} label={label} />
                    ))}
                </div>
            </li>
        </ul>
    </div>
));

ContactSection.displayName = "ContactSection";

const FooterBottom = memo<{ currentYear: number }>(({ currentYear }) => (
    <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-zinc-800 pt-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-zinc-900">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">Z</span>
                </div>
            </div>
            <p className="text-sm text-zinc-500">
                &copy; {currentYear} ZERO | HUB, Inc. All rights reserved.
            </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            {LEGAL_LINKS.map(({ href, label }) => (
                <FooterLink key={href} href={href}>
                    {label}
                </FooterLink>
            ))}
        </div>
    </div>
));

FooterBottom.displayName = "FooterBottom";

const BackgroundPattern = memo(() => (
    <div className="absolute inset-0 opacity-5">
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)",
                backgroundSize: "50px 50px",
            }}
        />
    </div>
));

BackgroundPattern.displayName = "BackgroundPattern";

export const Footer = memo(() => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className="relative w-full border-t border-zinc-800 bg-black py-16 overflow-hidden">
            <BackgroundPattern />

            <div className="max-w-7xl relative z-10 mx-auto px-4 md:px-6">
                <FooterHeader />

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {FOOTER_SECTIONS.map((section) => (
                        <FooterSection
                            key={section.title}
                            title={section.title}
                            links={section.links}
                        />
                    ))}
                    <ContactSection />
                </div>

                <FooterBottom currentYear={currentYear} />
            </div>
        </footer>
    );
});

Footer.displayName = "Footer";