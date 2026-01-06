"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { BlogPost } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save } from "lucide-react";

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)),
    publishedDate: z.string(),
    author: z.string().default("Chy Devit"),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Transform initialData data for form
    const defaultValues: any = initialData ? {
        ...initialData,
        tags: initialData.tags.join(', '),
        // Ensure date is formatted for date input
        publishedDate: initialData.publishedDate ? new Date(initialData.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    } : {
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "/images/blog/placeholder.jpg",
        featured: false,
        tags: "",
        publishedDate: new Date().toISOString().split('T')[0],
        author: "Chy Devit",
    };

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<any>({
        resolver: zodResolver(postSchema),
        defaultValues,
    });

    const title = watch('title');

    // Auto-generate slug from title if not editing
    if (!isEditing && title && !watch('slug')) {
        // logic can be added here but causing hydration/render loops if not careful
        // better to leave manual or add a button "Generate Slug"
    }

    const onSubmit = async (data: PostFormData) => {
        setLoading(true);
        try {
            const endpoint = isEditing ? `/api/admin/blog/${initialData?.slug}` : "/api/admin/blog";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/admin/blog");
                router.refresh();
            } else {
                const err = await res.json();
                alert(`Failed to save post: ${err.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input {...register("title")} placeholder="Post Title" error={errors.title?.message as string} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input {...register("slug")} placeholder="post-slug" error={errors.slug?.message as string} />
                </div>
            </div>

            <div className="space-y-2">
                <Textarea
                    label="Excerpt"
                    {...register("excerpt")}
                    placeholder="Short summary..."
                    error={errors.excerpt?.message as string}
                    rows={2}
                />
            </div>

            <div className="space-y-2">
                <Textarea
                    label="Content (MDX supported)"
                    {...register("content")}
                    className="font-mono text-sm"
                    placeholder="# Hello World..."
                    error={errors.content?.message as string}
                    rows={15}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Published Date</label>
                    <Input type="date" {...register("publishedDate")} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Author</label>
                    <Input {...register("author")} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <Input {...register("image")} placeholder="/images/blog/..." />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input {...register("tags")} placeholder="Next.js, Tutorial, Web" />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="featured"
                    {...register("featured")}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Post</label>
            </div>

            <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto gap-2">
                    <Save size={18} />
                    {loading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
