import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts, getAllTags, getTopics } from "@/lib/blog";
import { getExternalPosts } from "@/lib/medium";
import BlogIndex from "@/components/blog-index";
import ExternalWriting from "@/components/external-writing";
import { absoluteUrl, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Short, practical write-ups on the CSS and HTML problems that actually cost you an afternoon: stacking contexts, flex overflow, form validation, dialog focus, and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog by Rahul Mourya",
    description:
      "Practical CSS and HTML write-ups: each post fixes one problem you hit in real work.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
};

// Rebuilt daily so the Medium list stays current without a redeploy.
export const revalidate = 86400;

const BlogPage = async () => {
  const posts = getAllPosts();
  const topics = getTopics(posts);
  const tags = getAllTags(posts);
  const externalPosts = await getExternalPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: "Rahul Mourya's blog",
    description:
      "Practical CSS and HTML write-ups, each one fixing a problem developers actually hit.",
    url: absoluteUrl("/blog"),
    inLanguage: "en",
    author: { "@id": `${siteUrl}/#person` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
      keywords: post.tags.join(", "),
      author: { "@id": `${siteUrl}/#person` },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
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
        <h1 className="font-display text-4xl text-fg sm:text-5xl">Blog</h1>
        <p className="leading-7 text-fg-muted">
          One problem per post. Mostly CSS and HTML, always something that cost
          me time first, written in plain English with a working example you can
          paste into a file.
        </p>
      </header>

      <Suspense
        fallback={
          <p className="text-sm text-fg-subtle">Loading posts...</p>
        }
      >
        <BlogIndex posts={posts} topics={topics} tags={tags} />
      </Suspense>

      <ExternalWriting posts={externalPosts} />
    </div>
  );
};

export default BlogPage;
