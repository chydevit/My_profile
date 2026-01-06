import { getAllProjects } from "@/lib/content";
import { getAllPosts } from "@/lib/api/blog";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { FolderKanban, FileText } from "lucide-react";

export default function AdminDashboard() {
    const projects = getAllProjects();
    const posts = getAllPosts();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Overview of your portfolio content</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <FolderKanban size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</h3>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Blog Posts</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
                        <Link href="/admin/projects" className="text-sm text-primary-600 hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {projects.slice(0, 5).map(project => (
                            <div key={project.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{project.title}</div>
                                    <div className="text-xs text-gray-500">{project.category}</div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {new Date(project.completedDate).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No projects found</div>
                        )}
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Blog Posts</h3>
                        <Link href="/admin/blog" className="text-sm text-primary-600 hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {posts.slice(0, 5).map(post => (
                            <div key={post.slug} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                                    <div className="text-xs text-gray-500">{post.tags.join(', ')}</div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {new Date(post.publishedDate).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                        {posts.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No posts found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
