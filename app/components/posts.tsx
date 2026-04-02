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
      if (
        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ) {
        return -1
      }
      return 1
    })
    .slice(0, limit || allBlogs.length) // 👈 key line

  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col gap-2 mb-10"
          href={`/blog/${post.slug}`}
        >
         <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-x-6">

			  <p className="row-span-2 text-neutral-500 dark:text-neutral-400 w-[80px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>

              <p className="text-neutral-900 dark:text-neutral-100 w-full tracking-tight">
                {post.metadata.title}
              </p>

			  <div className="flex flex-wrap justify-start gap-x-0.5 gap-y-1.5 mt-1 h-fit">
				<p className="empty:hidden whitespace-nowrap text-neutral-899 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag1}
				</p>
				<p className="empty:hidden whitespace-nowrap text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag2}
				</p>
				<p className="empty:hidden whitespace-nowrap text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag3}
				</p>
				<p className="empty:hidden whitespace-nowrap text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag4}
				</p>
				<p className="empty:hidden whitespace-nowrap text-neutral-900 dark:text-neutral-100 tracking-tight bg-neutral-300 dark:bg-neutral-700 rounded-md mr-1 pb-0.5 px-1">
                {post.metadata.tag5}
				</p>
			  </div>
			  <div></div>

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
        </Link>
      ))}

      {/* 👇 only show when enabled */}
      {showViewAll && (
        <div className="mt-4">
          <Link
            href="/blog"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            See all posts →
          </Link>
        </div>
      )}
    </div>
  )
}
