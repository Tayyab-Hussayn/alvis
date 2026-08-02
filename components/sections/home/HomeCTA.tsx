'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/components/animations/useScrollReveal'

export function HomeCTA() {
  const cardRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-[160px] px-5 md:px-8">
      <div
        ref={cardRef}
        className="max-w-[1280px] mx-auto rounded-[48px] overflow-hidden relative border"
        style={{ background: '#ffe9e8', borderColor: 'rgba(255,255,255,0.5)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <span className="block mb-6 text-[12px] font-bold tracking-[0.1em] uppercase" style={{ color: '#b7102a' }}>
              LET&apos;S GROW TOGETHER
            </span>
            <h2 className="font-display font-bold mb-8" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: '1.2', letterSpacing: '-0.02em', color: '#271717' }}>
              Ready to Take Your Business to the{' '}
              <span style={{ color: '#b7102a' }}>Next Level?</span>
            </h2>
            <p className="mb-12" style={{ fontSize: '18px', lineHeight: '1.6', color: '#5b403f' }}>
              Book a free consultation call with our experts and let&apos;s discuss how we can grow your business through strategic marketing.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-3 text-white text-[12px] font-bold tracking-[0.1em] uppercase pl-10 pr-4 py-4 rounded-full transition-all"
                style={{ background: '#b7102a' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(183,16,42,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                Get Free Consultation
                <span className="p-2 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center p-12 md:p-20 relative" style={{ background: 'rgba(183,16,42,0.05)' }}>
            <div className="relative w-full max-w-sm" style={{ animation: 'hero-float 6s ease-in-out infinite' }}>
              <img
                src="/images/homepage/cta-illustration.webp"
                alt="Target illustration"
                className="w-full h-auto drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(183,16,42,0.1), transparent)' }}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
