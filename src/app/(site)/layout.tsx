import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalaxyBackgroundLoader } from "@/components/features/GalaxyBackgroundLoader";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col overflow-x-clip">
            <GalaxyBackgroundLoader />
            <Header />
            <main className="min-w-0 flex-1 overflow-x-clip pt-16 md:pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
