import Link from 'next/link'
import { getBlogPosts } from './lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A minimal, restrained blog with serious topics and thoughtful writing.',
}

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <div className="container py-16">
      <header className="mb-16">
        <h1 className="text-[40px] md:text-[40px] font-semibold mb-4">Blog</h1>
      </header>

      <main>
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-black pb-8 last:border-b-0">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-[40px] md:text-[40px] font-semibold mb-2 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <time className="text-sm block mb-4" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <p className="text-lg leading-relaxed" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

