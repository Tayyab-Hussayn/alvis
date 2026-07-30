'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'About',        href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
]

const darkHeroRoutes = ['/about']

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled]         = useState(false)
  const [visible, setVisible]           = useState(true)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const lastScrollY                     = useRef(0)

  const darkHero = !scrolled && darkHeroRoutes.includes(pathname)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastScrollY.current

      setScrolled(y > 80)
      if (y < 80) {
        setVisible(true)
      } else if (goingDown) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'bg-transparent',
          visible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <Container className="h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Alvis - Home" className="flex-shrink-0 relative z-10">
            <div className={cn(
              'transition-all duration-300',
              darkHero && 'bg-white rounded-xl px-2 py-1',
            )}>
              <Image
                src="/images/alvisLogo.jpg"
                alt="Alvis"
                width={200}
                height={200}
                priority
                className="w-16 h-16 md:w-20 md:h-20 object-contain scale-[1.6] origin-left"
              />
            </div>
          </Link>

          {/* Desktop Nav — centered absolutely */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-display text-body-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-accent'
                    : darkHero
                      ? 'text-white/80 hover:text-white'
                      : 'text-text hover:text-accent',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex relative z-10">
            <Button href="/contact" variant="primary" size="sm">
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={cn('md:hidden relative z-10 p-2', darkHero ? 'text-white' : 'text-text')}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </Container>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        pathname={pathname}
      />
    </>
  )
}
