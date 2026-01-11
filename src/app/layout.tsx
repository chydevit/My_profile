import type { Metadata } from "next";
import { Inter, Outfit, Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { WelcomePopup } from "@/components/ui/WelcomePopup";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const kantumruy = Kantumruy_Pro({
  variable: "--font-kantumruy",
  subsets: ["khmer", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chy Devit - Web Developer Portfolio",
  description: "Personal portfolio showcasing web development projects, skills, and professional experience. Specializing in modern web technologies including React, Next.js, and TypeScript.",
  keywords: ["web developer", "portfolio", "React", "Next.js", "TypeScript", "full-stack developer"],
  authors: [{ name: "Chy Devit" }],
  openGraph: {
    title: "Chy Devit - Web Developer Portfolio",
    description: "Personal portfolio showcasing web development projects and skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${kantumruy.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <WelcomePopup />
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
