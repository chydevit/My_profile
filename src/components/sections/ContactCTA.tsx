"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function ContactCTA() {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-purple relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                    >
                        <Mail className="w-12 h-12 text-white" />
                    </motion.div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                        {t('letsWorkTogether')}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        {t('contactDescription')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-13 px-8 text-lg bg-white text-primary-600 hover:bg-white/90 shadow-sm hover:shadow-md"
                        >
                            {t('getInTouch')}
                        </Link>
                        <a
                            href="https://t.me/chydevit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-13 px-8 text-lg border-2 border-white text-white hover:bg-white/10"
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
