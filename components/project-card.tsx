import Image from "next/image";
import type { Project } from "@/lib/projects";
import { IconEye, IconGithubTransparent } from "./icons";

type Props = {
  project: Project;
  /** The first card on a page carries the LCP image, so it loads eagerly. */
  priority?: boolean;
};

const ProjectCard = ({ project, priority = false }: Props) => {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <a
        href={project.demoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[1200/630] overflow-hidden bg-surface-2"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={project.thumbnail}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </a>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-base font-semibold leading-snug text-fg">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {project.name}
          </a>
        </h3>

        {project.description && (
          <p className="text-sm leading-6 text-fg-muted">{project.description}</p>
        )}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs text-fg-subtle"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 border-t border-border pt-3 text-xs text-fg-subtle">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-accent"
          >
            <IconEye aria-hidden="true" /> Live
            <span className="sr-only"> demo of {project.name}</span>
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-accent"
            >
              <IconGithubTransparent aria-hidden="true" /> Code
              <span className="sr-only"> for {project.name} on GitHub</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
