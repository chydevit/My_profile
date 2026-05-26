import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Analytics } from "@vercel/analytics/react";

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
