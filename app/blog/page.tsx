import Link from 'next/link'
import { getBlogPosts } from '../lib/posts'
import { Navigation } from '../components/Navigation'

export default async function BlogIndex() {
  const posts = await getBlogPosts()

  return (
    <>
      <Navigation />
      <div className="container py-16">
        <h1 className="text-[40px] md:text-[40px] font-semibold mb-12">
          Blog
        </h1>
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-[32px] md:text-[40px] font-semibold mb-2 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <time className="text-sm block mb-3" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <p className="text-lg leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

