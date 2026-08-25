import fs from "fs";
import path from "path";
import { site } from "./site";

export type ExternalPost = {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  tags: string[];
  source: "Medium";
};

const snapshotPath = path.join(process.cwd(), "content/external/medium-feed.xml");

const decode = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();

const tag = (item: string, name: string) => {
  const match = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return match ? decode(match[1]) : "";
};

const excerptFrom = (item: string) => {
  const body = tag(item, "content:encoded");
  const firstParagraph = body.match(/<p>([\s\S]*?)<\/p>/);
  const text = decode((firstParagraph ? firstParagraph[1] : body).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 200 ? `${text.slice(0, 197).trimEnd()}...` : text;
};

/** Strips Medium's `?source=rss-...` tracking parameter. */
const cleanUrl = (url: string) => url.split("?")[0];

export function parseMediumFeed(xml: string): ExternalPost[] {
  return (xml.match(/<item>[\s\S]*?<\/item>/g) ?? []).map((item) => {
    const published = tag(item, "pubDate");
    return {
      title: tag(item, "title"),
      url: cleanUrl(tag(item, "link")),
      date: published ? new Date(published).toISOString().slice(0, 10) : "",
      excerpt: excerptFrom(item),
      tags: (item.match(/<category>[\s\S]*?<\/category>/g) ?? [])
        .map((entry) => decode(entry.replace(/<\/?category>/g, "")))
        .slice(0, 4),
      source: "Medium" as const,
    };
  });
}

const readSnapshot = (): ExternalPost[] => {
  if (!fs.existsSync(snapshotPath)) return [];
  return parseMediumFeed(fs.readFileSync(snapshotPath, "utf-8"));
};

/**
 * Live feed at build time, refreshed daily. A committed snapshot of the same
 * feed is the fallback, so a Medium outage can never fail a deploy.
 */
export async function getExternalPosts(): Promise<ExternalPost[]> {
  try {
    const response = await fetch(site.mediumFeed, {
      next: { revalidate: 86400 },
      headers: { "user-agent": "rahulmourya.dev portfolio build" },
    });
    if (!response.ok) throw new Error(`Medium feed returned ${response.status}`);
    const posts = parseMediumFeed(await response.text());
    return posts.length ? posts : readSnapshot();
  } catch (error) {
    console.warn("[medium] live feed unavailable, using snapshot:", error);
    return readSnapshot();
  }
}
