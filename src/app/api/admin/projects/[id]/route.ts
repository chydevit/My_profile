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

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { id } = await params;
        const projects = getProjects();
        const index = projects.findIndex((p) => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        projects[index] = { ...projects[index], ...body };
        saveProjects(projects);

        return NextResponse.json(projects[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        let projects = getProjects();
        const initialLength = projects.length;
        projects = projects.filter((p) => p.id !== id);

        if (projects.length === initialLength) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        saveProjects(projects);

        return NextResponse.json({ message: 'Project deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
