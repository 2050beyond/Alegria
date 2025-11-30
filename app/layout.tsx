import type { Metadata } from 'next'
import './globals.css'
import { ConditionalTinaProvider } from './components/TinaProvider'
import { EditButton } from './components/EditButton'
import { SaveButton } from './components/SaveButton'
import { WalkthroughModal } from './components/WalkthroughModal'
import { LastUpdatedFooter } from './components/LastUpdatedFooter'

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
        <ConditionalTinaProvider>
          <EditButton />
          <SaveButton />
          <WalkthroughModal />
          <LastUpdatedFooter />
          {children}
        </ConditionalTinaProvider>
      </body>
    </html>
  )
}

