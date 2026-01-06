'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

interface BlogCardProps {
    post: BlogPost;
    index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card variant="elevated" hover className="h-full overflow-hidden flex flex-col group">
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-xs font-semibold bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <CardContent className="flex-1 flex flex-col p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{format(new Date(post.publishedDate), 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                            {post.excerpt}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm mt-auto">
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
};

export default BlogCard;
