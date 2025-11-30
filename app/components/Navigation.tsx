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
    <nav className="border-b border-black mb-16">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-6 md:gap-8">
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
    </nav>
  )
}

