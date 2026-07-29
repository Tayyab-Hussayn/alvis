'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

export function AboutHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef     = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const init = async () => {
      const { gsap } = await import('gsap')

      const el = headlineRef.current
      if (!el) return

      const text = el.innerHTML
      const chars = text.split('').map((char) => {
        if (char === '<' || char === '>') return char
        const span = document.createElement('span')
        span.textContent = char === ' ' ? ' ' : char
        span.style.display = 'inline-block'
        return span.outerHTML
      })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(headlineRef.current, { opacity: 0, y: 60, duration: 0.9, delay: 0.2 })
        .from(bodyRef.current,     { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    }

    init()
  }, [])

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center bg-text pt-36 pb-28 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.15) 0%, transparent 65%)',
        }}
      />
      {/* Bottom fade to bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel className="mb-6 justify-center [&>span:first-child]:bg-white/30 [&>span:last-child]:text-white/50">
            About Alvis
          </SectionLabel>

          <h1
            ref={headlineRef}
            className="text-display-2xl font-display font-bold text-white mt-6 mb-8"
          >
            We Exist to Make<br />
            Growing Businesses<br />
            <span className="text-accent">Unstoppable.</span>
          </h1>

          <p
            ref={bodyRef}
            className="text-body-lg text-white/60 max-w-2xl mx-auto"
          >
            Alvis was built on one belief: that great work and measurable results should
            not be mutually exclusive. We combine strategic thinking, creative execution,
            and technical precision to help our clients win — in their markets, and beyond.
          </p>
        </div>
      </Container>
    </section>
  )
}
