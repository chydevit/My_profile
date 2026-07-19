import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import ProjectDetails from "@/components/features/ProjectDetails";

export function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const allProjects = getAllProjects();
    const relatedProjects = allProjects
        .filter((p) => p.id !== project.id && p.category === project.category)
        .slice(0, 3);

    return <ProjectDetails project={project} relatedProjects={relatedProjects} />;
}
