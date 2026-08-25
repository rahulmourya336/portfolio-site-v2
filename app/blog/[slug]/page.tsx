import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import PostCard from "@/components/post-card";
import { absoluteUrl, site, siteUrl } from "@/lib/site";
import { IconRightArrow } from "@/components/icons";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteUrl],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const PostPage = async ({ params }: Params) => {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    keywords: post.tags.join(", "),
    articleSection: post.topic,
    wordCount: post.html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length,
    timeRequired: `PT${post.readingMinutes}M`,
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbJsonLd]),
        }}
      />

      <article className="wrapper">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-fg-subtle transition-colors hover:text-accent"
          >
            ← All posts
          </Link>
        </nav>

        <header className="mb-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
            <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
              {post.topic}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h1 className="text-balance font-display text-4xl leading-tight text-fg sm:text-5xl">
            {post.title}
          </h1>

          <p className="text-lg leading-8 text-fg-muted">{post.description}</p>

          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-block rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs text-fg-subtle transition-colors hover:border-accent/40 hover:text-fg"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </header>

        {post.headings.length > 2 && (
          <nav
            aria-label="On this page"
            className="mb-10 rounded-2xl border border-border bg-surface p-5"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
              On this page
            </h2>
            <ol className="flex flex-col gap-2">
              {post.headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div
          className="prose prose-post max-w-none prose-headings:font-semibold prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-lg prose-pre:text-[13px]"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <p className="text-sm leading-6 text-fg-muted">
            Written by {site.name}, full stack engineer. Spotted a mistake or
            want the follow-up post?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline underline-offset-2"
            >
              Email me
            </a>
            .
          </p>
        </footer>
      </article>

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="wrapper-wide mt-16"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 id="related-heading" className="font-display text-2xl text-fg">
              Keep reading
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              All posts <IconRightArrow className="text-xs" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <PostCard post={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default PostPage;
