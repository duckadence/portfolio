import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import Image from "next/image"


export function BlogPosts({ limit, showViewAll = false }: {
  limit?: number
  showViewAll?: boolean
}) {
  let allBlogs = getBlogPosts()
  const posts = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .slice(0, limit || allBlogs.length)

  return (
    <div>
      {posts.map((post) => {
        const tags = Array.isArray(post.metadata.tags) ? post.metadata.tags : []

        return (
          <Link
            key={post.slug}
            className="flex flex-col mb-7 group"
            href={`/blog/${post.slug}`}
          >
            <div className="grid grid-cols-[80px_1fr] gap-x-6">
              {/* Column 1: Date */}
              <p className="text-neutral-500 dark:text-neutral-400 tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>

              {/* Column 2: Content Stack */}
              <div className="flex flex-col gap-2">
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </p>

                <div className="flex flex-wrap gap-x-1 gap-y-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-300 dark:bg-neutral-700 rounded-md px-1 pb-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {post.metadata.image && !showViewAll && (
                  <div className="relative w-full aspect-video overflow-hidden mt-2">
                    <Image
                      src={post.metadata.image}
                      alt={post.metadata.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}

      {showViewAll && (
        <div className="mt-4">
          <Link
            href="/blog"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            See all projects →
          </Link>
        </div>
      )}
    </div>
  )
}
