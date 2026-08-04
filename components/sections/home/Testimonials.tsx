'use client'

import { useEffect, useState } from 'react'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { testimonials as testimonialsData } from '@/data/testimonials'

const testimonialsDisplay = testimonialsData.map((t, i) => ({
  quote: t.quote,
  name: t.name,
  role: `${t.title}, ${t.company}`,
  avatar: `/images/homepage/avatar-${i % 4 === 0 ? 'jason' : i % 4 === 1 ? 'sarah' : i % 4 === 2 ? 'daniel' : 'emily'}.webp`,
}))

export function Testimonials() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonialsDisplay.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + testimonialsDisplay.length) % testimonialsDisplay.length)
  const handleNext = () => setCurrentIndex(prev => (prev + 1) % testimonialsDisplay.length)

  const visibleTestimonials = testimonialsDisplay.slice(currentIndex, currentIndex + 4).concat(
    currentIndex + 4 > testimonialsDisplay.length ? testimonialsDisplay.slice(0, (currentIndex + 4) % testimonialsDisplay.length) : []
  )

  return (
    <section className="py-[100px] px-5 md:px-8 max-w-[1280px] mx-auto overflow-hidden">
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <span className="block mb-4 text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: '#e63946' }}>
            Testimonials
          </span>
          <h2 className="font-display font-extrabold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.15', color: '#271717' }}>
            What Our <span style={{ color: '#e63946' }}>Clients</span> Say
          </h2>
          <p className="mt-4 max-w-lg" style={{ fontSize: '16px', lineHeight: '1.5', color: '#5b403f' }}>
            Real stories from real businesses that have grown with Alvis Marketing.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors hover:bg-opacity-10"
            style={{ borderColor: '#e4bebc', color: '#271717' }}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors hover:bg-opacity-10"
            style={{ borderColor: '#e63946', color: '#e63946' }}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleTestimonials.map((t) => (
          <div
            key={t.name}
            className="p-8 rounded-3xl flex flex-col justify-between transition-all"
            style={{ background: '#ffffff', border: '1px solid rgba(228,190,188,0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)')}
          >
            <div>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(230,57,70,0.3)" className="mb-6">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
              </svg>
              <p className="mb-8" style={{ fontSize: '16px', lineHeight: '1.6', color: '#5b403f' }}>{t.quote}</p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full overflow-hidden" style={{ background: '#f1d3d2' }}>
                <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm" style={{ color: '#271717' }}>{t.name}</h4>
                <p className="text-[11px]" style={{ color: '#5b403f' }}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
