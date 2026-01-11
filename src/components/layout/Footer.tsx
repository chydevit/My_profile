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
        <footer className="bg-muted border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                            Chy Devit
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            {t('footerDescription')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">{t('quickLinks')}</h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-600 transition-colors"
                                    >
                                        {t(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">{t('connect')}</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-background hover:bg-primary-600 hover:text-white transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Chy Devit. {t('allRightsReserved')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
