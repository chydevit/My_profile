import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Analytics } from "@vercel/analytics/react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://chydevit.dev"),
  title: "Chy Devit — Software & Web Developer",
  description: "Portfolio of Chy Devit, a software and web developer in Phnom Penh building fast, modern interfaces with React, Next.js, and TypeScript.",
  keywords: ["web developer", "portfolio", "React", "Next.js", "TypeScript", "full-stack developer", "Phnom Penh", "Cambodia"],
  authors: [{ name: "Chy Devit" }],
  openGraph: {
    title: "Chy Devit — Software & Web Developer",
    description: "Portfolio of Chy Devit, building fast, modern interfaces with React, Next.js, and TypeScript.",
    type: "website",
    images: [{ url: "/angkor-wat-bg-new.png", width: 1200, height: 630, alt: "Chy Devit — Software & Web Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chy Devit — Software & Web Developer",
    description: "Portfolio of Chy Devit, building fast, modern interfaces with React, Next.js, and TypeScript.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Moulpali&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
