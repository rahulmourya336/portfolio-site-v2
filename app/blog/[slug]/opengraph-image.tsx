import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export const alt = "Blog post by Rahul Mourya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #08080b 0%, #191033 55%, #08080b 100%)",
          padding: "72px",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <span
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 999,
              background: "#2b1f57",
              color: "#c4b5fd",
            }}
          >
            {post?.topic ?? "Notes"}
          </span>
          <span style={{ color: "#8a8a9a" }}>
            {post ? `${post.readingMinutes} min read` : ""}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: post && post.title.length > 60 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.12,
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "Blog"}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#a8a8b6",
          }}
        >
          <span>Rahul Mourya</span>
          <span style={{ color: "#a78bfa" }}>
            {site.url.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
