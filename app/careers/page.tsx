import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Career opportunities',
}

export default function Careers() {
  return (
    <div className="container py-16">
      <h1 className="text-[40px] md:text-[40px] font-semibold mb-8">Careers</h1>
      
      <div className="space-y-6">
        <p>
          We are not currently hiring. This page exists as a placeholder for future opportunities.
        </p>
        
        <p>
          When positions become available, they will be listed here with clear descriptions and requirements.
        </p>
        
        <p>
          We value clarity, competence, and commitment. If you share these values, check back periodically.
        </p>
      </div>
    </div>
  )
}

