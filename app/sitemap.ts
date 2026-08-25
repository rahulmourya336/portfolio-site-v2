import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
      { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.8 },
      { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.9 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified: new Date() }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
