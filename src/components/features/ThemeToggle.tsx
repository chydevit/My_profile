'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
    className?: string;
    showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, showLabel = false }) => {
    const { theme, setTheme } = useTheme();

    const themes = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ] as const;

    return (
        <div className={cn('flex items-center gap-2', className)}>
            {showLabel && (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme:
                </span>
            )}
            <div className="relative flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {themes.map(({ value, icon: Icon, label }) => {
                    const isActive = theme === value;

                    return (
                        <button
                            key={value}
                            onClick={() => setTheme(value)}
                            className={cn(
                                'relative p-2 rounded-md transition-colors duration-200',
                                'hover:bg-gray-200 dark:hover:bg-gray-700',
                                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                                'focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800',
                                isActive && 'text-primary-600 dark:text-primary-400'
                            )}
                            aria-label={`Switch to ${label} theme`}
                            title={`${label} theme`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="theme-indicator"
                                    className="absolute inset-0 bg-white dark:bg-gray-900 rounded-md shadow-sm"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon
                                size={18}
                                className={cn(
                                    'relative z-10 transition-transform duration-200',
                                    isActive && 'scale-110'
                                )}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ThemeToggle;
