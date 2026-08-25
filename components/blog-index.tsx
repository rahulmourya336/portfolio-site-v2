"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PostMeta } from "@/lib/blog";
import PostCard from "./post-card";
import { IconSearch, IconClose } from "./icons";

type Props = {
  posts: PostMeta[];
  topics: string[];
  tags: string[];
};

const BlogIndex = ({ posts, topics, tags }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [topic, setTopic] = useState(searchParams.get("topic") ?? "");
  const [tag, setTag] = useState(searchParams.get("tag") ?? "");
  const [allTagsShown, setAllTagsShown] = useState(false);

  const TAG_PREVIEW = 12;
  // Tags arrive sorted by how often they are used, so the first dozen are the
  // useful ones. The rest stay one click away instead of filling the screen.
  const visibleTags = allTagsShown ? tags : tags.slice(0, TAG_PREVIEW);

  // Keep the URL in step with the filters so a filtered view can be shared.
  // Debounced because typing should not push a history entry per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (topic) params.set("topic", topic);
      if (tag) params.set("tag", tag);
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 250);
    return () => clearTimeout(timer);
  }, [query, topic, tag, pathname, router]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (topic && post.topic !== topic) return false;
      if (tag && !post.tags.includes(tag)) return false;
      if (!needle) return true;
      const haystack = [
        post.title,
        post.description,
        post.topic,
        ...post.tags,
      ]
        .join(" ")
        .toLowerCase();
      return needle.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [posts, query, topic, tag]);

  const hasFilters = Boolean(query || topic || tag);

  const clear = () => {
    setQuery("");
    setTopic("");
    setTag("");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <IconSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle"
            aria-hidden="true"
          />
          <label htmlFor="post-search" className="sr-only">
            Search posts
          </label>
          <input
            id="post-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts, for example flexbox or forms"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-fg-subtle">
            Topic
          </span>
          {topics.map((item) => (
            <button
              key={item}
              onClick={() => setTopic(item === topic ? "" : item)}
              aria-pressed={item === topic}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                item === topic
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-fg-muted hover:border-accent/40 hover:text-fg"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-fg-subtle">
            Tag
          </span>
          {visibleTags.map((item) => (
            <button
              key={item}
              onClick={() => setTag(item === tag ? "" : item)}
              aria-pressed={item === tag}
              className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                item === tag
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-fg-subtle hover:border-accent/40 hover:text-fg"
              }`}
            >
              {item}
            </button>
          ))}
          {tags.length > TAG_PREVIEW && (
            <button
              onClick={() => setAllTagsShown((shown) => !shown)}
              aria-expanded={allTagsShown}
              className="rounded-full px-2.5 py-0.5 text-xs text-accent hover:underline"
            >
              {allTagsShown
                ? "Show fewer tags"
                : `Show all ${tags.length} tags`}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-y border-border py-3">
        <p className="text-sm text-fg-muted" aria-live="polite">
          {results.length} {results.length === 1 ? "post" : "posts"}
          {hasFilters ? " match your filters" : ""}
        </p>
        {hasFilters && (
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            <IconClose className="text-xs" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      <h2 className="sr-only">Posts on this site</h2>

      {results.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-fg-muted">
          Nothing matches that yet. Try a broader word, like <code>grid</code>{" "}
          or <code>forms</code>.
        </p>
      ) : (
        <ul
          key={`${topic}-${tag}-${query ? "q" : ""}`}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {results.map((post, index) => (
            <li
              key={post.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(index, 6) * 30}ms` }}
            >
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogIndex;
