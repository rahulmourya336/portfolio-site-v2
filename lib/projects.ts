import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  name: string;
  githubLink: string;
  demoLink: string;
  thumbnail: string;
  tags: string[];
  description?: string;
  order?: number;
};

export function getProjects(): Project[] {
  const projectsDir = path.join(process.cwd(), "content/projects");

  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"));

  const projects = files.map((filename) => {
    const filePath = path.join(projectsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data as Project;
  });

  return projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}
