'use client'

import { useEffect, useRef } from 'react'
import { Search, Map, Zap, TrendingUp } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const steps = [
  {
    number: '01',
    Icon: Search,
    title: 'Discovery',
    content: 'We start by understanding your business, audience, market position, and goals. No assumptions — just clarity.',
    outputs: ['Audit report', 'Competitor analysis', 'Goal definition'],
  },
  {
    number: '02',
    Icon: Map,
    title: 'Strategy',
    content: 'Every engagement gets a custom roadmap. We define what success looks like before we write a single line of code or run a single ad.',
    outputs: ['Custom roadmap', 'KPI framework', 'Timeline & budget'],
  },
  {
    number: '03',
    Icon: Zap,
    title: 'Execution',
    content: 'Our team executes with precision. Design, development, campaigns — done on time, within budget, to standard.',
    outputs: ['Delivered on time', 'Quality assured', 'Weekly updates'],
  },
  {
    number: '04',
    Icon: TrendingUp,
    title: 'Growth',
    content: 'We measure, analyze, and iterate. What works gets amplified. What doesn\'t gets cut.',
    outputs: ['Monthly reports', 'Optimization cycles', 'Ongoing advisory'],
  },
]

export function OurProcess() {
  const lineRef  = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 70%' },
        })
      }

      if (stepsRef.current) {
        gsap.from(Array.from(stepsRef.current.children), {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
        })
      }
    }

    init()
  }, [])

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-subtle">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left label column */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <SectionLabel className="mb-6">How We Work</SectionLabel>
            <h2 className="text-display-lg font-display font-bold text-text mb-4">
              A Process That<br />Delivers Every Time
            </h2>
            <p className="text-body-lg text-text-muted">
              We don&apos;t guess. We research, plan, execute, and optimize — at every stage.
            </p>
          </div>

          {/* Right timeline */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Vertical line */}
              <div
                ref={lineRef}
                className="absolute left-6 top-0 bottom-0 w-px bg-border"
              />

              <div ref={stepsRef} className="flex flex-col gap-12">
                {steps.map(({ number, Icon, title, content, outputs }) => (
                  <div key={number} className="relative pl-20">
                    {/* Dot */}
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-accent-soft border border-accent flex items-center justify-center">
                      <span className="text-label font-mono font-bold text-accent">{number}</span>
                    </div>

                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <h3 className="text-display-md font-display font-semibold text-text">{title}</h3>
                    </div>

                    <p className="text-body-md text-text-muted mb-4 max-w-lg">{content}</p>

                    <div className="flex flex-wrap gap-2">
                      {outputs.map((out) => (
                        <span
                          key={out}
                          className="text-label text-accent bg-accent-soft px-3 py-1 rounded-full"
                        >
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
