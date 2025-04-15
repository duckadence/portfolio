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
            <div className="w-full grid grid-flow-col grid-rows-2 space-x-6">
			  <div className="row-span-2"><p className="text-neutral-500 dark:text-neutral-400 w-[69px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p></div>
              <div className="text-left"><p className="text-neutral-900 dark:text-neutral-100 w-screen tracking-tight">
                {post.metadata.title}
              </p></div>
			  <div className="flex flex-row justify-start h-fit">
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
