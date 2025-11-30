import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  heroImage?: string
}

export async function getBlogPosts(): Promise<Omit<BlogPost, 'content'>[]> {
  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || content.split('\n').slice(0, 2).join(' ').substring(0, 150),
        heroImage: data.heroImage || undefined,
      }
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
      heroImage: data.heroImage || undefined,
    }
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const filenames = fs.readdirSync(postsDirectory)
  return filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => filename.replace(/\.mdx$/, ''))
}

