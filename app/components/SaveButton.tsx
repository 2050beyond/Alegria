'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

const useCMS = dynamic(
  () => import('tinacms').then((mod) => mod.useCMS),
  { ssr: false }
)

export function SaveButton() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSaving, setIsSaving] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [cms, setCms] = useState<any>(null)

  useEffect(() => {
    const editMode = searchParams?.get('tina') === '1' || 
                    searchParams?.get('tina') === 'true' || 
                    searchParams?.get('edit') === 'true' ||
                    (typeof window !== 'undefined' && window.localStorage.getItem('tina-edit-mode') === 'true')
    setIsEditMode(editMode)

    if (editMode && typeof window !== 'undefined') {
      // Dynamically import and get CMS instance
      import('tinacms').then((mod) => {
        try {
          const cmsInstance = mod.useCMS()
          setCms(cmsInstance)
        } catch (e) {
          // CMS not ready yet
        }
      })
    }
  }, [searchParams])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Commit to GitHub
      // Get current page name for commit message
      const pageName = typeof window !== 'undefined' ? window.location.pathname : 'content'
      const pageType = pageName.includes('/blog/') ? 'post' : 'page'
      
      const response = await fetch('/api/tina/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Updated ${pageType} via TinaCMS`,
          pageName: pageName,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Store last commit info
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('tina-last-commit', JSON.stringify({
            author: 'Editor',
            date: new Date().toISOString(),
          }))
        }

        // Remove edit mode
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('tina-edit-mode')
        }
        
        router.push(window.location.pathname)
        alert('Saved and published! Your changes will be live in a few minutes.')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Error saving. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isEditMode) {
    return null
  }

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className="fixed bottom-4 right-4 z-50 bg-black text-white px-6 py-3 font-semibold hover:underline disabled:opacity-50"
      style={{ fontFamily: 'system-ui' }}
    >
      {isSaving ? 'Saving...' : 'Save & Publish'}
    </button>
  )
}

