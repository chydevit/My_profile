"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { getProfile } from "@/lib/content";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function About() {
    const profile = getProfile();
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="about" className="py-20 bg-muted/30">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Image Section */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Decorative background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-2xl rotate-6 opacity-30 blur-2xl animate-pulse-slow" />

                            {/* Image container */}
                            <Card variant="premium" className="relative overflow-hidden p-0 border-none shadow-2xl">
                                <Image
                                    src={profile.image}
                                    alt={profile.name}
                                    width={500}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </Card>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* Section Title */}
                        <div className="space-y-4 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <h2 className="text-3xl md:text-5xl font-heading font-bold">{t('hello')}</h2>
                                <span className="text-4xl animate-bounce">👋</span>
                            </div>
                            <div className="h-1.5 w-20 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full mx-auto lg:mx-0" />
                        </div>

                        {/* Main Heading */}
                        <h3 className="text-xl md:text-3xl font-heading font-semibold text-foreground text-center lg:text-left">
                            {t('aboutTitle').replace('{name}', profile.name)}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed text-center lg:text-left">
                            {profile.bio}
                        </p>

                        {/* Info Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 py-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{t('email')}</p>
                                    <p className="text-sm font-semibold">{profile.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{t('phone')}</p>
                                    <p className="text-sm font-semibold">{profile.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 sm:col-span-2">
                                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                                    <MapPin className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{t('address')}</p>
                                    <p className="text-sm font-semibold">{profile.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center lg:justify-start">
                            <a
                                href={profile.cvUrl}
                                download
                                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-12 md:h-13 px-8 text-base md:text-lg bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md"
                            >
                                <Download className="w-5 h-5" />
                                {t('downloadCV')}
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
