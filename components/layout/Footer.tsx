import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Twitter, Facebook } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { services } from '@/data/services'

const companyLinks = [
  { label: 'About',          href: '/about' },
  { label: 'Case Studies',   href: '/case-studies' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Contact',        href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

const socialLinks = [
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter,   href: '#', label: 'Twitter'   },
  { Icon: Facebook,  href: '#', label: 'Facebook'  },
]

export function Footer() {
  return (
    <footer className="bg-text text-white pt-20 pb-10">
      <Container>
        {/* Top 4-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-xl p-2.5 inline-flex">
              <Image
                src="/images/alvisLogo.jpg"
                alt="Alvis"
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-body-lg font-display font-semibold text-white">
              Clarity. Strategy. Growth.
            </p>
            <p className="text-body-sm text-white/60 leading-relaxed">
              Premium digital marketing and IT services for companies that are serious about growth.
              Remote-first. Results-driven.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/60 hover:text-accent transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-label uppercase tracking-widest text-white/40 mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-body-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-label uppercase tracking-widest text-white/40 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-label uppercase tracking-widest text-white/40 mb-4">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@alvis.agency"
                className="text-body-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                hello@alvis.agency
              </a>
              <p className="text-body-sm text-white/60">Remote-first. Worldwide.</p>
              <Link
                href="/contact"
                className="text-body-sm text-accent hover:text-accent-dark transition-colors duration-200 mt-2 inline-flex items-center gap-1"
              >
                Start a Project →
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-white/40">
            © {new Date().getFullYear()} Alvis. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-body-sm text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-body-sm text-white/40 hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
