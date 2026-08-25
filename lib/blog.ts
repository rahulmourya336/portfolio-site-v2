import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  topic: string;
  readingMinutes: number;
  draft?: boolean;
};

export type Post = PostMeta & {
  html: string;
  headings: { id: string; text: string }[];
};

const postsDir = path.join(process.cwd(), "content/blog");

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const readingMinutes = (markdown: string) =>
  Math.max(1, Math.round(markdown.trim().split(/\s+/).length / 220));

/**
 * Adds an id to every h2 and h3 so posts can be deep linked, and collects the
 * h2 list for the on-page table of contents. Done on the HTML string because
 * marked's renderer API moves between major versions and this does not.
 */
const withHeadingIds = (html: string) => {
  const headings: { id: string; text: string }[] = [];
  const withIds = html.replace(
    /<(h[23])>([\s\S]*?)<\/\1>/g,
    (_match, tag: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = slugify(text);
      if (tag === "h2") headings.push({ id, text });
      return `<${tag} id="${id}">${inner}</${tag}>`;
    },
  );
  return { html: withIds, headings };
};

const readPostFile = (filename: string) => {
  const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
  const { data, content } = matter(raw);
  const meta = data as Partial<PostMeta>;
  const slug = meta.slug || filename.replace(/\.md$/, "");

  return {
    meta: {
      slug,
      title: meta.title ?? slug,
      description: meta.description ?? "",
      date: meta.date ? new Date(meta.date).toISOString().slice(0, 10) : "",
      updated: meta.updated
        ? new Date(meta.updated).toISOString().slice(0, 10)
        : undefined,
      tags: meta.tags ?? [],
      topic: meta.topic ?? "General",
      readingMinutes: readingMinutes(content),
      draft: meta.draft ?? false,
    } satisfies PostMeta,
    content,
  };
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPostFile(file).meta)
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const filename = `${slug}.md`;
  if (!fs.existsSync(path.join(postsDir, filename))) return null;

  const { meta, content } = readPostFile(filename);
  const { html, headings } = withHeadingIds(marked.parse(content) as string);
  return { ...meta, html, headings };
}

/** Most used tags first, so the filter row leads with what is worth clicking. */
export function getAllTags(posts: PostMeta[]): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function getTopics(posts: PostMeta[]): string[] {
  return Array.from(new Set(posts.map((post) => post.topic))).sort((a, b) =>
    a.localeCompare(b),
  );
}

/** Same topic first, then anything sharing a tag. */
export function getRelatedPosts(current: PostMeta, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score:
        (post.topic === current.topic ? 2 : 0) +
        post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}
