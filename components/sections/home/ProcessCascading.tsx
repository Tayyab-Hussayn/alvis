'use client'

import type { CSSProperties } from 'react'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

/* ── Shared coordinate space ──────────────────────────────────────
   Card x/width are percentages of the steps container; y values are
   px offsets from its top. The SVG connector overlay below uses the
   same numbers, so cards and arrows always line up. If you move a
   card, update the matching connector.                              */
const CARD_W  = '39%'
const COL_L   = '0%'
const COL_R   = '55%'
const STEPS_H = '580px'

const iconStroke = {
  fill: 'none',
  stroke: '#b7102a',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const steps = [
  {
    num: '01',
    duration: '1 WEEK',
    title: 'Discover & Research',
    desc: 'We dive deep into your business, audience, and competitors to uncover opportunities that drive impact.',
    top: '0px',
    left: COL_L,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <circle cx="11" cy="11" r="7" /><path d="M20 20l-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: '02',
    duration: '1-2 WEEKS',
    title: 'Strategy & Planning',
    desc: 'We craft a data-driven strategy and roadmap tailored to your goals, channels, and growth objectives.',
    top: '120px',
    left: COL_R,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: '03',
    duration: '1-2 WEEKS',
    title: 'Execute & Optimize',
    desc: 'Our team brings the strategy to life with precision execution, constant optimization, and performance tracking.',
    top: '280px',
    left: COL_L,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91 0z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    num: '04',
    duration: 'ONGOING',
    title: 'Analyze & Grow',
    desc: 'We analyze results, share insights, and continuously refine to help your business scale and stay ahead.',
    top: '396px',
    left: COL_R,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...iconStroke}>
        <line x1="6" y1="20" x2="6" y2="14" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="18" y1="20" x2="18" y2="10" />
      </svg>
    ),
  },
]

const features = [
  {
    label: 'Collaborative',
    sub: 'We work closely with\nyou, not just for you.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" {...iconStroke}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  },
  {
    label: 'Transparent',
    sub: 'Clear communication\nand regular updates.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" {...iconStroke}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    label: 'Results-Driven',
    sub: 'Focused on metrics\nthat move the needle.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" {...iconStroke}><line x1="6" y1="20" x2="6" y2="15" /><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="5" /><path d="M4 8l5-4 4 3 7-5" /></svg>,
  },
  {
    label: 'Reliable',
    sub: 'You can count on us\nas your growth partner.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" {...iconStroke}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 11 11.5 13.5 15.5 9" /></svg>,
  },
]

const DASH = { stroke: '#eec4c4', strokeWidth: 1.5, strokeDasharray: '6 6', fill: 'none' }

export function ProcessCascading() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const barRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="py-[160px] px-5 md:px-8" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-xl">
            <span className="block mb-4 text-[12px] font-bold tracking-[0.15em] uppercase" style={{ color: '#b7102a' }}>
              Our Process
            </span>
            <h2
              className="font-display font-extrabold mb-6"
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.75rem)', lineHeight: '1.15', letterSpacing: '-0.02em', color: '#1c1414' }}
            >
              Our Proven Process <br />Built for <span style={{ color: '#b7102a' }}>Results</span>
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#5b403f', maxWidth: '22em' }}>
              A strategic, collaborative approach that turns ideas into measurable growth.
            </p>
          </div>

          <div
            className="w-full lg:max-w-xl p-6 rounded-2xl flex items-center gap-5"
            style={{ background: '#fdeeed' }}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#fbdedd' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" {...iconStroke}>
                <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
              </svg>
            </div>
            <div>
              <p className="font-bold mb-1" style={{ fontSize: '15px', color: '#1c1414' }}>
                Transparent. Collaborative. Results-Driven.
              </p>
              <p style={{ fontSize: '14px', color: '#5b403f' }}>
                We keep you informed at every step of the journey.
              </p>
            </div>
          </div>
        </div>

        {/* ── Zigzag steps ── */}
        <div
          className="process-steps relative flex flex-col gap-6 lg:block"
          style={{ '--steps-h': STEPS_H } as CSSProperties}
        >
          {/* Connector overlay — percentages match the card columns above.
              <line> accepts % for x, so this scales with the container. */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <marker id="proc-arrow" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M2,2 L7,5 L2,8" fill="none" stroke="#eec4c4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {/* 01 → 02 : right out of card 1, then down into card 2 */}
            <line x1="39%" y1="65"  x2="60%" y2="65"  {...DASH} />
            <line x1="60%" y1="65"  x2="60%" y2="112" {...DASH} markerEnd="url(#proc-arrow)" />

            {/* 02 → 03 : left out of card 2, then down into card 3 */}
            <line x1="55%"   y1="250" x2="33.5%" y2="250" {...DASH} />
            <line x1="33.5%" y1="250" x2="33.5%" y2="272" {...DASH} markerEnd="url(#proc-arrow)" />

            {/* 03 → 04 : straight right into card 4 */}
            <line x1="39%" y1="420" x2="54%" y2="420" {...DASH} markerEnd="url(#proc-arrow)" />
          </svg>

          {steps.map((step) => (
            <div
              key={step.num}
              className="process-step z-10"
              style={{ '--step-top': step.top, '--step-left': step.left, '--step-width': CARD_W } as CSSProperties}
            >
              <div
                className="flex rounded-[22px] p-2 transition-shadow duration-300"
                style={{ background: '#fffdfc', border: '1px solid #f6dedd', boxShadow: '0 1px 2px rgba(120,60,60,0.04)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 18px 36px -12px rgba(150,60,60,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 2px rgba(120,60,60,0.04)')}
              >
                {/* Vertical duration tab */}
                <div
                  className="w-11 shrink-0 rounded-[16px] flex items-center justify-center"
                  style={{ background: '#fbdedd' }}
                >
                  <span
                    className="font-bold uppercase"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '10px', letterSpacing: '0.14em', color: '#b7102a' }}
                  >
                    {step.duration}
                  </span>
                </div>

                {/* Icon + copy */}
                <div className="flex gap-5 px-5 py-5">
                  <div className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center shrink-0" style={{ background: '#fce4e3' }}>
                    {step.icon}
                  </div>
                  <div>
                    <span className="block font-bold leading-none mb-1.5" style={{ fontSize: '18px', color: '#b7102a' }}>
                      {step.num}
                    </span>
                    <h3 className="font-display font-bold mb-2.5" style={{ fontSize: '20px', letterSpacing: '-0.01em', color: '#1c1414' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.55', color: '#5b4948' }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom feature bar ── */}
        <div className="mt-16 lg:mt-20 rounded-[22px] px-8 py-9" style={{ background: '#fdeeed' }}>
          <div ref={barRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-center">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#fbdedd' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" {...iconStroke}>
                  <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" />
                </svg>
              </div>
              <p className="font-bold leading-snug" style={{ fontSize: '14px', color: '#1c1414' }}>
                From strategy to success, we&apos;re with you{' '}
                <span style={{ color: '#b7102a' }}>every step of the way.</span>
              </p>
            </div>

            {features.map(f => (
              <div key={f.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: '#fbdedd' }}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold mb-0.5" style={{ fontSize: '14px', color: '#1c1414' }}>{f.label}</p>
                  <p style={{ fontSize: '13px', lineHeight: '1.45', color: '#5b4948', whiteSpace: 'pre-line' }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
