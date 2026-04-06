import Link from "next/link";
import Image from "next/image";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts({
  limit,
  showViewAll = false,
}: {
  limit?: number;
  showViewAll?: boolean;
}) {
  const allBlogs = getBlogPosts();

  // 1. SORT AND FILTER LOGIC
  const posts = allBlogs
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
        ? -1
        : 1,
    )
    .slice(0, limit || allBlogs.length);

  return (
    <div className="flex flex-col">
      {posts.map((post) => {
        const tags = Array.isArray(post.metadata.tags)
          ? post.metadata.tags
          : [];

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col mb-8 last:mb-0"
          >
            {/* GRID LAYOUT: items-baseline ensures the date and first line of title sit on the same line */}
            <div className="grid grid-cols-[80px_1fr] gap-x-7 items-baseline">
              {/* DATE: Dimmed slate color, small text, tabular numbers for grid alignment */}
              <span className="text-sm tabular-nums text-slate-400 dark:text-slate-500 transition-colors">
                {formatDate(post.metadata.publishedAt, false)}
              </span>

              <div className="flex flex-col gap-2">
                {/* PROJECT TITLE: Surgical underline and blue tint on hover */}
                <h3 className="transition-all duration-200">
                  <span className="post-title">{post.metadata.title}</span>
                </h3>

                {/* TAGS: Micro-labels with subtle borders */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-300/30 dark:border-slate-700/30 bg-slate-200/50 dark:bg-slate-800/40 px-2 py-0.5 text-[10px] font-medium uppercase leading-none tracking-wider text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* FEATURED IMAGE: Only shows if it exists and we aren't in "view all" mode */}
                {post.metadata.image && !showViewAll && (
                  <div className="relative mt-2 aspect-video w-full overflow-hidden">
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}

      {showViewAll && (
        <div className="mt-8 flex justify-end">
          <Link href="/blog" className="see-all-link text-sm">
            See All Projects →
          </Link>
        </div>
      )}
    </div>
  );
}
