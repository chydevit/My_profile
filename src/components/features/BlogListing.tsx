'use client';

import React, { useState, useMemo } from 'react';
import { Search, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';
import { Input } from '@/components/ui/Input';

interface BlogListingProps {
    posts: BlogPost[];
    allTags: string[];
}

const BlogListing: React.FC<BlogListingProps> = ({ posts, allTags }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

            return matchesSearch && matchesTag;
        });
    }, [posts, searchQuery, selectedTag]);

    return (
        <div className="space-y-12">
            {/* Filters */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>

                    {/* Results count */}
                    <div className="text-sm text-gray-500 font-medium">
                        Showing {filteredPosts.length} post{filteredPosts.length !== 1 && 's'}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTag === null
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        All Topics
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${tag === selectedTag
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No posts found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedTag(null);
                        }}
                        className="mt-6 text-primary-600 hover:underline font-medium"
                    >
                        Clear all filters
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default BlogListing;
