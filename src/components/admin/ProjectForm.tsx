"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Project } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save } from "lucide-react";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image URL is required"),
    category: z.enum(["web", "mobile", "fullstack", "other"]),
    featured: z.boolean().default(false),
    technologies: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    completedDate: z.string(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: Project;
    isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Transform initialData data for form (join arrays to strings)
    const defaultValues: any = initialData ? {
        ...initialData,
        technologies: initialData.technologies.join(', '),
        liveUrl: initialData.liveUrl || "",
        githubUrl: initialData.githubUrl || "",
    } : {
        title: "",
        slug: "",
        description: "",
        image: "/images/projects/placeholder.jpg",
        category: "web",
        featured: false,
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        completedDate: new Date().toISOString().split('T')[0],
    };

    const { register, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: zodResolver(projectSchema),
        defaultValues,
    });

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);
        try {
            const endpoint = isEditing ? `/api/admin/projects/${initialData?.id}` : "/api/admin/projects";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/projects");
                router.refresh();
            } else {
                alert("Failed to save project");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input {...register("title")} placeholder="Project Title" error={errors.title?.message as string} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input {...register("slug")} placeholder="project-slug" error={errors.slug?.message as string} />
                </div>
            </div>

            <div className="space-y-2">
                <Textarea
                    label="Description"
                    {...register("description")}
                    placeholder="Short description..."
                    error={errors.description?.message as string}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                        {...register("category")}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        <option value="fullstack">Full Stack</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Completed Date</label>
                    <Input type="date" {...register("completedDate")} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input {...register("image")} placeholder="/images/projects/..." />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Technologies (comma separated)</label>
                <Input {...register("technologies")} placeholder="React, Next.js, TensorFlow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Live URL</label>
                    <Input {...register("liveUrl")} placeholder="https://..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <Input {...register("githubUrl")} placeholder="https://github.com/..." />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="featured"
                    {...register("featured")}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
            </div>

            <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto gap-2">
                    <Save size={18} />
                    {loading ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
                </Button>
            </div>
        </form>
    );
}
