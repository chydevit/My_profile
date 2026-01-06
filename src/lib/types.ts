/**
 * TypeScript type definitions for portfolio content
 */

export interface Profile {
    name: string;
    title: string;
    roles: string[];
    bio: string;
    email: string;
    phone: string;
    location: string;
    image: string;
    cvUrl: string;
    socialLinks: SocialLink[];
    stats?: {
        happyClients?: string;
        experience?: string;
    };
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

export interface Skill {
    name: string;
    category: SkillCategory;
    proficiency: number; // 1-100
    icon?: string;
}

export type SkillCategory =
    | "Frontend"
    | "Backend"
    | "Mobile"
    | "Database"
    | "Tools"
    | "Other";

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null; // null for current position
    description: string;
    responsibilities: string[];
    technologies: string[];
    type: "work" | "education";
}

export interface Education extends Experience {
    degree: string;
    field: string;
    gpa?: string;
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    images?: string[];
    tags: string[];
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    category: ProjectCategory;
    completedDate: string;
    features?: string[];
}

export type ProjectCategory = "web" | "mobile" | "fullstack" | "other";

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedDate: string;
    updatedDate?: string;
    tags: string[];
    image: string;
    featured: boolean;
    readingTime: number; // in minutes
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
    rating: number; // 1-5
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
}
