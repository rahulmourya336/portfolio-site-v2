import type { Metadata } from "next";
import Link from "next/link";
import Intro from "@/components/intro";
import ProjectCard from "@/components/project-card";
import PostCard from "@/components/post-card";
import { Reveal } from "@/components/reveal";
import { IconRightArrow } from "@/components/icons";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Rahul Mourya, Full Stack Engineer in India",
  },
  description:
    "I build React and Vue front ends, Python and Node.js APIs, and the AWS infrastructure under them. Seven years of it, most recently on contact center tooling for UnitedHealth Group.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rahul Mourya, Full Stack Engineer",
    description:
      "React and Vue front ends, Python and Node.js APIs, and the AWS infrastructure under them.",
    url: absoluteUrl("/"),
    type: "profile",
  },
};

const Home = () => {
  const projects = getFeaturedProjects(3);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Intro />

      {projects.length > 0 && (
        <section
          aria-labelledby="featured-projects"
          className="wrapper-wide px-4 py-14"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="featured-projects"
                className="font-display text-3xl text-fg"
              >
                Recent projects
              </h2>
              <p className="mt-2 text-sm text-fg-muted">
                Live apps, not screenshots of dead repositories.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              All projects <IconRightArrow className="text-xs" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <Reveal>
                  <ProjectCard project={project} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {posts.length > 0 && (
        <section
          aria-labelledby="latest-posts"
          className="wrapper-wide px-4 pb-16"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="latest-posts" className="font-display text-3xl text-fg">
                From the blog
              </h2>
              <p className="mt-2 text-sm text-fg-muted">
                One problem per post, with a working example.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              All posts <IconRightArrow className="text-xs" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Reveal>
                  <PostCard post={post} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default Home;
