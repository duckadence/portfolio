import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Jonathan
      </h1>
      <p className="mb-4">
        {`Welcome to my site!  I make stuff using microcontrollers, 3d printing, and electronics.`}
      </p>
      <div className="my-8">
        <BlogPosts limit={3} showViewAll />
      </div>
    </section>
  );
}
