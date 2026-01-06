"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, FileText } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function AdminBlog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/admin/blog");
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/admin/blog/${slug}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setPosts(posts.filter((p) => p.slug !== slug));
            }
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your blog content</p>
                </div>
                <Link href="/admin/blog/new">
                    <Button className="gap-2">
                        <Plus size={18} />
                        New Post
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <Search className="text-gray-400" size={20} />
                <Input
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 px-0 h-auto"
                />
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredPosts.map((post) => (
                        <Card key={post.slug} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{post.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{post.tags.slice(0, 2).join(', ')}</span>
                                        {post.featured && (
                                            <>
                                                <span>•</span>
                                                <span className="text-amber-500">Featured</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <Link href={`/admin/blog/${post.slug}`}>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Pencil size={16} />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-200 dark:border-red-800"
                                    onClick={() => handleDelete(post.slug)}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No posts found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
