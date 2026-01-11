"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
        <section id="projects" className="py-20 bg-background">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span className="gradient-text">{t('featuredProjects')}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('projectsDescription')}
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <Card variant="elevated" hover className="h-full overflow-hidden group">
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden bg-muted">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Links overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white rounded-full hover:bg-primary-600 hover:text-white transition-colors"
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
                                                className="p-3 bg-white rounded-full hover:bg-primary-600 hover:text-white transition-colors"
                                                aria-label="View source code"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    {/* Category Badge */}
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full mb-3">
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
                                                className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
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
                        className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-13 px-8 text-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950"
                    >
                        <ArrowRight className="w-5 h-5" />
                        {t('viewAllProjects')}
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
