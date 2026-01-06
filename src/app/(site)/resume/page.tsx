import Link from 'next/link';
import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import ResumePrintButton from '@/components/features/ResumePrintButton';
import { getProfile, getExperience, getEducation, getSkills } from '@/lib/content';

export const metadata = {
    title: 'Resume | Chy Devit',
    description: 'Professional resume and curriculum vitae of Chy Devit.',
};

export default function ResumePage() {
    const profile = getProfile();
    const experience = getExperience().sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    const education = getEducation().sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    const skills = getSkills();

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 print:bg-white print:py-0">
            <Container className="max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none print:max-w-none print:p-0">

                {/* Actions Bar (Hidden in Print) */}
                <div className="bg-gray-100 dark:bg-gray-700/50 p-4 flex justify-between items-center print:hidden border-b border-gray-200 dark:border-gray-700">
                    <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 flex items-center gap-2">
                        ← Back to Portfolio
                    </Link>
                    <div className="flex gap-3">
                        <ResumePrintButton />
                        <a
                            href={profile.cvUrl}
                            download
                            className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-9 px-4 text-sm bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </a>
                    </div>
                </div>

                {/* Resume Content */}
                <div className="p-8 md:p-12 space-y-8 print:p-8">

                    {/* Header */}
                    <header className="flex flex-col md:flex-row justify-between gap-6 border-b border-gray-200 dark:border-gray-700 pb-8">
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                                    {profile.name}
                                </h1>
                                <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mt-1">
                                    {profile.title}
                                </p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                                {profile.bio}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 min-w-[200px]">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary-500" />
                                <a href={`mailto:${profile.email}`} className="hover:text-primary-600">{profile.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary-500" />
                                <a href={`tel:${profile.phone}`} className="hover:text-primary-600">{profile.phone}</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary-500" />
                                <span>{profile.location}</span>
                            </div>
                            {profile.socialLinks.map(link => (
                                <div key={link.platform} className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-primary-500" />
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                                        {link.platform}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </header>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Main Column */}
                        <div className="md:col-span-2 space-y-8">

                            {/* Experience */}
                            <section>
                                <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white uppercase border-b-2 border-primary-500 inline-block mb-6 pb-1">
                                    Work Experience
                                </h2>
                                <div className="space-y-8">
                                    {experience.map(item => (
                                        <div key={item.id} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                                            <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-800" />
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                                <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 rounded">
                                                    {item.startDate} — {item.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <div className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                                                {item.company} &bull; {item.location}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                                                {item.description}
                                            </p>
                                            <ul className="list-disc pl-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                                {item.responsibilities.map((resp, i) => (
                                                    <li key={i}>{resp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white uppercase border-b-2 border-primary-500 inline-block mb-6 pb-1">
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {education.map(item => (
                                        <div key={item.id}>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                                <span className="text-sm font-medium text-gray-500">
                                                    {item.startDate} — {item.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <div className="text-primary-600 dark:text-primary-400 font-medium">
                                                {item.company}, {item.location}
                                            </div>
                                            {item.description && (
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Column */}
                        <div className="space-y-8">
                            {/* Skills */}
                            <section>
                                <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white uppercase border-b-2 border-primary-500 inline-block mb-6 pb-1">
                                    Skills
                                </h2>
                                <div className="space-y-6">
                                    {skills.categories.map(cat => (
                                        <div key={cat.name}>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-sm uppercase tracking-wide">
                                                {cat.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {cat.skills.map(skill => (
                                                    <span
                                                        key={skill.name}
                                                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                                                    >
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Languages (Hardcoded for now as it's not in JSON usually, but good for Resume) */}
                            <section>
                                <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white uppercase border-b-2 border-primary-500 inline-block mb-6 pb-1">
                                    Languages
                                </h2>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex justify-between">
                                        <span>Khmer</span>
                                        <span className="text-gray-400">Native</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>English</span>
                                        <span className="text-gray-400">Professional</span>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
