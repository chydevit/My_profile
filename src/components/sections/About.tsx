"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
        <section id="about" className="holo-section overflow-hidden bg-muted/20 py-16 sm:py-20">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="mx-auto max-w-5xl"
                >
                    <motion.div variants={itemVariants} className="grid items-start gap-8 rounded-[2rem] border border-cyan-300/12 bg-background/45 p-5 shadow-[0_18px_60px_rgba(2,6,23,0.12)] backdrop-blur-sm sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
                        <div className="flex justify-center lg:justify-start">
                            <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(14,165,233,0.22)] dark:border-white/80 dark:shadow-[0_0_30px_rgba(103,232,249,0.22)] sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                                <Image
                                    src={profile.image}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 160px, 192px"
                                />
                            </div>
                        </div>

                        <div className="space-y-5 text-center lg:text-left">
                            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                                <h2 className="text-3xl font-heading font-bold md:text-5xl">{t("hello")}</h2>
                                <span className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">scan</span>
                            </div>
                            <div className="mx-auto h-1.5 w-20 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 lg:mx-0" />

                            <h3 className="text-center text-xl font-heading font-semibold text-foreground md:text-3xl lg:text-left">
                                {t("aboutTitle").replace("{name}", profile.name)}
                            </h3>

                            <p className="text-center leading-7 text-muted-foreground lg:text-left">
                                {profile.bio}
                            </p>

                            <div className="grid gap-4 py-2 sm:grid-cols-2">
                                <div className="holo-panel flex items-start gap-3 rounded-2xl p-4">
                                    <div className="holo-chip rounded-lg p-2">
                                        <Mail className="h-5 w-5 text-cyan-700 dark:text-cyan-200" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-muted-foreground">{t("email")}</p>
                                        <p className="break-all text-sm font-semibold">{profile.email}</p>
                                    </div>
                                </div>

                                <div className="holo-panel flex items-start gap-3 rounded-2xl p-4">
                                    <div className="holo-chip rounded-lg p-2">
                                        <Phone className="h-5 w-5 text-cyan-700 dark:text-cyan-200" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-muted-foreground">{t("phone")}</p>
                                        <p className="break-words text-sm font-semibold">{profile.phone}</p>
                                    </div>
                                </div>

                                <div className="holo-panel flex items-start gap-3 rounded-2xl p-4 sm:col-span-2">
                                    <div className="holo-chip rounded-lg p-2">
                                        <MapPin className="h-5 w-5 text-cyan-700 dark:text-cyan-200" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-muted-foreground">{t("address")}</p>
                                        <p className="break-words text-sm font-semibold">{profile.location}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
