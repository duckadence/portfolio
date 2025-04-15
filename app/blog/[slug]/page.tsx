import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
	  <div class="flex flex-row justify-start my-2">
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
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
