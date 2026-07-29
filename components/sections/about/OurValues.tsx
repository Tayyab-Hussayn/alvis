'use client'

import { useEffect, useRef } from 'react'
import { Eye, Gem, Shield, Lightbulb } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const values = [
  {
    number: '01',
    Icon: Eye,
    title: 'Radical Transparency',
    body: "We tell clients what they need to hear, not what sounds good. No hidden fees. No inflated reports. If something isn't working, we say so first.",
  },
  {
    number: '02',
    Icon: Gem,
    title: 'Obsession With Craft',
    body: 'Every piece of work — a social post, a landing page, an API endpoint — gets treated like it matters. Because it does.',
  },
  {
    number: '03',
    Icon: Shield,
    title: 'Accountability Over Excuses',
    body: "We set goals we can be held to. If we miss, we analyze why and fix it. We don't blame market conditions or client decisions.",
  },
  {
    number: '04',
    Icon: Lightbulb,
    title: 'Curiosity as Strategy',
    body: 'The best solutions come from asking better questions. We never assume we already know the answer.',
  },
]

export function OurValues() {
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
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }

    init()
  }, [])

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-subtle">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel className="mb-4 justify-center">What We Believe</SectionLabel>
          <h2 className="text-display-lg font-display font-bold text-text mt-4 mb-4">
            The Principles Behind Every Decision
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
            Culture is not a poster on the wall. These are the values that actually show up
            in how we work.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map(({ number, Icon, title, body }) => (
            <div
              key={number}
              className="bg-surface border border-border rounded-2xl p-8 hover:bg-subtle hover:border-accent transition-all duration-250"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center mb-6">
                <Icon size={24} className="text-accent" />
              </div>
              <p className="text-label font-mono text-text-faint uppercase tracking-widest mb-2">
                {number}
              </p>
              <h3 className="text-display-md font-display font-semibold text-text mb-3">
                {title}
              </h3>
              <p className="text-body-md text-text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
