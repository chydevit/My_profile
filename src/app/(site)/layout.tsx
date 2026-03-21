import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import dynamic from "next/dynamic";

// Skip SSR entirely — canvas uses browser APIs and would cause hydration mismatch
const GalaxyBackground = dynamic(
    () => import("@/components/features/GalaxyBackground").then(m => m.GalaxyBackground),
    { ssr: false }
);

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col overflow-x-clip">
            <GalaxyBackground />
            <Header />
            <main className="min-w-0 flex-1 overflow-x-clip pt-16 md:pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
