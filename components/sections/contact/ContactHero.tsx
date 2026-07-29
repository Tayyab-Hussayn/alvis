'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

export function ContactHero() {
  const h1Ref   = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(h1Ref.current,   { opacity: 0, y: 50, duration: 0.9, delay: 0.2 })
        .from(bodyRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.4')
    }

    init()
  }, [])

  return (
    <section className="pt-36 pb-16 bg-bg">
      <Container>
        <div className="max-w-3xl">
          <SectionLabel className="mb-4">Let&apos;s Talk</SectionLabel>
          <h1
            ref={h1Ref}
            className="text-display-xl font-display font-bold text-text mt-4 mb-6"
          >
            Ready to Start
            <span className="text-accent italic"> Something Great?</span>
          </h1>
          <p ref={bodyRef} className="text-body-lg text-text-muted max-w-xl">
            Tell us about your project. We&apos;ll review it and get back to you within
            24 hours with honest thoughts and a clear next step.
          </p>
        </div>
      </Container>
    </section>
  )
}
