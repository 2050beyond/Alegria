import { notFound } from 'next/navigation'
import { getBlogPost, getAllPostSlugs } from '../../lib/posts'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-16">
      <article>
        <header className="mb-12">
          <h1 className="text-[40px] md:text-[40px] font-semibold mb-4">
            {post.title}
          </h1>
          <time className="text-sm block" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>

        <div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <nav className="mt-16 pt-8 border-t border-black">
        <Link href="/" className="hover:underline">
          ← Back to blog
        </Link>
      </nav>
    </div>
  )
}

