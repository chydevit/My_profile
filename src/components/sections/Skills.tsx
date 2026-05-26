"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { getSkills } from "@/lib/content";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function Skills() {
    const skillsData = getSkills();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { t } = useLanguage();

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
        <section id="skills" className="holo-section py-20 bg-background/70">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                        <span className="gradient-text">{t('mySkills')}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('skillsDescription')}
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 -mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0"
                >
                    <div className="flex min-w-max gap-3 sm:min-w-0 sm:flex-wrap sm:justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                 "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 md:px-6 md:text-base",
                                 selectedCategory === null
                                     ? "border-cyan-500/40 bg-cyan-500/20 text-cyan-800 shadow-[0_0_28px_rgba(34,211,238,0.18)] dark:border-cyan-300/24 dark:bg-cyan-400/14 dark:text-cyan-50"
                                     : "border-cyan-500/20 bg-white/60 text-foreground hover:bg-cyan-500/10 dark:border-cyan-300/10 dark:bg-slate-900/60 dark:hover:bg-cyan-300/8"
                             )}
                        >
                            {t('all')}
                        </button>
                        {skillsData.categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={cn(
                                     "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 md:px-6 md:text-base",
                                     selectedCategory === category.name
                                         ? "border-cyan-500/40 bg-cyan-500/20 text-cyan-800 shadow-[0_0_28px_rgba(34,211,238,0.18)] dark:border-cyan-300/24 dark:bg-cyan-400/14 dark:text-cyan-50"
                                         : "border-cyan-500/20 bg-white/60 text-foreground hover:bg-cyan-500/10 dark:border-cyan-300/10 dark:bg-slate-900/60 dark:hover:bg-cyan-300/8"
                                 )}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                {category.skills.map((skill) => (
                                    <motion.div key={skill.name} variants={itemVariants}>
                                        <Card
                                            variant="premium"
                                            hover
                                            className="group h-full p-4 text-center sm:p-5 md:p-6"
                                        >
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-foreground group-hover:text-primary-600 transition-colors">
                                                    {skill.name}
                                                </h4>

                                                <div className="space-y-1">
                                                    <div className="w-full h-2 rounded-full overflow-hidden bg-slate-200 ring-1 ring-cyan-500/20 dark:bg-slate-900/70 dark:ring-cyan-300/10">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${skill.proficiency}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: 0.2 }}
                                                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 shadow-[0_0_16px_rgba(56,189,248,0.35)]"
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
