'use client'

import { useState, useEffect } from 'react'

export function WalkthroughModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenWalkthrough = typeof window !== 'undefined' && 
                               window.localStorage.getItem('tina-walkthrough-seen') === 'true'
    
    if (!hasSeenWalkthrough) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tina-walkthrough-seen', 'true')
    }
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full p-8 space-y-6" style={{ fontFamily: 'system-ui' }}>
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Editor</h2>
        
        <div className="space-y-4 text-lg leading-relaxed">
          <p><strong>1. Click any text</strong> to edit it directly on the page</p>
          <p><strong>2. Use the toolbar</strong> for Bold, Italic, Links, Images, and Videos</p>
          <p><strong>3. Drag and drop</strong> images anywhere on the page</p>
          <p><strong>4. Click "Save & Publish"</strong> when done — your changes go live automatically</p>
          <p><strong>5. New blog post?</strong> Click "+ New Post" in the top menu</p>
        </div>

        <div className="pt-4 border-t border-black">
          <button
            onClick={handleClose}
            className="bg-black text-white px-6 py-2 hover:underline"
          >
            Got it, let's start editing
          </button>
        </div>
      </div>
    </div>
  )
}

