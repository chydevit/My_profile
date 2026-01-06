import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import ContactForm from '@/components/features/ContactForm';
import SocialLinks from '@/components/features/SocialLinks';
import { getProfile } from '@/lib/content';

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
    const profile = getProfile();

    return (
        <main className="min-h-screen pt-24 pb-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Get In <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or just want to chat? I'd love to hear from you.
                        Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                {/* Email */}
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                                    </div>
                                </a>

                                {/* Phone */}
                                <a
                                    href={`tel:${profile.phone}`}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{profile.phone}</p>
                                    </div>
                                </a>

                                {/* Location */}
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{profile.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                            <SocialLinks
                                links={profile.socialLinks}
                                variant="colorful"
                                size="lg"
                                showLabels
                                className="flex-col items-start"
                            />
                        </div>

                        {/* Additional Info */}
                        <div className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-800">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Response Time
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                I typically respond within 24-48 hours during business days.
                                For urgent matters, feel free to reach out via phone or social media.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
                            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
