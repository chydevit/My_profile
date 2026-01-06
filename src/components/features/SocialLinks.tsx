'use client';

import React from 'react';
import { Github, Linkedin, Mail, Send, ExternalLink, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

interface SocialLinksProps {
    links: SocialLink[];
    variant?: 'default' | 'minimal' | 'colorful';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showLabels?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
    send: Send,
    external: ExternalLink,
};

const colorMap: Record<string, string> = {
    github: 'hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900',
    linkedin: 'hover:bg-[#0077B5] hover:text-white',
    mail: 'hover:bg-red-500 hover:text-white',
    send: 'hover:bg-[#0088cc] hover:text-white',
    external: 'hover:bg-primary-500 hover:text-white',
};

const SocialLinks: React.FC<SocialLinksProps> = ({
    links,
    variant = 'default',
    size = 'md',
    className,
    showLabels = false,
}) => {
    const sizeStyles = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24,
    };

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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn('flex items-center gap-3', className)}
        >
            {links.map((link, index) => {
                const Icon = iconMap[link.icon] || ExternalLink;
                const isColorful = variant === 'colorful';
                const colorClass = isColorful ? colorMap[link.icon] : '';

                return (
                    <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                            'flex items-center justify-center rounded-full transition-all duration-300',
                            'border-2 border-gray-300 dark:border-gray-600',
                            'text-gray-700 dark:text-gray-300',
                            'hover:shadow-lg hover:border-transparent',
                            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                            sizeStyles[size],
                            colorClass,
                            variant === 'minimal' && 'border-none hover:bg-gray-100 dark:hover:bg-gray-800',
                            showLabels && 'px-4 w-auto gap-2'
                        )}
                        aria-label={link.platform}
                        title={link.platform}
                    >
                        <Icon size={iconSizes[size]} />
                        {showLabels && (
                            <span className="text-sm font-medium">{link.platform}</span>
                        )}
                    </motion.a>
                );
            })}
        </motion.div>
    );
};

export default SocialLinks;
