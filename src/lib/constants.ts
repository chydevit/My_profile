/**
 * Application-wide constants
 */

export const SITE_CONFIG = {
    name: "Chy Devit",
    title: "Chy Devit - Web Developer Portfolio",
    description: "Personal portfolio showcasing web development projects, skills, and professional experience. Specializing in modern web technologies including React, Next.js, and TypeScript.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    author: "Chy Devit",
    email: "Chydevit2023@gmail.com",
    phone: "+855 16517170",
    location: "Russei Keo, Phnom Penh, Cambodia",
} as const;

export const SOCIAL_LINKS = {
    github: "https://github.com/chydevit",
    linkedin: "https://www.linkedin.com/in/chy-devit-4971032b2/",
    telegram: "https://t.me/chydevit",
    twitter: "https://twitter.com/chydevit",
    email: "mailto:Chydevit2023@gmail.com",
} as const;

export const NAVIGATION_LINKS = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
] as const;

export const ASSET_PATHS = {
    images: "/images",
    cv: "/cv/chy-devit-cv.pdf",
    icons: "/icons",
} as const;

export const ANIMATION_DURATIONS = {
    fast: 200,
    normal: 300,
    slow: 500,
} as const;

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;
