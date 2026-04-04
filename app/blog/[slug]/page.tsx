import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";

/**
 * 1. STATIC PARAMS GENERATION
 */
export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

/**
 * 2. METADATA GENERATION
 */
export function generateMetadata({ params }) {
  const post = getBlogPosts().find((p) => p.slug === params.slug);
  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * 3. HELPER COMPONENTS (Internal to file for cleanliness)
 */
function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="rounded-md border border-slate-300/30 bg-slate-200/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wider leading-none text-slate-600 dark:border-slate-700/30 dark:bg-slate-800/50 dark:text-slate-400">
      {tag}
    </span>
  );
}

/**
 * 4. MAIN BLOG COMPONENT
 */
export default function Blog({ params }) {
  const post = getBlogPosts().find((p) => p.slug === params.slug);

  if (!post) notFound();

  const tags = Array.isArray(post.metadata.tags) ? post.metadata.tags : [];

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    image: post.metadata.image
      ? `${baseUrl}${post.metadata.image}`
      : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${baseUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "My Portfolio",
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Section */}
      <header className="mb-8">
        <h1 className="title text-2xl font-bold tracking-tighter">
          {post.metadata.title}
        </h1>

        {/* Tags Row */}
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Date Row */}
        <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
        </div>
      </header>

      {/* Main Content */}
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
