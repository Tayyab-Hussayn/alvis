'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { caseStudies } from '@/data/caseStudies'

const filters = ['All Case Studies', 'SEO', 'Social Media', 'Paid Advertising', 'E-Commerce', 'Branding', 'Local SEO', 'Influencer Marketing', 'Niche SEO + Community Marketing', 'Omnichannel + E-Commerce']

const iconPaths = {
  revenue: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  traffic: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </>
  ),
  chart: <path d="M18 20V10M12 20V4M6 20v-6" />,
  people: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    </>
  ),
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
    </>
  ),
}

const colorMap: Record<string, { accent: string; chip: string; colors: string[] }> = {
  'Local SEO + Social Media Marketing': { accent: '#e63946', chip: '#fde8ea', colors: ['#e63946', '#f59e0b'] },
  'Influencer Marketing + Social Media': { accent: '#8b5cf6', chip: '#eee9fd', colors: ['#8b5cf6', '#e63946'] },
  'E-Commerce + Digital Marketing': { accent: '#3b82f6', chip: '#e8f1fd', colors: ['#3b82f6', '#e63946'] },
  'SEO + Performance Marketing': { accent: '#f59e0b', chip: '#fdf0dd', colors: ['#f59e0b', '#3b82f6'] },
  'B2B Marketing + Paid Advertising': { accent: '#06b6d4', chip: '#ecf9fc', colors: ['#06b6d4', '#e63946'] },
  'Niche SEO + Community Marketing': { accent: '#8b5cf6', chip: '#eee9fd', colors: ['#8b5cf6', '#3b82f6'] },
  'Local SEO + Reputation Marketing': { accent: '#10b981', chip: '#ecfdf5', colors: ['#10b981', '#e63946'] },
  'Launch Marketing + Social Media': { accent: '#e63946', chip: '#fde8ea', colors: ['#e63946', '#f59e0b'] },
  'Omnichannel + E-Commerce': { accent: '#3b82f6', chip: '#e8f1fd', colors: ['#3b82f6', '#e63946'] },
}

const studies = caseStudies.map(cs => ({
  badge: cs.tags[0]?.toUpperCase() || 'MARKETING',
  filter: cs.category.split(' + ')[0] || cs.category,
  image: cs.coverImage,
  titleLead: cs.client,
  titleAccent: cs.title,
  accentColor: colorMap[cs.category]?.accent || '#e63946',
  desc: cs.summary,
  href: `/case-studies/${cs.slug}`,
  metrics: cs.results.slice(0, 3).map((r, i) => {
    const colors = colorMap[cs.category]?.colors || ['#e63946', '#3b82f6']
    const color = colors[i % colors.length]
    const chipColor = color === '#e63946' ? '#fde8ea' : color === '#3b82f6' ? '#e8f1fd' : '#eee9fd'
    const iconPath = [iconPaths.revenue, iconPaths.traffic, iconPaths.chart][i % 3]
    return { value: r.value, label: r.metric, color, chip: chipColor, icon: iconPath }
  }),
}))

export function CaseStudiesClient() {
  const [active, setActive] = useState('All Case Studies')
  const visible = active === 'All Case Studies' ? studies : studies.filter(s => s.filter === active)
  const cardsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map(f => {
            const on = f === active
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className="rounded-full px-6 py-2.5 text-[13px] font-bold transition-colors"
                style={
                  on
                    ? { background: '#e63946', color: '#fff' }
                    : { background: '#fff', color: '#5b403f', border: '1px solid #f0dedd' }
                }
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="space-y-8">
          {visible.map(s => (
            <article
              key={s.href}
              className="bg-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
            >
              <div className="lg:col-span-4 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={`${s.titleAccent} case study`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <span
                  className="absolute top-4 left-4 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em]"
                  style={{ color: '#0d0d0d', boxShadow: '0 6px 18px -8px rgba(0,0,0,0.4)' }}
                >
                  {s.badge}
                </span>
              </div>

              <div className="lg:col-span-5 p-8">
                <h2
                  className="font-display font-extrabold mb-4"
                  style={{ fontSize: '22px', lineHeight: '1.25', letterSpacing: '-0.02em', color: '#0d0d0d' }}
                >
                  {s.titleLead}<br />
                  <span style={{ color: s.accentColor }}>{s.titleAccent}</span>
                </h2>
                <p style={{ fontSize: '14px', lineHeight: '1.65', color: '#5b403f' }}>{s.desc}</p>
              </div>

              <div className="lg:col-span-3 p-8 lg:pl-0 flex flex-col justify-center gap-5">
                {s.metrics.map(m => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: m.chip, color: m.color }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {m.icon}
                      </svg>
                    </span>
                    <span>
                      <span className="block font-display font-extrabold text-[17px]" style={{ color: m.color }}>{m.value}</span>
                      <span className="block text-[11px]" style={{ color: '#8f6f6e' }}>{m.label}</span>
                    </span>
                  </div>
                ))}

                <Link
                  href={s.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full text-white text-[12px] font-bold px-5 py-3 mt-1 transition-transform hover:scale-[1.02]"
                  style={{ background: '#0a1b3d' }}
                >
                  View Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="text-center py-16 text-[14px]" style={{ color: '#8f6f6e' }}>
            No case studies in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}
