'use client'

import { useEffect, useRef } from 'react'
import {
  Monitor, TrendingUp, Share2, Target, Palette, Layout, FileText, Server,
} from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'
import { services } from '@/data/services'

const iconMap: Record<string, React.ElementType> = {
  Monitor, TrendingUp, Share2, Target, Palette, Layout, FileText, Server,
}

export function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !gridRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(Array.from(gridRef.current!.children), {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }

    init()
  }, [])

  const scrollToService = (slug: string) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-20 md:py-28 bg-subtle">
      <Container>
        <div className="mb-12 md:mb-16">
          <SectionLabel className="mb-4">What We Offer</SectionLabel>
          <h2 className="text-display-lg font-display font-bold text-text mb-4">
            Full-Spectrum Digital Services
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl">
            Pick one. Pick all. Every service is designed to work standalone or as
            part of a comprehensive growth strategy.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            const num = String(i + 1).padStart(2, '0')
            return (
              <button
                key={service.slug}
                onClick={() => scrollToService(service.slug)}
                className="group relative bg-surface border border-border rounded-2xl p-6 md:p-8 text-left hover:border-accent hover:shadow-sm hover:-translate-y-1 transition-all duration-250 overflow-hidden"
              >
                {/* Decorative number */}
                <span className="absolute top-4 right-5 text-display-lg font-display font-bold text-text-faint select-none">
                  {num}
                </span>

                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-6">
                  {Icon && <Icon size={22} className="text-accent" />}
                </div>

                <h3 className="text-display-md font-display font-semibold text-text mb-3 pr-8">
                  {service.title}
                </h3>
                <p className="text-body-sm text-text-muted leading-relaxed">
                  {service.shortDesc}
                </p>
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
