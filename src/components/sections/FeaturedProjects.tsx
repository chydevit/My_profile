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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <Card variant="premium" hover className="h-full group">
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden bg-slate-950/60">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/18 to-cyan-300/6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-x-4 top-3 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent opacity-70" />

                                    {/* Links overlay */}
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
                                    {/* Category Badge */}
                                     <span className="holo-chip inline-block rounded-full px-3 py-1 text-xs font-medium mb-3">
                                        {project.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md border border-cyan-300/10 bg-slate-900/55 px-2 py-1 text-xs text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        href="/projects"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-cyan-300/22 bg-cyan-400/10 px-6 text-base font-medium text-cyan-100 transition-all duration-200 hover:bg-cyan-400/18 md:h-13 md:px-8 md:text-lg"
                    >
                        <ArrowRight className="w-5 h-5" />
                        {t('viewAllProjects')}
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
