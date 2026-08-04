'use client'

import Link from 'next/link'

const logos = [
  { src: '/images/homepage/logo-boulevard.png',    alt: 'Boulevard',      cls: 'h-10' },
  { src: '/images/homepage/logo-depop.png',        alt: 'Depop',          cls: 'h-9' },
  { src: '/images/homepage/logo-eagleview-1.png',  alt: 'EagleView',       cls: 'h-10' },
  { src: '/images/homepage/logo-grailed.png',      alt: 'Grailed',        cls: 'h-9' },
  { src: '/images/homepage/logo-phorest.png',      alt: 'Phorest',        cls: 'h-9' },
  { src: '/images/homepage/logo-retool.png',       alt: 'Retool',         cls: 'h-9' },
  { src: '/images/homepage/logo-servicetitan_logo_black_2.png', alt: 'ServiceTitan', cls: 'h-10' },
  { src: '/images/homepage/logo-simpro.png',       alt: 'Simpro',         cls: 'h-9' },
  { src: '/images/homepage/logo-quoteiq.png',      alt: 'QuoteIQ',        cls: 'h-9' },
  { src: '/images/homepage/logo-images.png',       alt: 'Images',         cls: 'h-9' },
]

export function AboutHero() {
  return (
    <section className="pt-40 pb-24 px-5 md:px-8" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left copy */}
        <div className="lg:col-span-6 hero-anim">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-5" style={{ color: '#e63946' }}>
            About Alvis
          </span>

          <h1
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: '1.08', letterSpacing: '-0.04em', color: '#0d0d0d' }}
          >
            We Help Businesses<br />
            <span style={{ color: '#e63946' }}>Grow Faster.</span>
          </h1>

          <p className="mb-9" style={{ fontSize: '18px', lineHeight: '1.6', color: '#5b403f' }}>
            Creative strategies. Real results.<br />
            Long-term growth. Maximum impact.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-full text-white text-[13px] font-bold pl-7 pr-2 py-2 transition-transform hover:scale-[1.02]"
              style={{ background: '#e63946', boxShadow: '0 20px 40px -14px rgba(230,57,70,0.45)' }}
            >
              Get Free Consultation
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.22)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
            </Link>

            <Link
              href="/case-studies"
              className="flex items-center gap-3 rounded-full bg-white text-[13px] font-bold pl-7 pr-2 py-2 border transition-transform hover:scale-[1.02]"
              style={{ borderColor: '#f0dedd', color: '#0d0d0d', boxShadow: '0 10px 30px -18px rgba(0,0,0,0.35)' }}
            >
              View Our Work
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0d0d0d' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                  <path d="M6 4l14 8-14 8V4z" />
                </svg>
              </span>
            </Link>
          </div>

          <p className="text-[13px] font-bold mb-5" style={{ color: '#271717' }}>Trusted by 20+ brands</p>
          <div
            className="relative overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="flex gap-16 items-center w-max py-2" style={{ animation: 'logo-scroll 20s linear infinite' }}>
              {[...logos, ...logos].map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.cls} w-auto`}
                  loading="lazy"
                  decoding="async"
                  style={{ transition: 'transform 0.3s, filter 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.filter = 'brightness(1.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right illustration */}
        <div className="lg:col-span-6 hero-anim-fade" style={{ animationDelay: '0.15s' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/hero-illustration.png"
            alt="Alvis marketing growth illustration"
            className="w-full h-auto"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
