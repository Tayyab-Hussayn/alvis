'use client'

import { motion } from 'framer-motion'
import { Search, Map, Zap, TrendingUp } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    Icon: Search,
    desc: 'We start by understanding your business, audience, market position, and goals. No assumptions — just clarity.',
  },
  {
    number: '02',
    title: 'Strategy',
    Icon: Map,
    desc: 'Every engagement gets a custom roadmap. We define what success looks like before we write a single line of code or run a single ad.',
  },
  {
    number: '03',
    title: 'Execution',
    Icon: Zap,
    desc: 'Our team executes with precision. Design, development, campaigns — done on time, within budget, to standard.',
  },
  {
    number: '04',
    title: 'Growth',
    Icon: TrendingUp,
    desc: 'We measure, analyze, and iterate. What works gets amplified. What doesn\'t gets cut.',
  },
]

export function Process() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-subtle">
      <Container>
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <SectionLabel className="mb-4">How We Work</SectionLabel>
            <h2 className="text-display-lg font-display font-bold text-text">
              A Process That<br />Delivers Every Time
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-body-lg text-text-muted">
              We don&apos;t guess. We research, plan, execute, and optimize — at every stage.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ number, title, Icon, desc }, index) => (
            <motion.div
              key={number}
              initial={{ x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
              className="relative"
            >
              {/* Horizontal connector line on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] h-px bg-border z-0 pointer-events-none" />
              )}
              <div className="relative z-10">
                <p className="text-display-xl font-display font-bold text-accent opacity-30 leading-none mb-4">
                  {number}
                </p>
                <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center mb-4">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-display-md font-display font-semibold text-text mt-4 mb-2">
                  {title}
                </h3>
                <p className="text-body-sm text-text-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
