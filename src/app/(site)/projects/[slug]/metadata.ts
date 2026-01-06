import type { Metadata } from "next";
import { getProjectBySlug, getAllProjects } from "@/lib/content";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProjectBySlug(params.slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Chy Devit Portfolio`,
        description: project.longDescription || project.description,
        keywords: [...project.tags, ...project.technologies, "portfolio", "project"],
        openGraph: {
            title: project.title,
            description: project.description,
            type: "website",
            images: [project.image],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description,
            images: [project.image],
        },
    };
}

export function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}
