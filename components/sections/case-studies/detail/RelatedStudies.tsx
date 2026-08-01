'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { caseStudies } from '@/data/caseStudies'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

interface Props { currentSlug: string }

export function RelatedStudies({ currentSlug }: Props) {
  const related = caseStudies.filter((s) => s.slug !== currentSlug).slice(0, 3)

  const headerRef = useScrollReveal<HTMLHeadingElement>()
  const studiesRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="py-20 md:py-28 bg-subtle">
      <Container>
        <h2 ref={headerRef} className="text-display-lg font-display font-bold text-text mb-12">
          More Work Like This
        </h2>

        <div ref={studiesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group block rounded-3xl overflow-hidden bg-surface border border-border hover:border-accent hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover */}
              <div className="aspect-video relative overflow-hidden bg-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={study.coverImage}
                  alt={study.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge>{study.category}</Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex gap-3 flex-wrap mb-3">
                  {study.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-label text-text-faint uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-display-md font-display font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                  {study.title}
                </h3>
                <div className="flex gap-6 pt-4 border-t border-border mt-4">
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
          ))}
        </div>
      </Container>
    </section>
  )
}
