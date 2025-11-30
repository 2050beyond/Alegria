import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About this blog',
}

export default function About() {
  return (
    <div className="container py-16">
      <h1 className="text-[40px] md:text-[40px] font-semibold mb-8">About</h1>
      
      <div className="space-y-6">
        <p>
          This is a minimal blog. It exists to share thoughts on serious topics without distraction.
        </p>
        
        <p>
          We believe in restraint. In clarity. In the power of words without decoration.
        </p>
        
        <p>
          Every decision here is intentional. Every element serves a purpose. Nothing more, nothing less.
        </p>
        
        <p>
          If you find value in this approach, you are welcome here.
        </p>
      </div>
    </div>
  )
}

