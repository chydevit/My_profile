"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { getSkills } from "@/lib/content";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Skills() {
    const skillsData = getSkills();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    const displayedCategories = selectedCategory
        ? skillsData.categories.filter((cat) => cat.name === selectedCategory)
        : skillsData.categories;

    return (
        <section id="skills" className="py-20 bg-background">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Technologies and tools I work with to bring ideas to life
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all duration-300",
                            selectedCategory === null
                                ? "bg-primary-600 text-white shadow-lg"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                        )}
                    >
                        All
                    </button>
                    {skillsData.categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setSelectedCategory(category.name)}
                            className={cn(
                                "px-6 py-2 rounded-full font-medium transition-all duration-300",
                                selectedCategory === category.name
                                    ? "bg-primary-600 text-white shadow-lg"
                                    : "bg-muted hover:bg-muted/80 text-foreground"
                            )}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <div className="space-y-12">
                    {displayedCategories.map((category) => (
                        <motion.div
                            key={category.name}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={containerVariants}
                        >
                            <h3 className="text-2xl font-heading font-semibold mb-6 text-center">
                                {category.name}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.skills.map((skill) => (
                                    <motion.div key={skill.name} variants={itemVariants}>
                                        <Card
                                            variant="elevated"
                                            hover
                                            className="p-6 text-center group"
                                        >
                                            <div className="space-y-3">
                                                {/* Skill Name */}
                                                <h4 className="font-semibold text-foreground group-hover:text-primary-600 transition-colors">
                                                    {skill.name}
                                                </h4>

                                                {/* Proficiency Bar */}
                                                <div className="space-y-1">
                                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.proficiency}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: 0.2 }}
                                                            className="h-full bg-gradient-to-r from-primary-600 to-accent-purple rounded-full"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {skill.proficiency}%
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
