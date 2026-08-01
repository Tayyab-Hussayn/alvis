'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Services',     href: '/services' },
  { label: 'Work',         href: '/case-studies' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 flex justify-between items-center px-8 py-3 rounded-full transition-all duration-300"
        style={{
          maxWidth: '1280px',
          background: scrolled ? '#ffffff' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: scrolled ? '0 20px 40px -8px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.06)',
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Alvis - Home" className="flex items-center gap-2 group cursor-pointer">
          <img
            src="/images/alvisLogo.jpg"
            alt="ALVIS"
            style={{ height: '33.6px', width: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[12px] font-bold tracking-[0.1em] uppercase transition-colors"
              style={{ color: pathname === link.href ? '#b7102a' : '#5b403f' }}
              onMouseEnter={e => { if (pathname !== link.href) e.currentTarget.style.color = '#b7102a' }}
              onMouseLeave={e => { if (pathname !== link.href) e.currentTarget.style.color = '#5b403f' }}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#b7102a' }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="/contact"
            className="hidden lg:flex items-center text-white text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
            style={{ background: '#b7102a' }}
          >
            Get Free Consultation
          </a>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ color: '#271717' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        pathname={pathname}
      />
    </>
  )
}
