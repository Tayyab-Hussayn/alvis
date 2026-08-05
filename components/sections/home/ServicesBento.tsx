'use client'

import Link from 'next/link'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { services as servicesData } from '@/data/services'

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

          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-3 rounded-full text-[12px] font-bold tracking-[0.08em] uppercase pl-7 pr-2 py-2 border transition-colors shrink-0"
            style={{ borderColor: '#e4bebc', color: '#271717' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#b7102a')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4bebc')}
          >
            All Services
            <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#b7102a', color: '#fff' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, idx) => {
            const features = service.deliverables.slice(0, 3)

            return (
              <Link
                key={service.slug}
                href="/services"
                className="group relative overflow-hidden p-8 rounded-2xl h-full flex flex-col transition-all duration-300"
                style={{
                  background: '#ffffff',
                  border: '1px solid #f3dedd',
                  boxShadow: '0 1px 2px rgba(39,23,23,0.04)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#e4bebc'
                  e.currentTarget.style.boxShadow = '0 18px 40px -20px rgba(183,16,42,0.28)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#f3dedd'
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(39,23,23,0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Top accent bar, grows in on hover */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-[3px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, #b7102a, #e63946)' }}
                />

                {/* Index */}
                <span
                  className="font-mono text-[11px] font-bold tracking-[0.14em] mb-6 transition-colors duration-300"
                  style={{ color: '#c9a9a8' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <h3
                  className="font-display font-bold text-[19px] mb-3 transition-colors duration-300 group-hover:text-[#b7102a]"
                  style={{ color: '#1c1414', letterSpacing: '-0.01em' }}
                >
                  {service.title}
                </h3>

                <p className="text-[14px] mb-6" style={{ color: '#5b403f', lineHeight: '1.65' }}>
                  {service.shortDesc}
                </p>

                <ul className="space-y-2.5 mb-8 flex-grow pt-6" style={{ borderTop: '1px solid #f8e0df' }}>
                  {features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e63946"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className="mt-[3px] shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[13px]" style={{ color: '#5b403f', lineHeight: '1.5' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <span
                  className="mt-auto inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase transition-colors duration-300"
                  style={{ color: '#b7102a' }}
                >
                  Learn More
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
