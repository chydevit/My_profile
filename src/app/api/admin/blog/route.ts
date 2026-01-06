import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllPosts } from '@/lib/api/blog';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export async function GET() {
    try {
        const posts = getAllPosts();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, slug, content, ...data } = body;

        if (!slug || !title) {
            return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
        }

        const fileName = `${slug}.mdx`;
        const filePath = path.join(blogDirectory, fileName);

        if (fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Post with this slug already exists' }, { status: 409 });
        }

        const fileContent = matter.stringify(content || '', {
            title,
            ...data
        });

        fs.writeFileSync(filePath, fileContent);

        return NextResponse.json({ message: 'Post created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
