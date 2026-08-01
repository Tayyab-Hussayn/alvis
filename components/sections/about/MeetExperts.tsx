'use client'

import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const experts = [
  {
    title: 'Experienced Team',
    desc: 'Our experts bring years of experience across multiple industries.',
    chip: '#fde8ea',
    color: '#e63946',
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
  {
    title: 'Data-Driven Strategies',
    desc: 'We rely on data insights to build strategies that deliver real impact.',
    chip: '#e8f1fd',
    color: '#3b82f6',
    icon: <path d="M18 20V10M12 20V4M6 20v-6" />,
  },
  {
    title: 'Growth Focused',
    desc: 'We focus on sustainable growth that scales your business.',
    chip: '#e3f7ec',
    color: '#16a34a',
    icon: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />,
  },
  {
    title: 'Dedicated Support',
    desc: 'Our team is always here to support you at every step.',
    chip: '#eee9fd',
    color: '#8b5cf6',
    icon: (
      <>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </>
    ),
  },
]

export function MeetExperts() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const expertsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
            Meet Our Experts
          </span>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', letterSpacing: '-0.03em', color: '#0d0d0d' }}
          >
            The Minds Behind Our{' '}
            <span className="relative inline-block" style={{ color: '#e63946' }}>
              Success
              <span className="absolute left-0 -bottom-1 w-full h-[3px] rounded-full" style={{ background: '#e63946' }} />
            </span>
          </h2>
        </div>

        <div ref={expertsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {experts.map(e => (
            <div
              key={e.title}
              className="bg-white rounded-3xl p-8 text-center transition-transform hover:-translate-y-1"
              style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
            >
              <span
                className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{ background: e.chip, color: e.color }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {e.icon}
                </svg>
              </span>
              <h3 className="font-bold text-[15px] mb-2" style={{ color: '#0d0d0d' }}>{e.title}</h3>
              <p className="text-[13px]" style={{ lineHeight: '1.6', color: '#5b403f' }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
