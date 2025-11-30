'use client'

import { useEffect, useState } from 'react'

export function ConditionalTinaProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check for edit mode from URL or localStorage
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const editMode = urlParams.get('tina') === '1' || 
                      urlParams.get('tina') === 'true' || 
                      urlParams.get('edit') === 'true' ||
                      window.localStorage.getItem('tina-edit-mode') === 'true'
      setIsEditMode(editMode)
    }
  }, [])

  // Don't load TinaCMS in production unless explicitly in edit mode
  if (!isClient || !isEditMode) {
    return <>{children}</>
  }

  // For TinaCMS v2, the provider setup is handled differently
  // The admin route handles its own setup
  return <>{children}</>
}

