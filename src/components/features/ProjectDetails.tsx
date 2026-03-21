'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Github, Calendar, Tag, ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import Lightbox from "@/components/ui/Lightbox";
import { Project } from "@/lib/types";

interface ProjectDetailsProps {
    project: Project;
    relatedProjects: Project[];
}

export default function ProjectDetails({ project, relatedProjects }: ProjectDetailsProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const galleryImages = [project.image, ...(project.images || [])];

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="min-h-screen py-24">
            <Container>
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
                >
                    <Link href="/" className="transition-colors hover:text-primary-600">
                        <Home className="h-4 w-4" />
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/projects" className="transition-colors hover:text-primary-600">
                        Projects
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="max-w-[200px] truncate font-medium text-foreground">
                        {project.title}
                    </span>
                </motion.nav>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium capitalize text-primary-600 dark:bg-primary-900/30">
                            {project.category}
                        </span>
                        {project.featured && (
                            <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                Featured
                            </span>
                        )}
                        {project.status === "coming-soon" && (
                            <span className="rounded-full bg-amber-100/80 px-4 py-1.5 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                Coming soon
                            </span>
                        )}
                    </div>

                    <h1 className="mb-4 text-4xl font-heading font-bold md:text-5xl">
                        {project.title}
                    </h1>

                    <p className="mb-6 text-xl text-muted-foreground">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{project.completedDate}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 text-base font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-md active:bg-primary-800"
                            >
                                <ExternalLink className="h-5 w-5" />
                                {project.ctaLabel ?? "View Live Demo"}
                            </a>
                        )}
                        {!project.liveUrl && project.status === "coming-soon" && (
                            <button
                                type="button"
                                disabled
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-amber-400/30 bg-amber-500/15 px-6 text-base font-medium text-amber-700 cursor-not-allowed dark:text-amber-300"
                            >
                                {project.ctaLabel ?? "Coming Soon"}
                            </button>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 text-base font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                            >
                                <Github className="h-5 w-5" />
                                View Source Code
                            </a>
                        )}
                    </div>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="space-y-12 lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card
                                className="cursor-pointer overflow-hidden group"
                                onClick={() => openLightbox(0)}
                            >
                                <div className="relative aspect-video">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                                        <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black/80 dark:text-white">
                                            View Fullscreen
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {project.longDescription && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="mb-4 text-2xl font-heading font-semibold">
                                    About This Project
                                </h2>
                                <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
                                    {project.longDescription}
                                </p>
                            </motion.div>
                        )}

                        {project.images && project.images.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                <h2 className="mb-6 text-2xl font-heading font-semibold">
                                    Gallery
                                </h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {project.images.map((img, idx) => (
                                        <Card
                                            key={idx}
                                            className="cursor-pointer overflow-hidden group"
                                            onClick={() => openLightbox(idx + 1)}
                                        >
                                            <div className="relative aspect-[4/3]">
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} screenshot ${idx + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {project.features && project.features.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h2 className="mb-4 text-2xl font-heading font-semibold">
                                    Key Features
                                </h2>
                                <ul className="space-y-3">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                                +
                                            </span>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-heading font-semibold">
                                        <Tag className="h-5 w-5" />
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-heading font-semibold">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-sm text-primary-600 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {relatedProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-20 border-t border-border pt-12"
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-3xl font-heading font-bold">
                                Related Projects
                            </h2>
                            <Link
                                href="/projects"
                                className="flex items-center gap-1 font-medium text-primary-600 hover:text-primary-700"
                            >
                                View All <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedProjects.map((relatedProject) => (
                                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`}>
                                    <Card variant="elevated" hover className="h-full overflow-hidden group">
                                        <div className="relative h-40 overflow-hidden bg-muted">
                                            <Image
                                                src={relatedProject.image}
                                                alt={relatedProject.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="mb-2 font-heading font-semibold transition-colors group-hover:text-primary-600">
                                                {relatedProject.title}
                                            </h3>
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {relatedProject.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </Container>

            <Lightbox
                images={galleryImages}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </div>
    );
}
