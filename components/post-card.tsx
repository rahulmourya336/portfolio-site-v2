import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article className="card-hover group relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-2 text-xs text-fg-subtle">
        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">
          {post.topic}
        </span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-fg">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>

      <p className="text-sm leading-6 text-fg-muted">{post.description}</p>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {post.tags.slice(0, 4).map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs text-fg-subtle"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PostCard;
