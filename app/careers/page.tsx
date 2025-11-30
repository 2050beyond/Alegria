import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Navigation } from '../components/Navigation'

const careersPath = path.join(process.cwd(), 'content/pages/careers.mdx')

export default async function Careers() {
  const fileContents = fs.readFileSync(careersPath, 'utf8')
  const { data, content } = matter(fileContents)

  return (
    <>
      <Navigation />
      <div className="container py-16">
        <article>
          <h1 className="text-[40px] md:text-[40px] font-semibold mb-12">
            {data.title || 'Careers'}
          </h1>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </>
  )
}
