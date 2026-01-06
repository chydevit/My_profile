import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/api/blog';
import { Container } from '@/components/ui/Container';
import { format } from 'date-fns';
import { Metadata } from 'next';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Chy Devit Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedDate,
            authors: [post.author],
            tags: post.tags,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    // Custom components for MDX
    const components = {
        h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
        h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
        p: (props: any) => <p className="mb-6 leading-7" {...props} />,
        ul: (props: any) => <ul className="list-disc pl-6 mb-6" {...props} />,
        ol: (props: any) => <ol className="list-decimal pl-6 mb-6" {...props} />,
        li: (props: any) => <li className="mb-2" {...props} />,
        blockquote: (props: any) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 italic my-6 bg-gray-50 dark:bg-gray-800/50 py-2 pr-4 rounded-r" {...props} />
        ),
        pre: (props: any) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6" {...props} />
        ),
        code: (props: any) => (
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary-600 dark:text-primary-400" {...props} />
        ),
        img: (props: any) => (
            <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden">
                <Image
                    src={props.src}
                    alt={props.alt || ''}
                    fill
                    className="object-cover"
                />
            </div>
        ),
    };

    return (
        <article className="min-h-screen py-24">
            <Container>
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="max-w-4xl mx-auto text-center mb-12">
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.publishedDate}>
                                {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
                            </time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-gray-200">
                                {post.author}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <div className="relative w-full aspect-[21/9] mb-16 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert prose-primary max-w-none">
                        <MDXRemote source={post.content} components={components} />
                    </div>

                    {/* Tags Bottom */}
                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-5 h-5 text-gray-400" />
                            <span className="font-semibold">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${tag}`}
                                    className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </article>
    );
}
