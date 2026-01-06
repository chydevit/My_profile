import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getPostBySlug } from '@/lib/api/blog';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const body = await request.json();
        const { title, slug, content, ...data } = body;
        const { slug: oldSlug } = await params;

        const oldFilePath = path.join(blogDirectory, `${oldSlug}.mdx`);
        if (!fs.existsSync(oldFilePath)) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const newFilePath = path.join(blogDirectory, `${slug}.mdx`);

        // If slug changed, check if new one exists
        if (slug !== oldSlug && fs.existsSync(newFilePath)) {
            return NextResponse.json({ error: 'New slug already exists' }, { status: 409 });
        }

        const fileContent = matter.stringify(content || '', {
            title,
            ...data
        });

        if (slug !== oldSlug) {
            fs.unlinkSync(oldFilePath);
            fs.writeFileSync(newFilePath, fileContent);
        } else {
            fs.writeFileSync(oldFilePath, fileContent);
        }

        return NextResponse.json({ message: 'Post updated' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const filePath = path.join(blogDirectory, `${slug}.mdx`);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        fs.unlinkSync(filePath);

        return NextResponse.json({ message: 'Post deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
