"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navigation } from "./Navigation";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "holo-panel border-b border-cyan-300/12 shadow-[0_10px_35px_rgba(2,6,23,0.34)]"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link
                        href="/"
                        className="max-w-[70%] text-xl font-heading font-bold gradient-text transition-opacity hover:opacity-80 sm:text-2xl"
                    >
                        Chy Devit
                    </Link>

                    <div className="hidden md:block">
                        <Navigation />
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "rounded-xl border p-2.5 transition-colors md:hidden",
                            isMobileMenuOpen
                                ? "border-cyan-300/20 bg-cyan-300/10"
                                : "border-transparent hover:border-cyan-300/15 hover:bg-cyan-300/8"
                        )}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <button
                        type="button"
                        aria-label="Close mobile menu"
                        className="absolute inset-x-0 top-16 h-[calc(100svh-4rem)] bg-slate-900/30 backdrop-blur-sm dark:bg-slate-950/55"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute inset-x-3 top-[4.5rem] max-h-[calc(100svh-5.25rem)] overflow-y-auto rounded-[1.75rem] border border-cyan-500/20 bg-white/95 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-cyan-300/16 dark:bg-slate-950/88 dark:shadow-[0_24px_60px_rgba(2,6,23,0.42)]">
                        <Navigation mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
            )}
        </header>
    );
}
