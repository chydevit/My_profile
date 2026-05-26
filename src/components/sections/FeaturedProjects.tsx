"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { getFeaturedProjects } from "@/lib/content";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function FeaturedProjects() {
    const projects = getFeaturedProjects().slice(0, 6);
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="projects" className="holo-section py-20 bg-background/70">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                        <span className="gradient-text">{t('featuredProjects')}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('projectsDescription')}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <Card variant="premium" hover className="group h-full">
                                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950/60">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/18 to-cyan-300/6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-x-4 top-3 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-70" />

                                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="holo-chip p-3 rounded-full transition-colors hover:bg-cyan-300/22"
                                                aria-label="View live project"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="holo-chip p-3 rounded-full transition-colors hover:bg-cyan-300/22"
                                                aria-label="View source code"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                     <span className="holo-chip inline-block rounded-full px-3 py-1 text-xs font-medium mb-3">
                                        {project.category}
                                    </span>

                                    <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {project.status === "coming-soon" && (
                                        <div className="mb-4 inline-flex rounded-full border border-amber-500/40 bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-300/25 dark:bg-amber-400/10 dark:text-amber-200">
                                            {t('comingSoon')}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md border border-cyan-500/20 bg-slate-100 px-2 py-1 text-xs text-muted-foreground dark:border-cyan-300/10 dark:bg-slate-900/55"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="inline-flex h-10 w-full items-center justify-center rounded-lg border-2 border-primary-600 px-4 text-sm font-medium text-primary-600 transition-all duration-200 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950 sm:h-9 sm:w-auto"
                                        >
                                            {t('details')}
                                        </Link>
                                        {project.liveUrl ? (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-700 sm:h-9 sm:w-auto"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                {project.ctaLabel ?? t('viewLive')}
                                            </a>
                                        ) : (
                                            <span className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white opacity-50 sm:h-9 sm:w-auto">
                                                {project.ctaLabel ?? t('comingSoon')}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        href="/projects"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-6 text-base font-medium text-cyan-700 transition-all duration-200 hover:bg-cyan-500/20 dark:border-cyan-300/22 dark:bg-cyan-400/10 dark:text-cyan-100 dark:hover:bg-cyan-400/18 md:h-13 md:px-8 md:text-lg"
                    >
                        <ArrowRight className="w-5 h-5" />
                        {t('viewAllProjects')}
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
