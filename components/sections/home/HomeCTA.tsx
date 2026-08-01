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
              <a href="tel:+15551234567" className="flex items-center gap-4 group cursor-pointer">
                <div
                  className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                  style={{ background: '#485f84' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.77a16 16 0 006.29 6.29l1.29-1.29a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.07z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#8f6f6e' }}>CALL US NOW</p>
                  <p className="text-[16px] font-bold" style={{ color: '#271717' }}>+1 (555) 123-4567</p>
                </div>
              </a>
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
