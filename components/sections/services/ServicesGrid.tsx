'use client'

import Link from 'next/link'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { services as servicesData } from '@/data/services'

const iconMap: { [key: string]: React.ReactNode } = {
  'SEO': <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
  'Social Media Marketing': <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />,
  'ORM': <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />,
  'Digital Marketing': <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></>,
  'Web Development': <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="17" x2="22" y2="17" /></>,
  'App Development': <><rect x="2" y="5" width="8" height="12" rx="1" ry="1" /><path d="M13 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" /></>,
  'AI Automation': <><circle cx="12" cy="12" r="1" /><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" /><path d="M12 2v4m0 8v4M2 12h4m8 0h4" /></>,
  'Graphic Design': <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />,
  'Video Editing & Animation': <><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>,
}

const colorMap: { [key: string]: { chip: string; color: string } } = {
  'SEO': { chip: '#e8f1fd', color: '#3b82f6' },
  'Social Media Marketing': { chip: '#fde8ea', color: '#e63946' },
  'ORM': { chip: '#eee9fd', color: '#8b5cf6' },
  'Digital Marketing': { chip: '#e3f7ec', color: '#16a34a' },
  'Web Development': { chip: '#fdf0dd', color: '#f59e0b' },
  'App Development': { chip: '#e8f1fd', color: '#3b82f6' },
  'AI Automation': { chip: '#eee9fd', color: '#8b5cf6' },
  'Graphic Design': { chip: '#e3f7ec', color: '#16a34a' },
  'Video Editing & Animation': { chip: '#fde8ea', color: '#e63946' },
}

const services = servicesData.map(s => ({
  title: s.title,
  desc: s.shortDesc,
  chip: colorMap[s.title]?.chip || '#fde8ea',
  color: colorMap[s.title]?.color || '#e63946',
  icon: iconMap[s.title] || <circle cx="12" cy="12" r="1" />,
}))

export function ServicesGrid() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div
        className="max-w-[1280px] mx-auto bg-white rounded-3xl px-6 md:px-10 py-14"
        style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.10)' }}
      >
        <div ref={headerRef} className="text-center mb-12">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
            What We Do
          </span>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', letterSpacing: '-0.03em', color: '#0d0d0d' }}
          >
            Our Digital Marketing <span style={{ color: '#e63946' }}>Services</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div
              key={s.title}
              className="rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
              style={{ background: '#fffbfb', border: '1px solid #f8e0df' }}
            >
              <span
                className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{ background: s.chip, color: s.color }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <h3 className="font-bold text-[14px] mb-3" style={{ color: '#0d0d0d' }}>{s.title}</h3>
              <p className="text-[12.5px] mb-5" style={{ lineHeight: '1.6', color: '#5b403f' }}>{s.desc}</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[12px] font-bold" style={{ color: '#e63946' }}>
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
