import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getBlogPost, getAllPostSlugs } from '../../lib/posts'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { Navigation } from '../../components/Navigation'

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
      images: post.heroImage ? [post.heroImage] : [],
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

  const heroImage = post.heroImage || 'https://source.unsplash.com/1600x900/?minimal,calm,blackandwhite'

  return (
    <>
      <Navigation />
      <div className="pt-20">
        <div className="w-full -mx-4 md:-mx-8 mb-12 h-[50vh] relative">
          <Image
            src={heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            loading="eager"
            sizes="100vw"
          />
        </div>
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
            <Link href="/blog" className="hover:underline">
              ← Back to blog
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
