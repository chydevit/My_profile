import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Project } from '@/lib/types';

const projectsFile = path.join(process.cwd(), 'src/content/projects/projects.json');

function getProjects(): Project[] {
    if (!fs.existsSync(projectsFile)) {
        return [];
    }
    const fileContents = fs.readFileSync(projectsFile, 'utf8');
    return JSON.parse(fileContents);
}

function saveProjects(projects: Project[]) {
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
}

export async function GET() {
    try {
        const projects = getProjects();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const projects = getProjects();

        const newProject: Project = {
            ...body,
            id: crypto.randomUUID(),
            images: body.images || [],
            tags: body.tags || [],
            technologies: body.technologies || [],
            featured: body.featured || false
        };

        projects.push(newProject);
        saveProjects(projects);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
