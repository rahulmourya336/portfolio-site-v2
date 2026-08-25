import type { ExternalPost } from "@/lib/medium";
import { Reveal } from "./reveal";
import { IconExternalLink, IconMedium } from "./icons";
import { site } from "@/lib/site";

const formatDate = (value: string) =>
  value
    ? new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

const ExternalWriting = ({ posts }: { posts: ExternalPost[] }) => {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="external-heading" className="mt-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="external-heading"
            className="font-display text-3xl text-fg"
          >
            Published elsewhere
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Posts that live on Medium. They open in a new tab.
          </p>
        </div>
        <a
          href={site.mediumProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
        >
          <IconMedium aria-hidden="true" />
          All posts on Medium
          <IconExternalLink className="text-xs" aria-hidden="true" />
        </a>
      </div>

      <ul className="flex flex-col divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <li key={post.url}>
            <Reveal>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 py-5 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-fg-subtle">
                  <span className="rounded-full border border-border px-2 py-0.5">
                    {post.source}
                  </span>
                  {post.date && (
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  )}
                </div>
                <h3 className="flex items-start gap-1.5 text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
                  {post.title}
                  <IconExternalLink
                    className="mt-1 flex-shrink-0 text-sm opacity-50"
                    aria-hidden="true"
                  />
                </h3>
                {post.excerpt && (
                  <p className="text-sm leading-6 text-fg-muted">{post.excerpt}</p>
                )}
                {post.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-fg-subtle"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExternalWriting;
