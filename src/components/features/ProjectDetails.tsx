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

    // Combine main image and additional images for gallery
    const galleryImages = [project.image, ...(project.images || [])];

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="min-h-screen py-24">
            <Container>
                {/* Breadcrumb Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
                >
                    <Link href="/" className="hover:text-primary-600 transition-colors">
                        <Home className="w-4 h-4" />
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/projects" className="hover:text-primary-600 transition-colors">
                        Projects
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium truncate max-w-[200px]">
                        {project.title}
                    </span>
                </motion.nav>

                {/* Project Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full capitalize">
                            {project.category}
                        </span>
                        {project.featured && (
                            <span className="px-4 py-1.5 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full">
                                ⭐ Featured
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        {project.title}
                    </h1>

                    <p className="text-xl text-muted-foreground mb-6">
                        {project.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{project.completedDate}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-12 px-6 text-base bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                <ExternalLink className="w-5 h-5" />
                                View Live Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 h-12 px-6 text-base border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                                <Github className="w-5 h-5" />
                                View Source Code
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Main Content & Sidebar */}
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card
                                className="overflow-hidden cursor-pointer group"
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
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                                        <span className="opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-black/80 text-black dark:text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-300">
                                            View Fullscreen
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Long Description */}
                        {project.longDescription && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-2xl font-heading font-semibold mb-4">
                                    About This Project
                                </h2>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {project.longDescription}
                                </p>
                            </motion.div>
                        )}

                        {/* Image Gallery */}
                        {project.images && project.images.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                <h2 className="text-2xl font-heading font-semibold mb-6">
                                    Gallery
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.images.map((img, idx) => (
                                        <Card
                                            key={idx}
                                            className="overflow-hidden cursor-pointer group"
                                            onClick={() => openLightbox(idx + 1)} // +1 because main image is 0
                                        >
                                            <div className="relative aspect-[4/3]">
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} screenshot ${idx + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h2 className="text-2xl font-heading font-semibold mb-4">
                                    Key Features
                                </h2>
                                <ul className="space-y-3">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mt-0.5 text-sm">✓</span>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Technologies */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
                                        <Tag className="w-5 h-5" />
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 text-sm bg-muted rounded-lg text-foreground font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-heading font-semibold mb-4">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-300 rounded-full border border-primary-100 dark:border-primary-800"
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

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-20 pt-12 border-t border-border"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-heading font-bold">
                                Related Projects
                            </h2>
                            <Link
                                href="/projects"
                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                            >
                                View All <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedProjects.map((relatedProject) => (
                                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`}>
                                    <Card variant="elevated" hover className="h-full overflow-hidden group">
                                        <div className="relative h-40 overflow-hidden bg-muted">
                                            <Image
                                                src={relatedProject.image}
                                                alt={relatedProject.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-heading font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                                                {relatedProject.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
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
