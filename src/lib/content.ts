/**
 * Content utility functions for reading and processing content files
 */

import profileData from "@/content/data/profile.json";
import skillsData from "@/content/data/skills.json";
import educationData from "@/content/data/education.json";
import experienceData from "@/content/data/experience.json";
import servicesData from "@/content/data/services.json";
import testimonialsData from "@/content/data/testimonials.json";
import projectsData from "@/content/projects/projects.json";
import type { Profile, Skill, Education, Experience, Service, Project, Testimonial } from "./types";

/**
 * Get profile data
 */
export function getProfile(): Profile {
    return profileData as Profile;
}

/**
 * Get all skills organized by category
 */
export function getSkills() {
    return skillsData;
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): Skill[] {
    const categoryData = skillsData.categories.find(
        (cat) => cat.name.toLowerCase() === category.toLowerCase()
    );
    if (!categoryData) return [];

    return categoryData.skills.map(skill => ({
        ...skill,
        category: categoryData.name as any
    })) as Skill[];
}

/**
 * Get education history
 */
export function getEducation(): Education[] {
    return educationData as Education[];
}

/**
 * Get work experience
 */
export function getExperience(): Experience[] {
    return experienceData as Experience[];
}

/**
 * Get all services
 */
export function getServices(): Service[] {
    return servicesData as Service[];
}

/**
 * Get all testimonials
 */
export function getTestimonials(): Testimonial[] {
    return testimonialsData as Testimonial[];
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
    return projectsData as Project[];
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
    return projectsData.filter((project) => project.featured) as Project[];
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return projectsData.find((project) => project.slug === slug) as Project | undefined;
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
    return projectsData.filter(
        (project) => project.category.toLowerCase() === category.toLowerCase()
    ) as Project[];
}

/**
 * Get projects by tag
 */
export function getProjectsByTag(tag: string): Project[] {
    return projectsData.filter((project) =>
        project.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    ) as Project[];
}

/**
 * Get all unique project tags
 */
export function getAllProjectTags(): string[] {
    const tags = new Set<string>();
    projectsData.forEach((project) => {
        project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
}

/**
 * Get all unique project categories
 */
export function getAllProjectCategories(): string[] {
    const categories = new Set<string>();
    projectsData.forEach((project) => {
        categories.add(project.category);
    });
    return Array.from(categories).sort();
}
