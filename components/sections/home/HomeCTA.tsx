'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

export function HomeCTA() {
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const supportRef   = useRef<HTMLParagraphElement>(null)
  const buttonRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline({
        scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
        defaults: { ease: 'power3.out' },
      })

      tl.from(headlineRef.current, { opacity: 0, y: 30, duration: 0.8 })
        .from(supportRef.current,  { opacity: 0, y: 15, duration: 0.6 }, '+=0.5')
        .from(buttonRef.current,   { opacity: 0, y: 20, duration: 0.5 }, '+=0.3')
    }

    init()
  }, [])

  return (
    <section className="relative bg-text py-28 md:py-36 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10 text-center">
        <SectionLabel className="mb-6 justify-center [&>span:first-child]:bg-white [&>span:last-child]:text-white/60">
          Ready to Grow?
        </SectionLabel>

        <h2
          ref={headlineRef}
          className="text-display-xl font-display font-bold text-white mt-4 mb-6"
        >
          Let&apos;s Build Something<br />
          <span className="text-blue-400">That Lasts.</span>
        </h2>

        <p
          ref={supportRef}
          className="text-body-lg text-white/80 max-w-lg mx-auto mb-10"
        >
          Whether you need a new website, a better marketing strategy, or an IT solution
          — Alvis is ready to make it happen.
        </p>

        <div ref={buttonRef}>
          <Button href="/contact" variant="primary" size="lg" withArrow>
            Start a Conversation
          </Button>
        </div>
      </Container>
    </section>
  )
}
