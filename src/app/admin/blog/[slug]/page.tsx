import { PostForm } from "@/components/admin/PostForm";
import { getPostBySlug } from "@/lib/api/blog";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Post</h1>
            <PostForm initialData={post} isEditing />
        </div>
    );
}
