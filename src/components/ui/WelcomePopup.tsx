"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        // Check if we've already shown the popup in this session
        const hasShownParams = sessionStorage.getItem("welcomePopupShown");

        if (!hasShownParams) {
            // Small delay to ensure smooth entrance after initial load
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        // Set initial time
        setCurrentTime(new Date());

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem("welcomePopupShown", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md overflow-hidden border rounded-2xl bg-card/90 backdrop-blur-xl border-white/20 shadow-2xl"
                    >
                        {/* Decorative background gradients */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-purple to-accent-pink" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />

                        {/* Language Switcher */}
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <button
                                onClick={() => setLanguage("en")}
                                className={`px-2 py-1 text-xs rounded-md transition-colors ${language === "en"
                                        ? "bg-primary-500 text-white"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLanguage("km")}
                                className={`px-2 py-1 text-xs rounded-md transition-colors font-sans ${language === "km"
                                        ? "bg-primary-500 text-white"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                            >
                                ខ្មែរ
                            </button>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-muted/50 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8 text-center space-y-6">
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 mb-2">
                                <Sparkles className="w-8 h-8 text-primary-500 animate-pulse" />
                            </div>

                            {/* Text */}
                            <div className="space-y-2">
                                {currentTime && (
                                    <p className="text-sm font-mono font-medium text-primary-500 mb-2 tracking-wider">
                                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </p>
                                )}
                                <h2 className="text-3xl font-heading font-bold gradient-text">
                                    {t('welcome')}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('welcomeMessage')}
                                </p>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleClose}
                                className="w-full py-3 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-primary-600 to-accent-purple hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
                            >
                                {t('explore')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
