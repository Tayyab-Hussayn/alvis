'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { caseStudies } from '@/data/caseStudies'
import { cn } from '@/lib/utils'

const categories = [
  'All',
  'Web Development',
  'SEO',
  'Social Media',
  'Branding',
  'PPC',
  'UI/UX',
  'IT',
  'Content',
]

function CaseCard({ study }: { study: (typeof caseStudies)[0] }) {
  return (
    <motion.div
      layout
      initial={{ y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Link
        href={`/case-studies/${study.slug}`}
        data-cursor="card"
        data-cursor-label="View"
        className="group block rounded-3xl overflow-hidden bg-surface border border-border hover:border-accent hover:-translate-y-1 transition-all duration-300"
      >
        {/* Cover image */}
        <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-subtle to-border">
          <div className="absolute inset-0 bg-accent-soft/20 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-4 left-4">
            <Badge>{study.category}</Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6">
          <div className="flex gap-3 flex-wrap mb-3">
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-label text-text-faint uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-display-md font-display font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-200">
            {study.title}
          </h3>
          <p className="text-body-sm text-text-muted line-clamp-2 mb-4">
            {study.summary}
          </p>

          <div className="flex gap-6 pt-4 border-t border-border">
            {study.results.slice(0, 2).map((r) => (
              <div key={r.metric}>
                <span className="text-display-md font-display font-bold text-accent block">
                  {r.value}
                </span>
                <p className="text-label text-text-faint uppercase tracking-widest">
                  {r.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function CaseStudiesClient() {
  const [active, setActive] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered =
    active === 'All'
      ? caseStudies
      : caseStudies.filter(
          (s) =>
            s.category.toLowerCase().includes(active.toLowerCase()) ||
            s.tags.some((t) => t.toLowerCase().includes(active.toLowerCase())),
        )

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !gridRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      gsap.from(Array.from(gridRef.current!.children), {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.1,
      })
    }

    init()
  }, [])

  return (
    <>
      {/* Filter bar */}
      <div className="border-y border-border py-5 bg-surface sticky top-16 md:top-20 z-40">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'flex-shrink-0 rounded-full px-4 py-2 text-body-sm border transition-all duration-200',
                active === cat
                  ? 'bg-accent text-white border-accent'
                  : 'bg-subtle text-text-muted border-border hover:border-accent hover:text-accent',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 bg-bg">
        <Container>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((study) => (
                  <CaseCard key={study.slug} study={study} />
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-3 text-center py-20"
                >
                  <p className="text-body-lg text-text-muted">
                    No projects in this category yet.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </>
  )
}
