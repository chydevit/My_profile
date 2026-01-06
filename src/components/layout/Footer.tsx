import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
    { href: "https://github.com/chydevit", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/chydevit", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com/chydevit", icon: Twitter, label: "Twitter" },
    { href: "mailto:contact@chydevit.com", icon: Mail, label: "Email" },
];

const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

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
                            Web Developer passionate about creating beautiful, functional, and user-friendly websites.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-600 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="font-heading font-semibold mb-4">Connect</h4>
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
                        © {currentYear} Chy Devit. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
