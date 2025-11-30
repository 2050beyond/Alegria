import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from './lib/posts'
import { Navigation } from './components/Navigation'

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <>
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-screen overflow-hidden">
        {posts.map((post) => {
          // Get hero image from post frontmatter or use default
          const heroImage = post.heroImage || 'https://source.unsplash.com/1600x900/?minimal,calm,blackandwhite'
          
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="relative group overflow-hidden h-full"
            >
              <Image
                src={heroImage}
                alt={post.title}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-[1.01] group-hover:brightness-110"
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <h2 className="text-[40px] font-semibold text-white text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {post.title}
                </h2>
              </div>
              <div className="absolute bottom-4 left-4">
                <time className="text-sm text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
