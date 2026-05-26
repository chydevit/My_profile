'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import ContactForm from '@/components/features/ContactForm';
import SocialLinks from '@/components/features/SocialLinks';
import { getProfile } from '@/lib/content';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function ContactSection() {
    const profile = getProfile();
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pt-24 pb-16 sm:pb-20">
            <Container className="max-w-6xl">
                <div className="mb-14 text-center sm:mb-16">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                        {t('getInTouchTitleStart')}{' '}
                        <span className="gradient-text">{t('getInTouchTitleHighlight')}</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
                        {t('getInTouchDescription')}
                    </p>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(380px,1fr)] xl:items-start xl:gap-10">
                    <div className="space-y-6">
                        <section className="holo-panel rounded-[1.75rem] p-5 sm:p-7">
                            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{t('contactInformation')}</h2>
                            <div className="space-y-4">
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="group flex items-start gap-4 rounded-2xl border border-cyan-300/18 bg-white/72 p-4 transition-all duration-300 hover:border-primary-500 hover:shadow-lg dark:border-cyan-300/12 dark:bg-slate-900/62 dark:hover:border-primary-500"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-transform group-hover:scale-110 dark:bg-primary-900/30 dark:text-primary-400">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">{t('email')}</h3>
                                        <p className="text-slate-600 dark:text-slate-300">{profile.email}</p>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${profile.phone}`}
                                    className="group flex items-start gap-4 rounded-2xl border border-cyan-300/18 bg-white/72 p-4 transition-all duration-300 hover:border-primary-500 hover:shadow-lg dark:border-cyan-300/12 dark:bg-slate-900/62 dark:hover:border-primary-500"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-transform group-hover:scale-110 dark:bg-primary-900/30 dark:text-primary-400">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">{t('phone')}</h3>
                                        <p className="text-slate-600 dark:text-slate-300">{profile.phone}</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4 rounded-2xl border border-cyan-300/18 bg-white/72 p-4 dark:border-cyan-300/12 dark:bg-slate-900/62">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">{t('location')}</h3>
                                        <p className="text-slate-600 dark:text-slate-300">{profile.location}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="holo-panel rounded-[1.75rem] p-5 sm:p-7">
                            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{t('connectWithMe')}</h2>
                            <SocialLinks
                                links={profile.socialLinks}
                                variant="colorful"
                                size="lg"
                                showLabels
                                className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
                            />
                        </section>

                        <section className="holo-panel rounded-[1.75rem] p-6 sm:p-7">
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                {t('responseTime')}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                {t('responseTimeDescription')}
                            </p>
                        </section>
                    </div>

                    <div className="xl:sticky xl:top-28 xl:self-start">
                        <div className="holo-panel rounded-[1.9rem] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8">
                            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{t('sendMeMessage')}</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
