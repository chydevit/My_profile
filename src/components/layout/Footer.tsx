"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const socialLinks = [
    { href: "https://github.com/chydevit", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/chydevit", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com/chydevit", icon: Twitter, label: "Twitter" },
    { href: "mailto:chydevit.dev@gmail.com", icon: Mail, label: "Email" },
];

const footerLinks = [
    { href: "/", key: "home" },
    { href: "/projects", key: "projects" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="relative border-t border-cyan-300/20 bg-white/72 dark:border-cyan-300/10 dark:bg-slate-950/60">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-cyan-300/18 bg-white/88 px-5 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-cyan-300/12 dark:bg-slate-950/72 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
                        <div className="mx-auto md:mx-0">
                            <h3 className="mb-4 text-2xl font-heading font-bold gradient-text animate-galaxy-fly">
                                Chy Devit
                            </h3>
                            <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {t("footerDescription")}
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 font-heading font-semibold text-slate-900 dark:text-white">{t("quickLinks")}</h4>
                            <ul className="space-y-2">
                                {footerLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="fly-hover inline-block text-sm text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
                                        >
                                            {t(link.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-heading font-semibold text-slate-900 dark:text-white">{t("connect")}</h4>
                            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    const isExternalUrl = /^https?:\/\//i.test(social.href);
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target={isExternalUrl ? "_blank" : undefined}
                                            rel={isExternalUrl ? "noopener noreferrer" : undefined}
                                            className="fly-hover holo-hover rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2 text-slate-700 transition-colors hover:bg-cyan-500/20 hover:text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-slate-300 dark:hover:bg-cyan-300/20 dark:hover:text-cyan-100"
                                            aria-label={social.label}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-cyan-300/20 pt-8 text-center dark:border-cyan-300/10">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {"\u00A9"} {currentYear} Chy Devit. {t("allRightsReserved")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
