'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to GitHub OAuth
    const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ''
    const redirectUri = `${window.location.origin}/api/tina/callback`
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`
    
    window.location.href = githubAuthUrl
  }, [])

  return (
    <div className="container py-16">
      <p>Redirecting to GitHub...</p>
    </div>
  )
}

