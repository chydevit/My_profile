"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navigation } from "./Navigation";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    {/* Logo/Brand */}
                    <Link
                        href="/"
                        className="text-2xl font-heading font-bold gradient-text hover:opacity-80 transition-opacity"
                    >
                        Chy Devit
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <Navigation />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg border border-transparent hover:border-cyan-300/15 hover:bg-cyan-300/8 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden holo-panel border-t border-cyan-300/12">
                    <div className="container mx-auto px-4 py-4">
                        <Navigation mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
            )}
        </header>
    );
}
