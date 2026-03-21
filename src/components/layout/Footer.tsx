"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const socialLinks = [
    { href: "https://github.com/chydevit", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/chydevit", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com/chydevit", icon: Twitter, label: "Twitter" },
    { href: "mailto:contact@chydevit.com", icon: Mail, label: "Email" },
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
        <footer className="holo-section border-t border-cyan-300/10 bg-slate-950/50">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="holo-panel holo-hover rounded-3xl px-5 py-8 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="mb-4 text-2xl font-heading font-bold gradient-text animate-galaxy-fly">
                                Chy Devit
                            </h3>
                            <p className="max-w-sm text-sm leading-6 text-slate-300">
                                {t("footerDescription")}
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 font-heading font-semibold text-white">{t("quickLinks")}</h4>
                            <ul className="space-y-2">
                                {footerLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="fly-hover inline-block text-sm text-slate-300 transition-colors hover:text-cyan-300"
                                        >
                                            {t(link.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-heading font-semibold text-white">{t("connect")}</h4>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fly-hover holo-hover rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-2 text-slate-300 transition-colors hover:bg-cyan-300/20 hover:text-cyan-100"
                                            aria-label={social.label}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-cyan-300/10 pt-8 text-center">
                        <p className="text-sm text-slate-400">
                            {"\u00A9"} {currentYear} Chy Devit. {t("allRightsReserved")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
