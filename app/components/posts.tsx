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
            <div className="w-max grid grid-flow-col grid-rows-2 space-x-6">
			  <p className="row-span-2 text-neutral-500 dark:text-neutral-400 w-[80px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 w-[60vw] tracking-tight">
                {post.metadata.title}
              </p>
			  <div className="flex flex-row justify-start mt-1 h-fit">
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag1}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag2}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag3}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag4}
				</p>
				<p className="empty:hidden text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag5}
				</p>
			  </div>
			</div>
          </Link>
        ))}
    </div>
  )
}
