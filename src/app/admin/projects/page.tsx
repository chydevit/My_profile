"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/admin/projects");
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProjects(projects.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete project", error);
        }
    };

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your portfolio projects</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button className="gap-2">
                        <Plus size={18} />
                        Add Project
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <Search className="text-gray-400" size={20} />
                <Input
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 px-0 h-auto"
                />
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredProjects.map((project) => (
                        <Card key={project.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden relative shrink-0">
                                    {/* Placeholder for image if not implemented fully */}
                                    {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover" />}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>{project.category}</span>
                                        <span>•</span>
                                        <span className={project.featured ? "text-amber-500" : ""}>
                                            {project.featured ? "Featured" : "Standard"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <Link href={`/admin/projects/${project.id}`}>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Pencil size={16} />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-200 dark:border-red-800"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No projects found matching your search.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
