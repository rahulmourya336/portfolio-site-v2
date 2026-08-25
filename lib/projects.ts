import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  name: string;
  slug: string;
  description: string;
  demoLink: string;
  githubLink?: string;
  thumbnail: string;
  tags: string[];
  year?: number;
  /** Drives the JSON-LD type: an app people use vs a piece of work. */
  kind?: "SoftwareApplication" | "CreativeWork";
  featured?: boolean;
  order?: number;
};

const projectsDir = path.join(process.cwd(), "content/projects");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function getProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  const projects = fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(projectsDir, filename), "utf-8");
      const { data } = matter(raw);
      const project = data as Project;
      return {
        ...project,
        slug: project.slug || slugify(project.name),
        tags: project.tags ?? [],
        kind: project.kind ?? "SoftwareApplication",
      };
    });

  return projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getFeaturedProjects(limit = 3): Project[] {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

/** Most used tags first, so the filter row leads with what is worth clicking. */
export function getProjectTags(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}
