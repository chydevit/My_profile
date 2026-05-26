'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
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
        <div className="relative mx-auto max-w-4xl py-6 sm:px-4 sm:py-8">
            <div className="absolute bottom-4 left-3 top-4 w-0.5 bg-gradient-to-b from-primary-500/20 via-primary-500 to-primary-500/20 sm:left-4 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
                {sortedItems.map((item, index) => {
                    const isEducation = item.type === 'education';

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col gap-6 pl-8 sm:pl-10 md:flex-row md:gap-0 md:pl-0",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}
                        >
                            <div className="flex-1 md:w-1/2">
                                <div className={cn(
                                    "group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-lg transition-colors duration-300 hover:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-500 sm:p-6",
                                    index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                                )}>
                                    <div className={cn(
                                        "hidden md:block absolute top-8 w-4 h-4 bg-white dark:bg-gray-800 border-t border-r border-gray-100 dark:border-gray-700 transform rotate-45 group-hover:border-primary-500 dark:group-hover:border-primary-500 transition-colors duration-300",
                                        index % 2 === 0
                                            ? "left-[-8px] border-t-0 border-r-0 border-b border-l"
                                            : "right-[-8px]"
                                    )} />

                                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0">
                                            <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                                                {item.title}
                                            </h3>
                                            <div className="text-base font-semibold text-primary-600 dark:text-primary-400 sm:text-lg">
                                                {item.company}
                                            </div>
                                        </div>
                                        {isEducation && (
                                            <span className="w-fit rounded-full bg-gray-100 px-2 py-1 text-xs font-medium whitespace-nowrap text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                                Education
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-4 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                                        <div className="flex items-center gap-1.5 break-words">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {format(new Date(item.startDate), 'MMM yyyy')} - {item.endDate ? format(new Date(item.endDate), 'MMM yyyy') : 'Present'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 break-words">
                                            <MapPin className="w-4 h-4" />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>

                                    <p className="mb-4 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                                        {item.description}
                                    </p>

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

                            <div className="absolute left-3 top-7 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-4 border-primary-500 bg-white shadow-lg sm:left-4 sm:h-8 sm:w-8 md:left-1/2 md:-translate-x-1/2 md:translate-x-[-50%] dark:bg-gray-900">
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
