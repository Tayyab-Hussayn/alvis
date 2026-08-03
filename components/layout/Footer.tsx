import Link from 'next/link'

const quickLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work',     href: '/case-studies' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
]

const serviceLinks = [
  'Social Media Marketing',
  'SEO Services',
  'Paid Advertising',
  'Branding & Design',
  'Content Marketing',
]

const socials = [
  { label: 'Facebook',  path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM17.8 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
  { label: 'LinkedIn',  path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
  { label: 'X',         path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z' },
  { label: 'YouTube',   path: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z' },
]

const contact = [
  {
    lines: ['hello@alvis.agency', 'info@alvismarketing.com'],
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
  },
  {
    lines: ['(571) 207-8314'],
    icon: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
  },
  {
    lines: ['South Plainfield, NJ 07080', 'United States'],
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
]

function LogoMark() {
  return (
    <span className="flex items-center gap-4">
      <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
        <path d="M16 2 2 26h9l5-8.5 5 8.5h9L16 2z" fill="#e63946" />
        <path d="M11 26l5-8.5 5 8.5H11z" fill="#0a1b3d" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display font-black tracking-[0.16em] text-[28px]" style={{ color: '#0d0d0d' }}>ALVIS</span>
        <span className="text-[9px] font-bold tracking-[0.22em] uppercase mt-1" style={{ color: '#8f6f6e' }}>Marketing Agency</span>
      </span>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-5 md:px-8" style={{ background: '#fff8f7', borderTop: '1px solid #f3dedd' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10">

          {/* Brand */}
          <div>
            <LogoMark />
            <p className="mt-5 mb-5 text-[13px]" style={{ lineHeight: '1.6', color: '#5b403f' }}>
              We help brands grow with creative strategies, smart marketing and measurable results.
            </p>
            <div className="flex items-center gap-4">
              {socials.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="transition-colors hover:text-[#e63946]"
                  style={{ color: '#271717' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(228,190,188,0.4)' }}>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] mb-5" style={{ color: '#0d0d0d' }}>Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-[#e63946]" style={{ color: '#5b403f' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(228,190,188,0.4)' }}>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] mb-5" style={{ color: '#0d0d0d' }}>Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(s => (
                <li key={s}>
                  <Link href="/services" className="text-[13px] transition-colors hover:text-[#e63946]" style={{ color: '#5b403f' }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(228,190,188,0.4)' }}>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] mb-5" style={{ color: '#0d0d0d' }}>Contact Us</h4>
            <ul className="space-y-4">
              {contact.map(c => (
                <li key={c.lines[0]} className="flex items-start gap-3">
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e63946"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    className="mt-[2px] shrink-0"
                  >
                    {c.icon}
                  </svg>
                  <span className="text-[13px]" style={{ lineHeight: '1.5', color: '#5b403f' }}>
                    {c.lines.map(line => <span key={line} className="block">{line}</span>)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-8 lg:border-l" style={{ borderColor: 'rgba(228,190,188,0.4)' }}>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] mb-5" style={{ color: '#0d0d0d' }}>Newsletter</h4>
            <p className="text-[13px] mb-5" style={{ lineHeight: '1.6', color: '#5b403f' }}>
              Subscribe to get the latest updates and marketing tips.
            </p>
            <form className="relative">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full bg-white pl-5 pr-14 py-3 text-[13px] outline-none"
                style={{ border: '1px solid #f3dedd', color: '#271717' }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: '#e63946' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(228,190,188,0.4)' }}
        >
          <p className="text-[12px]" style={{ color: '#8f6f6e' }}>
            © 2024 ALVIS Marketing Agency. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[12px] transition-colors hover:text-[#e63946]" style={{ color: '#8f6f6e' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[12px] transition-colors hover:text-[#e63946]" style={{ color: '#8f6f6e' }}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
