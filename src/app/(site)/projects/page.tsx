"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Search, Filter } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getAllProjects, getAllProjectTags, getAllProjectCategories } from "@/lib/content";

export default function ProjectsPage() {
    const allProjects = getAllProjects();
    const allTags = getAllProjectTags();
    const allCategories = getAllProjectCategories();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Filter projects
    const filteredProjects = allProjects.filter((project) => {
        const matchesSearch =
            searchQuery === "" ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === null || project.category === selectedCategory;

        const matchesTag =
            selectedTag === null ||
            project.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

        return matchesSearch && matchesCategory && matchesTag;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen py-20">
            <Container>
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">
                        My <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A collection of {allProjects.length} web and mobile projects showcasing my skills
                        and experience
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 space-y-6"
                >
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary-600"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === null
                                    ? "bg-primary-600 text-white shadow-lg"
                                    : "bg-muted hover:bg-muted/80 text-foreground"
                                }`}
                        >
                            All Categories
                        </button>
                        {allCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 capitalize ${selectedCategory === category
                                        ? "bg-primary-600 text-white shadow-lg"
                                        : "bg-muted hover:bg-muted/80 text-foreground"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Tag Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {selectedTag && (
                            <button
                                onClick={() => setSelectedTag(null)}
                                className="px-3 py-1 text-sm rounded-full bg-primary-600 text-white"
                            >
                                {selectedTag} ✕
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <p className="text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span>{" "}
                        of {allProjects.length} projects
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project) => (
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
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full mb-3 capitalize">
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
                                            <button
                                                key={tag}
                                                onClick={() => setSelectedTag(tag)}
                                                className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground hover:bg-primary-100 hover:text-primary-600 transition-colors"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span className="text-xs px-2 py-1 text-muted-foreground">
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-2xl font-heading font-semibold mb-2">No projects found</h3>
                        <p className="text-muted-foreground mb-6">
                            Try adjusting your search or filters
                        </p>
                        <Button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory(null);
                                setSelectedTag(null);
                            }}
                        >
                            Clear Filters
                        </Button>
                    </motion.div>
                )}
            </Container>
        </div>
    );
}
