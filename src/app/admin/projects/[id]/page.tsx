import { ProjectForm } from "@/components/admin/ProjectForm";
import { getAllProjects } from "@/lib/content";

// Since we are checking in source for content, we can statically generate params
// or just rely on dynamic rendering. For an admin panel, dynamic is safer.
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projects = getAllProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Project</h1>
            <ProjectForm initialData={project} isEditing />
        </div>
    );
}
