"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Mail, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getProfile } from "@/lib/content";

const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    send: Send,
    mail: Mail,
};

export function Hero() {
    const profile = getProfile();
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    // Typing effect for roles
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % profile.roles.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [profile.roles.length]);

    const scrollToNext = () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-background to-accent-purple/10 dark:from-slate-950 dark:via-background dark:to-accent-purple/5">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
            </div>

            <Container className="relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-4"
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
                            <p className="text-lg text-muted-foreground mb-2">
                                Hello, I Am{" "}
                                <span className="inline-block bg-muted px-3 py-1 rounded-full font-medium text-foreground">
                                    Devit
                                </span>
                            </p>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold gradient-text leading-tight"
                        >
                            {profile.name}
                        </motion.h1>

                        {/* Animated Role */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 min-h-[40px]"
                        >
                            <motion.span
                                key={currentRoleIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                                {profile.roles[currentRoleIndex]}
                            </motion.span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-lg text-muted-foreground max-w-xl"
                        >
                            {profile.bio.split('.')[0]}.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="https://t.me/chydevit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-13 px-8 text-lg bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md"
                            >
                                Hire Me
                            </a>
                            <a
                                href={profile.cvUrl}
                                download
                                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-13 px-8 text-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950"
                            >
                                <Download className="w-5 h-5" />
                                View CV
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Decorative circle */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-purple rounded-full opacity-20 blur-2xl animate-pulse-slow" />

                            {/* Profile Image with Enhanced Actions */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 w-full h-full group cursor-pointer"
                                whileHover={{ scale: 1.02, rotate: 1 }}
                            >
                                {/* Glowing rotating border effect */}
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-purple to-primary-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{ backgroundSize: "200% 200%" }}
                                />

                                <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                                    <Image
                                        src={profile.image}
                                        alt={profile.name}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 500px"
                                    />

                                    {/* Glass sheen overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            </motion.div>

                            {/* Stats Cards */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                className="absolute bottom-10 left-0 glass p-4 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary-600 rounded-lg">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{profile.stats?.happyClients || "2k+"}</p>
                                        <p className="text-sm text-muted-foreground">Happy Clients</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 }}
                                className="absolute top-10 right-0 glass p-4 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent-purple rounded-lg">
                                        <span className="text-white text-xl">⭐</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{profile.stats?.experience || "3+"}</p>
                                        <p className="text-sm text-muted-foreground">Months Experience</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={scrollToNext}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary-600 transition-colors cursor-pointer"
                    aria-label="Scroll to next section"
                >
                    <span className="text-sm font-medium">Scroll Down</span>
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
