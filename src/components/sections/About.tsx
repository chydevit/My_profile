"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Mail, Phone, MapPin } from "lucide-react";
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
        <section id="about" className="holo-section overflow-hidden bg-muted/20 py-20">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid items-center gap-12 lg:grid-cols-2"
                >
                    <motion.div variants={itemVariants} className="relative">
                        <div className="relative mx-auto w-full max-w-md">
                            <div className="absolute inset-0 rotate-6 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 opacity-25 blur-2xl animate-pulse-slow" />
                            <div className="absolute -inset-6 rounded-[2rem] border border-cyan-300/10" />

                            <Card variant="premium" className="relative overflow-hidden border-none p-0 shadow-none">
                                <Image
                                    src={profile.image}
                                    alt={profile.name}
                                    width={500}
                                    height={600}
                                    className="h-auto w-full object-cover"
                                />
                            </Card>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="space-y-4 text-center lg:text-left">
                            <div className="flex items-center justify-center gap-2 lg:justify-start">
                                <h2 className="text-3xl font-heading font-bold md:text-5xl">{t("hello")}</h2>
                                <span className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">scan</span>
                            </div>
                            <div className="mx-auto h-1.5 w-20 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 lg:mx-0" />
                        </div>

                        <h3 className="text-center text-xl font-heading font-semibold text-foreground lg:text-left md:text-3xl">
                            {t("aboutTitle").replace("{name}", profile.name)}
                        </h3>

                        <p className="text-center leading-relaxed text-muted-foreground lg:text-left">
                            {profile.bio}
                        </p>

                        <div className="grid gap-4 py-4 sm:grid-cols-2">
                            <div className="holo-panel flex items-start gap-3 rounded-2xl p-4">
                                <div className="holo-chip rounded-lg p-2">
                                    <Mail className="h-5 w-5 text-cyan-200" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{t("email")}</p>
                                    <p className="break-all text-sm font-semibold">{profile.email}</p>
                                </div>
                            </div>

                            <div className="holo-panel flex items-start gap-3 rounded-2xl p-4">
                                <div className="holo-chip rounded-lg p-2">
                                    <Phone className="h-5 w-5 text-cyan-200" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{t("phone")}</p>
                                    <p className="break-words text-sm font-semibold">{profile.phone}</p>
                                </div>
                            </div>

                            <div className="holo-panel flex items-start gap-3 rounded-2xl p-4 sm:col-span-2">
                                <div className="holo-chip rounded-lg p-2">
                                    <MapPin className="h-5 w-5 text-cyan-200" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{t("address")}</p>
                                    <p className="break-words text-sm font-semibold">{profile.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-start">
                            <a
                                href={profile.cvUrl}
                                download
                                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-cyan-300/24 bg-cyan-400/12 px-6 text-base font-medium text-cyan-50 transition-all duration-200 hover:bg-cyan-400/20 sm:w-auto sm:px-8 md:h-13 md:text-lg"
                            >
                                <Download className="h-5 w-5" />
                                {t("downloadCV")}
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
