"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Mail, Download, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TechStack } from "@/components/features/TechStack";
import { getProfile } from "@/lib/content";
import { useLanguage } from "@/components/providers/LanguageProvider";

const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    send: Send,
    mail: Mail,
};

export function Hero() {
    const profile = getProfile();
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const { t } = useLanguage();

    const roleKeys = [
        "role_software",
        "role_mobile",
        "role_web",
        "role_vibe"
    ];

    // Typing effect for roles
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roleKeys.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [roleKeys.length]);

    const scrollToNext = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-background md:min-h-[calc(100svh-5rem)]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/angkor-wat-bg-new.png"
                    alt="Hero Background"
                    fill
                    className="object-cover object-center opacity-100 dark:opacity-80"
                    priority
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-[10%] top-[18%] h-56 w-56 rounded-full bg-primary-400/10 blur-3xl animate-pulse-slow sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
                <div className="absolute bottom-[12%] right-[8%] h-56 w-56 rounded-full bg-primary-400/10 blur-3xl animate-pulse-slow sm:h-72 sm:w-72 lg:h-96 lg:w-96" style={{ animationDelay: "1s" }} />
            </div>

            <Container className="relative z-10 py-8 sm:py-10 md:py-16 lg:py-20">
                <div className="grid items-center gap-10 text-center lg:grid-cols-2 lg:gap-12 lg:text-left">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start"
                        >
                            {profile.socialLinks.map((social, index) => {
                                const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                                return (
                                    <motion.a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 hover:scale-110"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </motion.div>

                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="mb-2 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground sm:text-base md:text-lg lg:justify-start">
                                {t('helloIam')}
                                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs md:text-sm font-semibold bg-primary-500/10 text-primary-600 border border-primary-500/20 backdrop-blur-md">
                                    Devit
                                </span>
                            </p>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold gradient-text glow-text leading-tight"
                        >
                            {profile.name}
                        </motion.h1>

                        {/* Animated Role */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="min-h-[3.5rem] text-xl font-semibold text-primary-600 dark:text-primary-400 sm:min-h-[3rem] sm:text-2xl md:text-3xl"
                        >
                            <motion.span
                                key={currentRoleIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                                {t(roleKeys[currentRoleIndex])}
                            </motion.span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg lg:mx-0"
                        >
                            {t('heroDescription')}.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start"
                        >
                            <a
                                href="https://t.me/chydevit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md active:bg-primary-800 sm:h-13 sm:w-auto sm:px-8 sm:text-lg"
                            >
                                {t('hireMe')}
                            </a>
                            <a
                                href={profile.cvUrl}
                                download
                                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-600 px-6 text-base font-medium text-primary-600 transition-all duration-200 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950 sm:h-13 sm:w-auto sm:px-8 sm:text-lg"
                            >
                                <Download className="w-5 h-5" />
                                {t('viewCV')}
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative min-w-0"
                    >
                        <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <div className="relative h-full min-h-[260px] w-full sm:min-h-[340px] md:min-h-[400px]">
                                <TechStack />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={scrollToNext}
                    className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary-600 sm:flex md:bottom-10"
                    aria-label="Scroll to next section"
                >
                    <span className="text-sm font-medium">{t('scrollDown')}</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown className="w-6 h-6" />
                    </motion.div>
                </motion.button>
            </Container>
        </section>
    );
}
