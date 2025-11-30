'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import TinaProvider only when needed
const TinaProvider = dynamic(
  () => import('tinacms').then((mod) => mod.TinaProvider),
  { ssr: false }
)

export function ConditionalTinaProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
    const editMode = searchParams?.get('tina') === '1' || 
                    searchParams?.get('tina') === 'true' || 
                    searchParams?.get('edit') === 'true' ||
                    (typeof window !== 'undefined' && window.localStorage.getItem('tina-edit-mode') === 'true')
    setIsEditMode(editMode)
  }, [searchParams, pathname])

  // Don't load TinaCMS in production unless explicitly in edit mode
  if (!isClient || !isEditMode) {
    return <>{children}</>
  }

  return (
    <TinaProvider
      cmsCallback={(cms) => {
        // Hide the sidebar
        if (cms.sidebar) {
          cms.sidebar.hidden = true
        }
      }}
      branch={process.env.NEXT_PUBLIC_TINA_BRANCH || 'main'}
      clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ''}
      token={process.env.NEXT_PUBLIC_TINA_TOKEN || ''}
      isLocalClient={process.env.NODE_ENV === 'development'}
    >
      {children}
    </TinaProvider>
  )
}

