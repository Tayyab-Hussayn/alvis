'use client'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import type { CaseStudy } from '@/data/caseStudies'
import { useScrollRevealGroup } from '@/components/animations/useScrollReveal'

interface Props { study: CaseStudy }

export function CaseStudyContent({ study }: Props) {
  const contentRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="py-20 bg-bg">
      <Container>
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content — 2/3 */}
          <div className="lg:col-span-2">
            <h2 className="text-display-md font-display font-semibold text-text mb-4">
              The Challenge
            </h2>
            <p className="text-body-lg text-text-muted leading-relaxed">
              {study.challenge}
            </p>

            <h2 className="text-display-md font-display font-semibold text-text mb-4 mt-12">
              Our Solution
            </h2>
            <p className="text-body-lg text-text-muted leading-relaxed">
              {study.solution}
            </p>

            <h2 className="text-display-md font-display font-semibold text-text mb-4 mt-12">
              The Outcome
            </h2>
            <p className="text-body-lg text-text-muted leading-relaxed">
              {study.outcome}
            </p>
          </div>

          {/* Sidebar — 1/3 */}
          <aside>
            <div className="bg-subtle rounded-2xl p-8 sticky top-24 border border-border">
              <div className="space-y-5">
                <div>
                  <p className="text-label text-text-faint uppercase tracking-widest mb-1">Client</p>
                  <p className="text-body-md font-semibold font-display text-text">{study.client}</p>
                </div>

                <div>
                  <p className="text-label text-text-faint uppercase tracking-widest mb-1">Category</p>
                  <p className="text-body-md text-text">{study.category}</p>
                </div>

                <div>
                  <p className="text-label text-text-faint uppercase tracking-widest mb-2">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag} className="text-[11px]">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-label text-text-faint uppercase tracking-widest mb-3">Results</p>
                  <ul className="space-y-3">
                    {study.results.map((r) => (
                      <li key={r.metric} className="flex items-center justify-between">
                        <span className="text-body-sm text-text-muted">{r.metric}</span>
                        <span className="text-body-sm font-bold font-display text-accent">
                          {r.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button href="/contact" variant="primary" className="w-full mt-8">
                Start a Similar Project
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
