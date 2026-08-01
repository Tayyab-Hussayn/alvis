'use client'

import Link from 'next/link'

const logos = [
  { src: '/images/homepage/logo-airbnb.webp',   alt: 'Airbnb',    cls: 'h-8' },
  { src: '/images/homepage/logo-google.webp',    alt: 'Google',    cls: 'h-6' },
  { src: '/images/homepage/logo-amazon.webp',    alt: 'Amazon',    cls: 'h-8' },
  { src: '/images/homepage/logo-anthropic.webp', alt: 'Anthropic', cls: 'h-7' },
  { src: '/images/homepage/logo-chatgpt.webp',   alt: 'ChatGPT',   cls: 'h-7' },
]

export function Hero() {
  return (
    <header
      className="relative pt-40 pb-[160px] px-5 md:px-8 overflow-hidden"
      style={{ background: 'radial-gradient(circle at 70% 30%, rgba(183,16,42,0.08), transparent 50%), #fff8f7' }}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* Left copy */}
        <div className="lg:col-span-6 z-10 hero-anim">
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] tracking-widest font-bold uppercase mb-6" style={{ background: '#ffe9e8', color: '#b7102a' }}>
            DIGITAL MARKETING THAT DELIVERS
          </span>

          <h1
            className="font-display font-extrabold mb-6 max-w-xl"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: '1.1', letterSpacing: '-0.04em', color: '#271717' }}
          >
            We Don&apos;t Just<br />
            Market Brands.<br />
            <span style={{ color: '#b7102a' }}>We Grow Them.</span>
          </h1>

          <p className="mb-10 max-w-lg" style={{ fontSize: '18px', lineHeight: '1.6', color: '#5b403f' }}>
            Data-driven strategies. Creative content. Real results that scale your business with mathematical precision and creative flair.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-full text-white text-[12px] font-bold tracking-[0.1em] uppercase pl-8 pr-2 py-2 transition-all hover:scale-[1.02]"
              style={{ background: '#b7102a', boxShadow: '0 0 0 0 transparent', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(183,16,42,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 transparent')}
            >
              Get Free Consultation
              <span className="p-2 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>

            <Link
              href="/case-studies"
              className="flex items-center gap-3 border-2 text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-full transition-all"
              style={{ borderColor: '#e4bebc', color: '#271717' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#b7102a')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4bebc')}
            >
              View Our Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            </Link>
          </div>

          {/* Logo scroll */}
          <div className="mt-16">
            <p className="mb-6 text-[12px] tracking-[0.1em] font-bold uppercase" style={{ color: '#8f6f6e' }}>
              Trusted by 100+ brands
            </p>
            <div
              className="relative overflow-hidden"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
            >
              <div className="flex gap-16 items-center w-max py-4" style={{ animation: 'logo-scroll 20s linear infinite' }}>
                {[...logos, ...logos].map((logo, i) => (
                  <img key={i} src={logo.src} alt={logo.alt} className={`${logo.cls} w-auto grayscale opacity-40`}
                    loading="lazy" decoding="async"
                    style={{ transition: 'filter 0.3s, opacity 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = '0.4' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end hero-anim-fade" style={{ animationDelay: '0.15s' }}>
          <div className="relative w-full max-w-lg" style={{ animation: 'hero-float 6s ease-in-out infinite' }}>
            <img
              src="/images/homepage/hero-phone.webp"
              alt="Alvis Marketing Dashboard"
              className="w-full h-auto"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />

            {/* Revenue card */}
            <div
              className="absolute -top-6 -left-6 p-4 rounded-2xl shadow-lg flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(119,193,193,0.2)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#77C1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase" style={{ color: '#8f6f6e' }}>Revenue</p>
                <p className="text-[16px] font-bold" style={{ color: '#271717' }}>+24.8%</p>
              </div>
            </div>

            {/* Engagement card */}
            <div
              className="absolute bottom-10 -right-4 p-4 rounded-2xl shadow-lg flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(183,16,42,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#b7102a">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase" style={{ color: '#8f6f6e' }}>Engagement</p>
                <p className="text-[16px] font-bold" style={{ color: '#271717' }}>12.5K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
