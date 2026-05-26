"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const SCROLL_THRESHOLD = 360;

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > SCROLL_THRESHOLD);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/24 bg-slate-950/82 text-cyan-50 shadow-[0_16px_40px_rgba(2,6,23,0.38)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-400/90 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 dark:border-cyan-300/22 dark:bg-slate-900/84 sm:bottom-7 sm:right-7"
                    aria-label={t("scrollUp")}
                    title={t("scrollUp")}
                >
                    <ChevronUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
