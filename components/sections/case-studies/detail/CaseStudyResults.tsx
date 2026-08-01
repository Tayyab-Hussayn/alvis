import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { CaseStudy } from '@/data/caseStudies'

interface Props { study: CaseStudy }

export function CaseStudyResults({ study }: Props) {
  return (
    <section className="py-20 md:py-28" style={{ background: '#0a1b3d' }}>
      <Container>
        <SectionLabel className="mb-8 [&>span:first-child]:bg-white/30 [&>span:last-child]:text-white/50">
          By the Numbers
        </SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {study.results.map((r) => (
            <div key={r.metric} className="text-center sm:text-left">
              <div className="w-8 h-0.5 bg-accent mx-auto sm:mx-0 mb-6" />
              <p className="text-display-2xl font-display font-bold text-white">
                {r.value}
              </p>
              <p className="text-body-md text-white/50 mt-2">{r.metric}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
