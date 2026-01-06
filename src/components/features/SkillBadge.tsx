'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
    name: string;
    icon?: LucideIcon | string;
    proficiency?: number; // 0-100
    category?: string;
    showProficiency?: boolean;
    variant?: 'default' | 'outlined' | 'filled';
    className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
    name,
    icon,
    proficiency = 0,
    category,
    showProficiency = false,
    variant = 'default',
    className,
}) => {
    const variantStyles = {
        default: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
        outlined: 'bg-transparent border-2 border-primary-500 dark:border-primary-400',
        filled: 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white border-none',
    };

    const proficiencyColor = (level: number) => {
        if (level >= 80) return 'bg-green-500';
        if (level >= 60) return 'bg-blue-500';
        if (level >= 40) return 'bg-yellow-500';
        return 'bg-orange-500';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
            className={cn(
                'group relative overflow-hidden rounded-xl p-4 transition-all duration-300',
                'hover:shadow-lg hover:shadow-primary-500/20',
                variantStyles[variant],
                className
            )}
        >
            {/* Background gradient effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300" />

            <div className="relative z-10 flex items-center gap-3">
                {/* Icon */}
                {icon && (
                    <div className="flex-shrink-0">
                        {typeof icon === 'string' ? (
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-lg">
                                {icon.charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                {React.createElement(icon, { size: 20 })}
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {name}
                    </h3>
                    {category && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {category}
                        </p>
                    )}
                </div>

                {/* Proficiency indicator */}
                {showProficiency && proficiency > 0 && (
                    <div className="flex-shrink-0 text-right">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {proficiency}%
                        </div>
                    </div>
                )}
            </div>

            {/* Proficiency bar */}
            {showProficiency && proficiency > 0 && (
                <div className="relative mt-3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${proficiency}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className={cn('h-full rounded-full', proficiencyColor(proficiency))}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default SkillBadge;
