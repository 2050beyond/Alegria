'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
      <div className="container py-4 md:py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold hover:underline">
            Minimal Blog
          </Link>
          <div className="flex gap-4 md:gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href || 
                              (link.href === '/blog' && pathname?.startsWith('/blog/'))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg ${
                    isActive ? 'underline' : 'hover:underline'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
