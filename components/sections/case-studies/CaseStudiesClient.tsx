'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'

const CATEGORIES = ['All', 'Web Development', 'AI Automation', 'SEO', 'Branding', 'UI/UX', 'Lead Generation', 'Social Media', 'PPC']

const COVER_GRADIENTS: Record<string, string> = {
  'Web Development': 'linear-gradient(135deg, rgba(0,74,198,0.25) 0%, rgba(11,28,48,0.80) 100%)',
  'AI Automation':   'linear-gradient(135deg, rgba(79,70,229,0.30) 0%, rgba(11,28,48,0.80) 100%)',
  'SEO + Content':   'linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(11,28,48,0.80) 100%)',
  'Branding + Design': 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(11,28,48,0.80) 100%)',
  'PPC + Analytics': 'linear-gradient(135deg, rgba(5,150,105,0.25) 0%, rgba(11,28,48,0.80) 100%)',
  'UI/UX Design':    'linear-gradient(135deg, rgba(8,145,178,0.25) 0%, rgba(11,28,48,0.80) 100%)',
  'Social Media Marketing': 'linear-gradient(135deg, rgba(219,39,119,0.20) 0%, rgba(11,28,48,0.80) 100%)',
  'Lead Generation': 'linear-gradient(135deg, rgba(217,119,6,0.25) 0%, rgba(11,28,48,0.80) 100%)',
  default:           'linear-gradient(135deg, rgba(0,74,198,0.20) 0%, rgba(11,28,48,0.80) 100%)',
}

function getCoverGradient(category: string) {
  return COVER_GRADIENTS[category] ?? COVER_GRADIENTS.default
}

const featured = caseStudies[0]

export function CaseStudiesClient() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? caseStudies
    : caseStudies.filter(s =>
        s.category.toLowerCase().includes(active.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(active.toLowerCase()))
      )

  return (
    <>
      {/* Featured Spotlight */}
      <section className="w-full bg-[#0b1c30] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <span className="block text-[#c3c6d7]/50 uppercase text-[11px] tracking-widest font-semibold mb-8">
            FEATURED PROJECT
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Cover placeholder */}
            <div
              className="rounded-2xl overflow-hidden aspect-[4/3] relative"
              style={{ background: getCoverGradient(featured.category) }}
            >
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[12px] font-semibold uppercase tracking-wide mb-3">
                  {featured.category}
                </span>
                <p className="text-white/60 text-[14px]">{featured.client}</p>
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-[#c3c6d7]/50 text-[13px] uppercase tracking-widest font-semibold mb-3">
                {featured.client}
              </p>
              <h2 className="text-white font-bold text-[clamp(1.5rem,3vw,2rem)] leading-snug tracking-tight mb-4">
                {featured.title}
              </h2>
              <p className="text-[#c3c6d7]/70 text-[16px] leading-relaxed mb-8">
                {featured.summary}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-white/10">
                {featured.results.map(r => (
                  <div key={r.metric}>
                    <span className="block text-[#004ac6] font-extrabold text-[28px] leading-none mb-1">
                      {r.value}
                    </span>
                    <span className="text-[#c3c6d7]/60 text-[12px] uppercase tracking-wide">
                      {r.metric}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={`/case-studies/${featured.slug}`}
                className="inline-flex items-center gap-2 bg-[#004ac6] text-white rounded-full px-7 py-3.5 text-[14px] font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,74,198,0.35)] transition-all duration-200 group"
              >
                View Case Study
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-white border-b border-[#c3c6d7]/30 sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="flex-shrink-0 px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200"
                style={active === cat
                  ? { background: '#004ac6', color: '#ffffff' }
                  : { background: '#ffffff', color: '#434655', border: '1px solid #c3c6d7' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card grid */}
      <section className="w-full bg-[#f8f9ff] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#434655] text-[18px]">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(study => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group bg-white rounded-2xl border border-[#c3c6d7]/20 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,74,198,0.15)] transition-all duration-300"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                >
                  {/* Cover */}
                  <div
                    className="aspect-video relative overflow-hidden"
                    style={{ background: getCoverGradient(study.category) }}
                  >
                    {/* Category chip */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#eff4ff] text-[#004ac6] text-[11px] font-semibold uppercase tracking-wide">
                        {study.category}
                      </span>
                    </div>
                    {/* Client name overlay */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white/60 text-[12px] font-medium">{study.client}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-[#0b1c30] font-bold text-[17px] leading-snug mb-2 group-hover:text-[#004ac6] transition-colors duration-200">
                      {study.title}
                    </h3>
                    <p className="text-[#434655] text-[14px] leading-relaxed line-clamp-2 mb-5">
                      {study.summary}
                    </p>

                    {/* Metrics row */}
                    <div className="flex gap-6 pt-4 border-t border-[#c3c6d7]/20">
                      {study.results.slice(0, 2).map(r => (
                        <div key={r.metric}>
                          <span className="block text-[#004ac6] font-extrabold text-[22px] leading-none mb-0.5">
                            {r.value}
                          </span>
                          <span className="text-[#434655]/70 text-[11px] uppercase tracking-wide">
                            {r.metric}
                          </span>
                        </div>
                      ))}
                      <div className="ml-auto flex items-end pb-0.5">
                        <ArrowRight
                          size={18}
                          className="text-[#c3c6d7] group-hover:text-[#004ac6] group-hover:translate-x-1 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
