'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function LastUpdatedFooter() {
  const searchParams = useSearchParams()
  const [isEditMode, setIsEditMode] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<{ author: string; date: string } | null>(null)

  useEffect(() => {
    const editMode = searchParams?.get('tina') === '1' || 
                    searchParams?.get('tina') === 'true' || 
                    searchParams?.get('edit') === 'true' ||
                    (typeof window !== 'undefined' && window.localStorage.getItem('tina-edit-mode') === 'true')
    setIsEditMode(editMode)

    if (editMode && typeof window !== 'undefined') {
      // Get last commit info from localStorage
      const lastCommit = window.localStorage.getItem('tina-last-commit')
      if (lastCommit) {
        try {
          const commit = JSON.parse(lastCommit)
          setLastUpdated({
            author: commit.author || 'Editor',
            date: new Date(commit.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          })
        } catch (e) {
          // Ignore
        }
      } else {
        // Default to current date if no commit info
        setLastUpdated({
          author: 'Editor',
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        })
      }
    }
  }, [searchParams])

  if (!isEditMode || !lastUpdated) return null

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-black p-2 text-xs text-center z-40" style={{ fontFamily: 'system-ui' }}>
      Last updated by {lastUpdated.author} on {lastUpdated.date}
    </footer>
  )
}

