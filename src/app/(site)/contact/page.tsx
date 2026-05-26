import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
    title: 'Contact Me | Chy Devit',
    description: 'Get in touch with me for collaborations, projects, or just to say hello. I\'m always open to discussing new opportunities.',
    openGraph: {
        title: 'Contact Me | Chy Devit',
        description: 'Get in touch with me for collaborations, projects, or just to say hello.',
        type: 'website',
    },
};

export default function ContactPage() {
    return <ContactSection />;
}
