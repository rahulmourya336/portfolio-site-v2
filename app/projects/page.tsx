import type { Metadata } from "next";
import { getProjects, getProjectTags } from "@/lib/projects";
import ProjectsGallery from "@/components/projects-gallery";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects I keep online: an inverter and battery calculator for Indian homes, a compliance workspace, and two hundred small CSS and React builds.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects by Rahul Mourya",
    description:
      "Side projects I keep online: an inverter and battery calculator for Indian homes, a compliance workspace, and two hundred small CSS and React builds.",
    url: absoluteUrl("/projects"),
    type: "website",
  },
};

const ProjectsPage = () => {
  const projects = getProjects();
  const tags = getProjectTags(projects);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Rahul Mourya",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": project.kind,
        name: project.name,
        description: project.description,
        url: project.demoLink,
        image: absoluteUrl(project.thumbnail),
        author: { "@id": `${siteUrl}/#person` },
        ...(project.kind === "SoftwareApplication"
          ? { applicationCategory: "WebApplication", operatingSystem: "Web" }
          : {}),
        ...(project.githubLink ? { codeRepository: project.githubLink } : {}),
        keywords: project.tags.join(", "),
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absoluteUrl("/projects"),
      },
    ],
  };

  return (
    <div className="wrapper-wide px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]),
        }}
      />

      <header className="mb-10 flex max-w-2xl flex-col gap-4">
        <h1 className="font-display text-4xl text-fg sm:text-5xl">Projects</h1>
        <p className="leading-7 text-fg-muted">
          Things I build outside work hours, all of them live and usable. Every
          card links to the running app, and to the source when the repository
          is public. For everything else, see{" "}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2"
          >
            GitHub
          </a>
          .
        </p>
      </header>

      <ProjectsGallery projects={projects} tags={tags} />
    </div>
  );
};

export default ProjectsPage;
