'use client'

import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { companyStats } from '@/lib/site'

const stats = [
  {
    value: companyStats.projectsCompleted,
    label: 'Projects Completed',
    chip: '#fde8ea',
    color: '#e63946',
    icon: <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" />,
  },
  {
    value: companyStats.clientSatisfaction,
    label: 'Client Satisfaction',
    chip: '#fdf0dd',
    color: '#f59e0b',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </>
    ),
  },
  {
    value: companyStats.yearsExperience,
    label: 'Years of Experience',
    chip: '#e8f1fd',
    color: '#3b82f6',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    value: companyStats.teamExperts,
    label: 'Experts in Team',
    chip: '#eee9fd',
    color: '#8b5cf6',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
]

export function ImpactNumbers() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const statsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-24" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto rounded-3xl py-16 px-6 md:px-12" style={{ background: '#0a1b3d' }}>
        <div ref={headerRef} className="text-center mb-14">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
            Our Impact
          </span>
          <h2
            className="font-display font-extrabold text-white"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', letterSpacing: '-0.03em' }}
          >
            Our Impact in <span style={{ color: '#e63946' }}>Numbers</span>
          </h2>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map(s => (
            <div key={s.label} className="relative bg-white rounded-2xl pt-12 pb-8 px-6 mt-6 text-center">
              <span
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: s.chip, color: s.color, boxShadow: '0 6px 16px -8px rgba(0,0,0,0.25)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <div className="font-display font-extrabold mb-1" style={{ fontSize: '38px', letterSpacing: '-0.03em', color: '#0d0d0d' }}>
                {s.value}
              </div>
              <div className="text-[13px]" style={{ color: '#8f6f6e' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
