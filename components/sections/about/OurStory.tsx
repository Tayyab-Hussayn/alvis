'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const metrics = [
  { value: '200+', label: 'Projects'     },
  { value: '98%',  label: 'Satisfaction' },
  { value: '12',   label: 'Countries'    },
  { value: '8',    label: 'Service Areas' },
]

export function OurStory() {
  const leftRef  = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (leftRef.current) {
        gsap.from(leftRef.current, {
          opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 75%' },
        })
      }
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          opacity: 0, x: 40, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 75%' },
        })
      }
    }

    init()
  }, [])

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-bg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <div ref={leftRef}>
            <SectionLabel className="mb-4">Our Story</SectionLabel>
            <h2 className="text-display-lg font-display font-bold text-text mt-4 mb-8">
              Started Small.<br />Built for Scale.
            </h2>

            <div className="space-y-6 text-body-lg text-text-muted leading-relaxed">
              <p>
                Alvis started with a simple frustration: too many businesses were being oversold
                by agencies that overpromised and underdelivered. We built this agency to be
                different — small enough to care, skilled enough to compete with the best.
              </p>
              <p>
                From our first client to our fiftieth, the approach has never changed. We learn
                your business before we say a word about strategy. We measure everything. We stay
                accountable for the results we promised.
              </p>
              <p>
                Today, Alvis works with companies across industries and borders — from funded
                startups scaling fast to established businesses entering new markets. We&apos;re
                proud of the work, and even prouder of the relationships.
              </p>
            </div>

            <div className="flex gap-12 mt-10 pt-10 border-t border-border">
              <div>
                <span className="text-display-lg font-display font-bold text-text">5+</span>
                <p className="text-body-sm text-text-muted mt-1">Years in Business</p>
              </div>
              <div>
                <span className="text-display-lg font-display font-bold text-text">50+</span>
                <p className="text-body-sm text-text-muted mt-1">Clients Worldwide</p>
              </div>
            </div>
          </div>

          {/* Right — snapshot card */}
          <div ref={rightRef} className="bg-subtle rounded-3xl p-8 border border-border">
            <blockquote className="text-display-md font-display italic text-text leading-snug mb-6">
              &ldquo;Good work is not expensive — mediocre work costs you everything.&rdquo;
            </blockquote>
            <p className="text-body-sm text-text-muted mb-10">
              — Founder, Alvis
            </p>

            <div className="grid grid-cols-2 gap-3">
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-surface border border-border rounded-xl p-4 text-center"
                >
                  <p className="text-display-md font-display font-bold text-text">{value}</p>
                  <p className="text-body-sm text-text-muted mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
