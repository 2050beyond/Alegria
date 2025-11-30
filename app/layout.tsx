import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Minimal Restrained Blog',
  description: 'A minimal, restrained blog with serious topics and thoughtful writing.',
  openGraph: {
    title: 'Minimal Restrained Blog',
    description: 'A minimal, restrained blog with serious topics and thoughtful writing.',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}

