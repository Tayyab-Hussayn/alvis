'use client'

import Link from 'next/link'

export function CaseStudiesHero() {
  return (
    <section className="pt-40 pb-16 px-5 md:px-8" style={{ background: '#FDF0EE' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-5 hero-anim">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-5" style={{ color: '#e63946' }}>
            Case Studies
          </span>

          <h1
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.7rem)', lineHeight: '1.08', letterSpacing: '-0.04em', color: '#0d0d0d' }}
          >
            Real Results.<br />
            Real <span style={{ color: '#e63946' }}>Impact.</span>
          </h1>

          <p className="mb-9 max-w-md" style={{ fontSize: '16px', lineHeight: '1.65', color: '#5b403f' }}>
            Discover how we helped brands overcome challenges, achieve their goals, and grow beyond expectations.
          </p>

          <div className="flex flex-wrap items-center gap-4">
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
              href="/services"
              className="flex items-center gap-3 rounded-full bg-white text-[13px] font-bold pl-7 pr-2 py-2 border transition-transform hover:scale-[1.02]"
              style={{ borderColor: '#f0dedd', color: '#0d0d0d', boxShadow: '0 10px 30px -18px rgba(0,0,0,0.35)' }}
            >
              View Our Services
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0d0d0d' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 hero-anim-fade" style={{ animationDelay: '0.15s' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/case-studies/hero-illustration.png" alt="Alvis performance results dashboard" className="w-full h-auto" loading="eager" fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  )
}
