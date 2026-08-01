'use client'

import Link from 'next/link'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const cases = [
  {
    label: 'E-Commerce Brand',
    stat: '+120%',
    sub: 'Increase in Sales',
    strokeColor: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.5)',
    path: 'M0,50 Q40,55 80,30 T160,15 T200,5',
    iconBg: '#3b82f6',
    border: 'rgba(90,120,220,0.15)',
    gradient: 'linear-gradient(135deg, #182652, #0c1330, #0a0e22)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" fill="none"/><path d="M16 10a4 4 0 01-8 0" fill="none" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    label: 'Healthcare Brand',
    stat: '+95%',
    sub: 'Leads Generated',
    strokeColor: '#e63946',
    glowColor: 'rgba(230,57,70,0.5)',
    path: 'M0,45 Q30,50 60,25 T120,40 T200,15',
    iconBg: '#e63946',
    border: 'rgba(255,90,90,0.2)',
    gradient: 'linear-gradient(135deg, #7a1620, #4a0e16, #22060c)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    label: 'Education Brand',
    stat: '+85%',
    sub: 'Organic Traffic',
    strokeColor: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.5)',
    path: 'M0,55 Q50,45 100,50 T200,20',
    iconBg: '#3b82f6',
    border: 'rgba(90,120,220,0.15)',
    gradient: 'linear-gradient(135deg, #182652, #0c1330, #0a0e22)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
]

export function PortfolioPreview() {
  const leftRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.1 })

  return (
    <section className="py-[160px] px-5 md:px-8">
      <div
        className="max-w-[1280px] mx-auto rounded-[28px] p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10 md:gap-16 overflow-hidden relative shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0c0f24, #0a0c1c, #090b18)' }}
      >
        {/* Left */}
        <div ref={leftRef} className="lg:w-[320px] text-left z-10">
          <span className="block mb-4 text-[13px] font-bold tracking-[0.1em] uppercase" style={{ color: '#e63946' }}>
            Recent Work
          </span>
          <h2 className="font-display font-extrabold mb-6" style={{ fontSize: '40px', lineHeight: '1.2', color: '#ffffff' }}>
            Real Results.<br />
            Real <span style={{ color: '#e63946' }}>Impact.</span>
          </h2>
          <p className="mb-10" style={{ fontSize: '16px', lineHeight: '1.5', color: 'rgba(255,255,255,0.6)' }}>
            We help businesses grow faster with creative strategies &amp; smart execution.
          </p>
          <Link
            href="/case-studies"
            className="flex items-center gap-3 text-white text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-3 rounded-full transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            View All Case Studies
            <span className="w-7 h-7 flex items-center justify-center rounded-full" style={{ background: '#ffffff', color: '#0a0e1a' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </Link>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 w-full z-10">
          {cases.map((c) => (
            <div
              key={c.label}
              className="rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
              style={{ minHeight: '230px', background: c.gradient, border: `1px solid ${c.border}` }}
            >
              <div>
                <span className="block mb-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.label}</span>
                <div className="text-white text-4xl font-extrabold mb-1">{c.stat}</div>
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.sub}</p>
              </div>
              <div className="relative h-16 mt-4">
                <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <path d={c.path} fill="none" stroke={c.strokeColor} strokeWidth="3" style={{ filter: `drop-shadow(0 0 8px ${c.glowColor})` }}/>
                </svg>
                <div className="absolute bottom-0 left-0 w-9 h-9 rounded-full flex items-center justify-center shadow-lg" style={{ background: c.iconBg }}>
                  {c.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
