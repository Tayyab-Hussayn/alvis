'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/components/animations/useScrollReveal'

function RocketArt() {
  return (
    <svg width="180" height="170" viewBox="0 0 200 180" fill="none" className="w-full max-w-[180px]">
      <path d="M100 108c-9 0-16 10-16 20s7 16 16 16 16-6 16-16-7-20-16-20z" fill="#3b82f6" opacity="0.85" />
      <path d="M100 118c-5 0-9 6-9 12s4 9 9 9 9-3 9-9-4-12-9-12z" fill="#93c5fd" />
      <path d="M100 8c18 16 28 40 28 66v22H72V74c0-26 10-50 28-66z" fill="#fff" />
      <path d="M100 8c18 16 28 40 28 66v22h-28V8z" fill="#eef2f7" />
      <path d="M100 8c8 7 14 17 18 28H82c4-11 10-21 18-28z" fill="#e63946" />
      <path d="M72 76c-12 6-20 18-22 32l22-8V76z" fill="#e63946" />
      <path d="M128 76c12 6 20 18 22 32l-22-8V76z" fill="#c81e2f" />
      <circle cx="100" cy="62" r="13" fill="#0a1b3d" />
      <circle cx="100" cy="62" r="9" fill="#3b82f6" />
      <circle cx="96" cy="58" r="3" fill="#bfdbfe" />
      <g fill="#fff">
        <ellipse cx="70" cy="158" rx="30" ry="17" />
        <ellipse cx="104" cy="166" rx="36" ry="14" />
        <ellipse cx="138" cy="156" rx="26" ry="15" />
      </g>
      <g fill="#e63946">
        <circle cx="34" cy="60" r="3" />
        <circle cx="168" cy="44" r="2.5" />
      </g>
      <g fill="#3b82f6">
        <circle cx="176" cy="96" r="2.5" />
        <circle cx="46" cy="26" r="2" />
      </g>
    </svg>
  )
}

export function ServicesCTA() {
  const cardRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="px-5 md:px-8 pb-24" style={{ background: '#fff8f7' }}>
      <div ref={cardRef} className="max-w-[1280px] mx-auto rounded-3xl px-6 md:px-12 py-8" style={{ background: '#fdeeed' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 flex justify-center">
            <RocketArt />
          </div>

          <div className="md:col-span-5 text-center md:text-left">
            <h2
              className="font-display font-extrabold mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 1.95rem)', letterSpacing: '-0.03em', color: '#0d0d0d' }}
            >
              Ready to <span style={{ color: '#e63946' }}>Grow</span> Your Business?
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#5b403f' }}>
              Let&apos;s work together to build effective strategies that<br className="hidden md:block" /> drive traffic, generate leads and increase revenue.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
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
          </div>
        </div>
      </div>
    </section>
  )
}
