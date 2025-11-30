import { NextRequest, NextResponse } from 'next/server'

// This route is handled by NextAuth
// Redirect to NextAuth callback with tina=1 parameter
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const callbackUrl = searchParams.get('callbackUrl') || '/?tina=1'
  
  // NextAuth will handle the actual OAuth flow
  // This is just a redirect wrapper
  return NextResponse.redirect(new URL(`/api/auth/callback/github?${searchParams.toString()}`, request.url))
}

