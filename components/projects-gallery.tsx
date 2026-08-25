"use client";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";
import ProjectCard from "./project-card";

const ProjectsGallery = ({
  projects,
  tags,
}: {
  projects: Project[];
  tags: string[];
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [allTagsShown, setAllTagsShown] = useState(false);

  const TAG_PREVIEW = 10;
  // The long tail of one-off tags stays behind a toggle so the filter row
  // does not push the cards below the fold.
  const visibleTags = allTagsShown ? tags : tags.slice(0, TAG_PREVIEW);

  const visible = useMemo(
    () =>
      activeTag
        ? projects.filter((project) => project.tags.includes(activeTag))
        : projects,
    [projects, activeTag],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
        <button
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            activeTag === null
              ? "border-accent bg-accent text-accent-fg"
              : "border-border text-fg-muted hover:border-accent/40 hover:text-fg"
          }`}
        >
          All {projects.length}
        </button>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            aria-pressed={tag === activeTag}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              tag === activeTag
                ? "border-accent bg-accent text-accent-fg"
                : "border-border text-fg-muted hover:border-accent/40 hover:text-fg"
            }`}
          >
            {tag}
          </button>
        ))}
        {tags.length > TAG_PREVIEW && (
          <button
            onClick={() => setAllTagsShown((shown) => !shown)}
            aria-expanded={allTagsShown}
            className="rounded-full px-3 py-1 text-sm text-accent hover:underline"
          >
            {allTagsShown ? "Show fewer tags" : `Show all ${tags.length} tags`}
          </button>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} projects shown
      </p>

      <h2 className="sr-only">All projects</h2>

      {/* Keyed on the filter so cards replay their entry animation on change. */}
      <ul
        key={activeTag ?? "all"}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project, index) => (
          <li
            key={project.slug}
            className="animate-fade-in"
            style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}
          >
            <ProjectCard project={project} priority={index === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsGallery;
