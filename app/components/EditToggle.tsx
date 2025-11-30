'use client'

import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function EditToggleContent() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    const tina = searchParams?.get('tina')
    setIsEditMode(tina === '1')
  }, [searchParams])

  useEffect(() => {
    if (session && isEditMode && typeof window !== 'undefined') {
      // @ts-ignore
      if (window.tinacms) {
        // @ts-ignore
        window.tinacms.enable()
      }
    }
  }, [session, isEditMode])

  if (!isEditMode) return null

  return (
    <button
      onClick={() => {
        if (status === 'unauthenticated') {
          signIn('github', { callbackUrl: window.location.href })
        } else {
          // Already authenticated, enable editing
          // @ts-ignore
          if (window.tinacms) {
            // @ts-ignore
            window.tinacms.enable()
          }
        }
      }}
      className="fixed top-6 right-6 z-50 bg-black text-white px-5 py-3 text-sm font-medium hover:underline"
    >
      {session ? 'Start Editing' : 'Log in to Edit'}
    </button>
  )
}

export default function EditToggle() {
  return (
    <Suspense fallback={null}>
      <EditToggleContent />
    </Suspense>
  )
}


