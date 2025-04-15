import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'projects',
  description: 'See my projects',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Projects</h1>
      <BlogPosts />
    </section>
  )
}
