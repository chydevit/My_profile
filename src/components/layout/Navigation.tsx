"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
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
    const { setTheme, resolvedTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleLinkClick = (href: string) => {
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

    if (!mounted) {
        return (
            <nav className={mobile ? "flex flex-col space-y-4" : "flex items-center gap-4 lg:gap-6"}>
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
            <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={cn(
                            "rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-cyan-300/6 hover:text-primary-600 sm:text-lg",
                            pathname === link.href
                                ? "bg-cyan-300/8 text-primary-600"
                                : "text-foreground"
                        )}
                    >
                        {t(link.key)}
                    </Link>
                ))}

                <div className="my-3 h-px bg-slate-300/40 dark:bg-white/8" />

                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-cyan-300/6 hover:text-primary-600 sm:text-lg"
                    aria-label="Toggle theme"
                >
                    {resolvedTheme === "dark" ? (
                        <>
                            <Sun className="h-5 w-5" />
                            <span>{t("lightMode")}</span>
                        </>
                    ) : (
                        <>
                            <Moon className="h-5 w-5" />
                            <span>{t("darkMode")}</span>
                        </>
                    )}
                </button>

                <div className="mt-3 rounded-2xl border border-slate-300/40 bg-slate-100/60 px-4 py-3 dark:border-white/8 dark:bg-white/3">
                    <span className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        <Languages className="h-5 w-5" />
                        Language
                    </span>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setLanguage("en")}
                            className={cn(
                                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                                language === "en" ? "bg-primary-500 text-white" : "bg-muted text-muted-foreground"
                            )}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setLanguage("km")}
                            className={cn(
                                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors font-sans",
                                language === "km" ? "bg-primary-500 text-white" : "bg-muted text-muted-foreground"
                            )}
                        >
                            Khmer
                        </button>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="flex items-center gap-3 lg:gap-6">
            <div className="flex items-center gap-4 lg:mr-2 lg:gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={cn(
                            "relative text-sm font-medium transition-colors hover:text-primary-600",
                            pathname === link.href
                                ? "text-primary-600 after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary-600"
                                : "text-foreground"
                        )}
                    >
                        {t(link.key)}
                    </Link>
                ))}
            </div>

            <div className="mx-1 hidden h-6 w-px bg-border lg:block" />

            <div className="hidden items-center gap-1 lg:flex">
                <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                        "text-xs font-medium transition-colors hover:text-primary-600",
                        language === "en" ? "font-bold text-primary-600" : "text-muted-foreground"
                    )}
                >
                    EN
                </button>
                <span className="text-xs text-muted-foreground">/</span>
                <button
                    onClick={() => setLanguage("km")}
                    className={cn(
                        "font-sans text-xs font-medium transition-colors hover:text-primary-600",
                        language === "km" ? "font-bold text-primary-600" : "text-muted-foreground"
                    )}
                >
                    KH
                </button>
            </div>

            <button
                onClick={toggleTheme}
                className="ml-1 rounded-lg p-2 transition-colors hover:bg-muted lg:ml-2"
                aria-label="Toggle theme"
            >
                {resolvedTheme === "dark" ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </button>
        </nav>
    );
}
