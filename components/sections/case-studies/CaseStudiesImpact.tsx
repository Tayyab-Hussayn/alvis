'use client'

import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { companyStats } from '@/lib/site'

const stats = [
  {
    value: companyStats.projectsCompleted,
    label: 'Projects Completed',
    color: '#f59e0b',
    icon: (
      <>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
      </>
    ),
  },
  {
    value: companyStats.clientSatisfaction,
    label: 'Client Satisfaction',
    color: '#fff',
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
    color: '#f59e0b',
    icon: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  },
  {
    value: companyStats.happyClients,
    label: 'Happy Clients',
    color: '#fff',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    value: companyStats.averageRoi,
    label: 'Average ROI Delivered',
    color: '#a78bfa',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
  },
]

export function CaseStudiesImpact() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const statsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto rounded-3xl py-14 px-6 md:px-10" style={{ background: '#0a1b3d' }}>
        <div ref={headerRef} className="text-center mb-12">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3 text-white">
            Our Impact <span style={{ color: '#e63946' }}>in Numbers</span>
          </span>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', letterSpacing: '-0.03em' }}>
            Delivering <span style={{ color: '#e63946' }}>Impact</span> That Matters
          </h2>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center px-4 py-4 ${i > 0 ? 'lg:border-l' : ''}`}
              style={{ borderColor: 'rgba(255,255,255,0.14)' }}
            >
              <span className="mx-auto mb-3 flex items-center justify-center" style={{ color: s.color }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <div className="font-display font-extrabold text-white mb-1" style={{ fontSize: '32px', letterSpacing: '-0.03em' }}>
                {s.value}
              </div>
              <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
