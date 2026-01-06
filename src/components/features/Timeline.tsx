'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Experience, Education } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TimelineProps {
    items: (Experience | Education)[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
    // Sort by start date, most recent first
    const sortedItems = [...items].sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    return (
        <div className="relative max-w-4xl mx-auto px-4 py-8">
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary-500/20 via-primary-500 to-primary-500/20 md:-translate-x-1/2" />

            <div className="space-y-12">
                {sortedItems.map((item, index) => {
                    const isLegacy = index % 2 === 0;
                    const isEducation = item.type === 'education';
                    const Icon = isEducation ? GraduationCap : Briefcase;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col md:flex-row gap-8 md:gap-0",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}
                        >
                            {/* Content */}
                            <div className="flex-1 md:w-1/2">
                                <div className={cn(
                                    "p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-300 relative group",
                                    index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                                )}>
                                    {/* Arrow for desktop */}
                                    <div className={cn(
                                        "hidden md:block absolute top-8 w-4 h-4 bg-white dark:bg-gray-800 border-t border-r border-gray-100 dark:border-gray-700 transform rotate-45 group-hover:border-primary-500 dark:group-hover:border-primary-500 transition-colors duration-300",
                                        index % 2 === 0
                                            ? "left-[-8px] border-t-0 border-r-0 border-b border-l"
                                            : "right-[-8px]"
                                    )} />

                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {item.title}
                                            </h3>
                                            <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                                {item.company}
                                            </div>
                                        </div>
                                        {isEducation && (
                                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                                                Education
                                            </span>
                                        )}
                                    </div>

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {format(new Date(item.startDate), 'MMM yyyy')} - {item.endDate ? format(new Date(item.endDate), 'MMM yyyy') : 'Present'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4" />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {item.description}
                                    </p>

                                    {/* Technologies/Skills */}
                                    {item.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Icon Marker */}
                            <div className="absolute left-4 md:left-1/2 top-8 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-4 border-primary-500 shadow-lg z-10 transform -translate-x-1/2 md:translate-x-[-50%]">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline;
