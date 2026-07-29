'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

export function CaseStudiesHero() {
  const h1Ref    = useRef<HTMLHeadingElement>(null)
  const bodyRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(h1Ref.current,   { opacity: 0, y: 50, duration: 0.9, delay: 0.2 })
        .from(bodyRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    }

    init()
  }, [])

  return (
    <section className="min-h-[50vh] flex flex-col justify-center pt-36 pb-16 bg-bg">
      <Container>
        <SectionLabel className="mb-4">Our Work</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mt-4">
          <h1
            ref={h1Ref}
            className="text-display-2xl font-display font-bold text-text"
          >
            Work That
            <span className="text-accent italic"> Speaks</span>
            <br />for Itself.
          </h1>

          <div ref={bodyRef}>
            <p className="text-body-lg text-text-muted mb-6">
              From brand launches to SEO campaigns to full website rebuilds —
              every case study here is a real business problem we solved with
              measurable outcomes.
            </p>
            <div className="flex gap-8 text-body-sm text-text-muted">
              <span>
                <strong className="block text-display-md font-display font-bold text-text">50+</strong>
                Projects
              </span>
              <span>
                <strong className="block text-display-md font-display font-bold text-text">12</strong>
                Countries
              </span>
              <span>
                <strong className="block text-display-md font-display font-bold text-text">8</strong>
                Industries
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
