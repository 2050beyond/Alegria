import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

// Only load TinaCMS admin when ?tina=1 query param is present
const TinaAdmin = dynamic(() => import('tinacms').then((mod) => mod.TinaAdmin), {
  ssr: false,
})

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tina?: string }>
}) {
  const params = await searchParams
  
  // Hide admin in production unless ?tina=1
  if (process.env.NODE_ENV === 'production' && params?.tina !== '1') {
    redirect('/')
  }

  return <TinaAdmin />
}

