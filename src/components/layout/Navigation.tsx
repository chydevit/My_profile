"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

interface NavigationProps {
    mobile?: boolean;
    onLinkClick?: () => void;
}

export function Navigation({ mobile = false, onLinkClick }: NavigationProps) {
    const pathname = usePathname();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleLinkClick = (href: string) => {
        // Handle smooth scroll for anchor links
        if (href.startsWith("/#")) {
            const element = document.querySelector(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
        onLinkClick?.();
    };

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <nav className={mobile ? "flex flex-col space-y-4" : "flex items-center gap-8"}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            mobile ? "text-lg font-medium" : "text-sm font-medium",
                            pathname === link.href ? "text-primary-600" : "text-foreground"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        );
    }

    if (mobile) {
        return (
            <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={cn(
                            "text-lg font-medium transition-colors hover:text-primary-600",
                            pathname === link.href
                                ? "text-primary-600"
                                : "text-foreground"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary-600 transition-colors"
                    aria-label="Toggle theme"
                >
                    {resolvedTheme === "dark" ? (
                        <>
                            <Sun className="w-5 h-5" />
                            <span>Light Mode</span>
                        </>
                    ) : (
                        <>
                            <Moon className="w-5 h-5" />
                            <span>Dark Mode</span>
                        </>
                    )}
                </button>
            </nav>
        );
    }

    return (
        <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary-600 relative",
                        pathname === link.href
                            ? "text-primary-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-600"
                            : "text-foreground"
                    )}
                >
                    {link.label}
                </Link>
            ))}
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle theme"
            >
                {resolvedTheme === "dark" ? (
                    <Sun className="w-5 h-5" />
                ) : (
                    <Moon className="w-5 h-5" />
                )}
            </button>
        </nav>
    );
}
