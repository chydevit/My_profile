import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/lib/types';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                excerpt: data.excerpt || '',
                content,
                author: data.author || 'Chy Devit',
                publishedDate: data.publishedDate || new Date().toISOString(),
                tags: data.tags || [],
                image: data.image || '/images/placeholder.jpg',
                featured: data.featured || false,
                readingTime: calculateReadingTime(content),
                ...data,
            } as BlogPost;
        });

    // Sort posts by date
    return allPosts.sort((a, b) => {
        if (a.publishedDate < b.publishedDate) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            content,
            author: data.author || 'Chy Devit',
            publishedDate: data.publishedDate || new Date().toISOString(),
            tags: data.tags || [],
            image: data.image || '/images/placeholder.jpg',
            featured: data.featured || false,
            readingTime: calculateReadingTime(content),
            ...data,
        } as BlogPost;
    } catch (error) {
        return null;
    }
}

export function getFeaturedPosts(): BlogPost[] {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.featured);
}

function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
