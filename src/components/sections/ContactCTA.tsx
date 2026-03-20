"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function ContactCTA() {
    const { t } = useLanguage();

    return (
        <section className="holo-section relative overflow-hidden py-20 bg-[linear-gradient(135deg,rgba(6,182,212,0.18),rgba(15,23,42,0.94)_38%,rgba(30,41,59,0.94))]">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-80">
                <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-cyan-300/18 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-400/16 blur-3xl" />
                <div className="absolute inset-0 [background-image:linear-gradient(rgba(56,189,248,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.09)_1px,transparent_1px)] [background-size:68px_68px]" />
            </div>

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="holo-panel mx-auto max-w-3xl rounded-[2rem] px-8 py-12 text-center"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/12 p-4 backdrop-blur-sm shadow-[0_0_40px_rgba(34,211,238,0.18)]"
                    >
                        <Mail className="w-12 h-12 text-cyan-100" />
                    </motion.div>

                    {/* Heading */}
                    <h2 className="mb-4 text-4xl font-heading font-bold text-white md:text-5xl">
                        {t('letsWorkTogether')}
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200/90">
                        {t('contactDescription')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex h-13 items-center justify-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/90 px-8 text-lg font-medium text-slate-950 transition-all duration-200 hover:bg-cyan-200"
                        >
                            {t('getInTouch')}
                        </Link>
                        <a
                            href="https://t.me/chydevit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-13 items-center justify-center gap-2 rounded-lg border border-cyan-300/24 bg-white/4 px-8 text-lg font-medium text-cyan-50 transition-all duration-200 hover:bg-cyan-300/10"
                        >
                            <Send className="w-5 h-5" />
                            {t('messageTelegram')}
                        </a>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
