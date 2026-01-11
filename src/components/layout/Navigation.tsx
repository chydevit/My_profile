"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const navLinks = [
    { href: "/", key: "home" },
    { href: "/#about", key: "about" },
    { href: "/#skills", key: "skills" },
    { href: "/projects", key: "projects" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
];

interface NavigationProps {
    mobile?: boolean;
    onLinkClick?: () => void;
}

export function Navigation({ mobile = false, onLinkClick }: NavigationProps) {
    const pathname = usePathname();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
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
                        {link.key}
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
                        {t(link.key)}
                    </Link>
                ))}

                <div className="h-px bg-border my-2" />

                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary-600 transition-colors"
                    aria-label="Toggle theme"
                >
                    {resolvedTheme === "dark" ? (
                        <>
                            <Sun className="w-5 h-5" />
                            <span>{t('lightMode')}</span>
                        </>
                    ) : (
                        <>
                            <Moon className="w-5 h-5" />
                            <span>{t('darkMode')}</span>
                        </>
                    )}
                </button>

                <div className="flex items-center gap-4 mt-2">
                    <span className="text-lg font-medium text-foreground flex items-center gap-2">
                        <Languages className="w-5 h-5" />
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setLanguage("en")}
                            className={cn(
                                "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                                language === "en" ? "bg-primary-500 text-white" : "bg-muted text-muted-foreground"
                            )}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setLanguage("km")}
                            className={cn(
                                "px-3 py-1 rounded-md text-sm font-medium transition-colors font-sans",
                                language === "km" ? "bg-primary-500 text-white" : "bg-muted text-muted-foreground"
                            )}
                        >
                            ខ្មែរ
                        </button>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="flex items-center gap-6">
            <div className="flex items-center gap-6 mr-2">
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
                        {t(link.key)}
                    </Link>
                ))}
            </div>

            <div className="w-px h-6 bg-border mx-2" />

            {/* Language Switcher Desktop */}
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                        "text-xs font-medium transition-colors hover:text-primary-600",
                        language === "en" ? "text-primary-600 font-bold" : "text-muted-foreground"
                    )}
                >
                    EN
                </button>
                <span className="text-muted-foreground text-xs">/</span>
                <button
                    onClick={() => setLanguage("km")}
                    className={cn(
                        "text-xs font-medium transition-colors hover:text-primary-600 font-sans",
                        language === "km" ? "text-primary-600 font-bold" : "text-muted-foreground"
                    )}
                >
                    KH
                </button>
            </div>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors ml-2"
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
