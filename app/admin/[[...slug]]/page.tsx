'use client'

import dynamic from 'next/dynamic'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import config from '../../../tina/config'

// Only load TinaCMS admin when ?tina=1 query param is present
const TinaAdmin = dynamic(() => import('tinacms').then((mod) => mod.TinaAdmin), {
  ssr: false,
})

function AdminContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const tina = searchParams?.get('tina')
    
    // Hide admin in production unless ?tina=1
    if (process.env.NODE_ENV === 'production' && tina !== '1') {
      router.push('/')
    } else {
      setIsAllowed(true)
    }
  }, [searchParams, router])

  if (!isAllowed) {
    return null
  }

  return <TinaAdmin config={config} />
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  )
}

