'use client'

import { useSession, signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function EditButtonContent() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const tina = searchParams?.get('tina')
    setShowButton(tina === '1')
  }, [searchParams])

  if (!showButton) return null

  const handleClick = () => {
    if (status === 'unauthenticated') {
      const callbackUrl = `${pathname}?tina=1`
      signIn('github', { callbackUrl })
    } else {
      // Already authenticated, just enable editing
      window.location.href = `${pathname}?tina=1`
    }
  }

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      style={{ fontFamily: 'system-ui' }}
      aria-label="Edit this page"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  )
}

export function EditPencilButton() {
  return (
    <Suspense fallback={null}>
      <EditButtonContent />
    </Suspense>
  )
}

