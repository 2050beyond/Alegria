'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export function EditButton() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const editMode = searchParams?.get('tina') === '1' || 
                    searchParams?.get('tina') === 'true' || 
                    searchParams?.get('edit') === 'true' ||
                    (typeof window !== 'undefined' && window.localStorage.getItem('tina-edit-mode') === 'true')
    setIsEditMode(editMode)
  }, [searchParams])

  const handleEdit = () => {
    // Check for auth token in cookie
    const hasAuth = typeof document !== 'undefined' && 
                   document.cookie.includes('tina-token')
    
    if (!hasAuth) {
      router.push('/login')
      return
    }
    
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set('tina', '1')
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tina-edit-mode', 'true')
    }
    router.push(currentUrl.toString())
  }

  if (!isClient || isEditMode) {
    return null
  }

  return (
    <button
      onClick={handleEdit}
      className="fixed top-4 right-4 z-50 bg-black text-white px-4 py-2 text-sm hover:underline"
      style={{ fontFamily: 'system-ui' }}
    >
      Edit this page
    </button>
  )
}

