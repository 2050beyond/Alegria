// This route is now handled by NextAuth
// Keeping for backwards compatibility but redirecting to NextAuth
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Redirect to NextAuth callback
  return NextResponse.redirect(new URL('/api/auth/callback/github', request.url))
}


