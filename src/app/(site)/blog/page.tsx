import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import BlogListing from '@/components/features/BlogListing';
import { getAllPosts } from '@/lib/api/blog';

export const metadata: Metadata = {
    title: 'Blog | Chy Devit',
    description: 'Thoughts, tutorials, and insights about web development, design, and technology.',
    openGraph: {
        title: 'Blog | Chy Devit',
        description: 'Thoughts, tutorials, and insights about web development, design, and technology.',
        type: 'website',
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    // Extract all unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

    return (
        <main className="min-h-screen pt-24 pb-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        My <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Insights, thoughts, and tutorials on web development, mobile apps, and modern tech stacks.
                    </p>
                </div>

                <BlogListing posts={posts} allTags={allTags} />
            </Container>
        </main>
    );
}
