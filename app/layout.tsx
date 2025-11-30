import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import TinaEditProvider from './components/TinaEditProvider'
import EditToggle from './components/EditToggle'

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
    <html lang="en">
      <body>
        <TinaEditProvider>
          <EditToggle />
          {children}
        </TinaEditProvider>
      </body>
    </html>
  )
}

