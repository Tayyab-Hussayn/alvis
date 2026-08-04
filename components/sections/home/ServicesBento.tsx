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
  'seo': '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  'social-media-marketing': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  'orm': '<path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/><path d="M12 6v6l4 2"/>',
  'digital-marketing': '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',
  'web-development': '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="17" x2="22" y2="17"/>',
  'app-development': '<rect x="2" y="5" width="8" height="12" rx="1" ry="1"/><path d="M13 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/>',
  'ai-automation': '<circle cx="12" cy="12" r="1"/><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/><path d="M12 2v4m0 8v4M2 12h4m8 0h4"/>',
  'graphic-design': '<path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>',
  'video-production': '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>',
}

const accentSvgs: { [key: string]: string } = {
  'seo': '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  'social-media-marketing': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'orm': '<circle cx="12" cy="12" r="10"/>',
  'digital-marketing': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>',
  'web-development': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/>',
  'app-development': '<rect x="7" y="2" width="10" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18.01"/>',
  'ai-automation': '<circle cx="12" cy="12" r="9"/><path d="M12 6v6m3-3H9"/>',
  'graphic-design': '<circle cx="12" cy="12" r="1"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0 1 18 0z"/>',
  'video-production': '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>',
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
