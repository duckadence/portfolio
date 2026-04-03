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
            <div className="grid grid-cols-[80px_1fr] gap-x-7">
              <p className="text-neutral-500 dark:text-neutral-400 tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>

              <div className="flex flex-col gap-1">
                {/* POST TITLE: Added underline, transition, and background tint on group-hover */}
              <p className="!text-slate-900 dark:!text-slate-100 transition-all duration-200 
  /* Hover colors */
  group-hover:!text-[#0070f3] dark:group-hover:!text-[#3291ff]
  group-hover:bg-[#0070f3]/10 dark:group-hover:bg-[#3291ff]/15
  
  /* Reset spacing to 0 */
  px-0 m-0 rounded-none
  
  /* Underline */
  underline decoration-[#0070f3] dark:decoration-[#3291ff] underline-offset-4 decoration-[1px] 
  font-medium w-fit">
  {post.metadata.title}
</p>
               <div className="flex flex-wrap justify-start gap-x-1 gap-y-1.5 mt-1.5">
  {tags.map((tag) => (
    <span
      key={tag}
      className="!bg-slate-200/50 dark:!bg-slate-800/40 
                 !text-slate-600 dark:!text-slate-400 
                 border border-slate-300/30 dark:border-slate-700/30
                 rounded-md px-2 py-1 text-[10px] uppercase tracking-wider leading-none font-medium"
    >
      {tag}
    </span>
  ))}
</div>
                {post.metadata.image && !showViewAll && (
                  <div className="relative w-full aspect-video overflow-hidden mt-1.5">
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
        <div className="flex justify-end mt-7">
          <Link
            href="/blog"
            /* VIEW ALL BUTTON: Now matches your global link styling */
            className="transition-all decoration-[#0070f3] dark:decoration-[#3291ff] underline-offset-4 decoration-[1px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-[#0070f3] dark:hover:text-[#3291ff] hover:bg-[#0070f3]/5 underline lowercase tracking-tight"
          >
            see all projects →
          </Link>
        </div>
      )}
    </div>
  )
}
