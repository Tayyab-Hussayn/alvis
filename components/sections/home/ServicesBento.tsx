'use client'

import Link from 'next/link'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { services as servicesData } from '@/data/services'

const serviceColors = [
  { primary: '#4f46e5', accent: '#818cf8', bg: '#eef2ff' },    // SEO - Indigo
  { primary: '#ec4899', accent: '#f472b6', bg: '#fdf2f8' },    // Social - Pink
  { primary: '#f59e0b', accent: '#fbbf24', bg: '#fffbeb' },    // ORM - Amber
  { primary: '#3b82f6', accent: '#60a5fa', bg: '#eff6ff' },    // Digital - Blue
  { primary: '#06b6d4', accent: '#22d3ee', bg: '#ecf9ff' },    // Web - Cyan
  { primary: '#8b5cf6', accent: '#a78bfa', bg: '#faf5ff' },    // App - Purple
  { primary: '#ef4444', accent: '#f87171', bg: '#fee2e2' },    // AI - Red
  { primary: '#10b981', accent: '#34d399', bg: '#ecfdf5' },    // Design - Green
  { primary: '#f97316', accent: '#fb923c', bg: '#fff7ed' },    // Video - Orange
]

const iconSvgs: { [key: string]: string } = {
  'seo': '<path d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM21 21l-4.35-4.35M3 3l18 18"/><circle cx="11" cy="11" r="5"/>',
  'social-media-marketing': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14 7a3 3 0 0 1 3 3"/>',
  'orm': '<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M7 12h10M9 9h6M9 15h6"/>',
  'digital-marketing': '<path d="M3 12c0-1.657.895-3.1 2.228-3.887M21 12c0 1.657-.895 3.1-2.228 3.887M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l3 2"/>',
  'web-development': '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="3" y1="9" x2="3" y2="9.01"/><circle cx="19" cy="9" r="1"/>',
  'app-development': '<rect x="6" y="2" width="12" height="20" rx="2" ry="2"/><path d="M12 18h.01M12 5h0M8 5h8"/><line x1="12" y1="21" x2="12" y2="21.01"/>',
  'ai-automation': '<circle cx="12" cy="12" r="9"/><path d="M12 6v6m3-3H9M5.64 5.64l3.54 3.54M18.36 5.64l-3.54 3.54M5.64 18.36l3.54-3.54M18.36 18.36l-3.54-3.54"/>',
  'graphic-design': '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="3"/><path d="M11 8v1M11 14v1M8 11h1M14 11h1"/>',
  'video-production': '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/><path d="M4 8l3 3-3 3M12 8l-3 3 3 3"/>',
}

const accentSvgs: { [key: string]: string } = {
  'seo': '<path d="M13 2l-1 6h7v6h-7l1 8M3 9h3M8 6l-2 2M20 15l2 2"/>',
  'social-media-marketing': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M9 10h6M9 14h4"/>',
  'orm': '<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12l2 2 4-4"/>',
  'digital-marketing': '<path d="M22 12l-4-4-4 4-4-4-4 4M6 12v8h12v-8"/><circle cx="12" cy="8" r="2"/>',
  'web-development': '<path d="M3 9l3 3-3 3M21 9l-3 3 3 3M8 21h8M12 3v18"/>',
  'app-development': '<path d="M17 9V7a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2M7 13v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4M9 17h6"/>',
  'ai-automation': '<circle cx="12" cy="12" r="1"/><path d="M4.22 4.22l2.12 2.12M19.78 4.22l-2.12 2.12M4.22 19.78l2.12-2.12M19.78 19.78l-2.12-2.12M12 2v2M12 20v2M2 12h2M20 12h2"/>',
  'graphic-design': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2-2 2 2 2-2 2 2"/>',
  'video-production': '<path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z"/><path d="M10 9l4 2.5-4 2.5V9z"/>',
}

export function ServicesBento() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.06 })

  return (
    <section className="pb-[100px] px-5 md:px-8" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="block mb-4 text-[12px] font-bold tracking-[0.1em] uppercase" style={{ color: '#b7102a' }}>
              OUR SERVICES
            </span>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: '1.2', letterSpacing: '-0.02em', color: '#271717' }}>
              Smart Solutions For{' '}
              <span style={{ color: '#b7102a' }}>Real Business Growth</span>
            </h2>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const color = serviceColors[idx]
            const features = service.deliverables.slice(0, 3)

            return (
              <div
                key={service.slug}
                className="group p-8 rounded-2xl transition-all duration-300 h-full flex flex-col"
                style={{
                  background: '#ffffff',
                  border: `1px solid ${color.bg}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 24px ${color.primary}20`
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Header with main icon and accent icon */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 flex-shrink-0"
                    style={{ background: color.bg, color: color.primary }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: iconSvgs[service.slug] || '' }} />
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: color.bg, color: color.primary }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: accentSvgs[service.slug] || '' }} />
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="font-display font-bold text-[18px] mb-2" style={{ color: '#0d0d0d' }}>
                  {service.title}
                </h3>
                <p className="text-[14px] mb-6 leading-relaxed" style={{ color: '#5b403f' }}>
                  {service.shortDesc}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: color.bg, color: color.primary }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[13px]" style={{ color: '#5b403f', lineHeight: '1.5' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Arrow Button */}
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all mt-auto"
                  style={{
                    borderColor: color.primary,
                    color: color.primary,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = color.primary
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = color.primary
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
