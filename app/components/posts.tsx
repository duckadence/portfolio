import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-8"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full grid grid-rows-2 grid-flow-row gap-2">
              <div><p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p></div>
			  <div class="flex flex-row justify-start my">
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-400 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag1}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-400 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag2}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-400 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag3}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-400 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag4}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-400 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag5}
				</p>
		</div>
			  <div class="text-left row-span-2"><p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p></div>
            </div>
          </Link>
        ))}
    </div>
  )
}
