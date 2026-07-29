import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import type { CaseStudy } from '@/data/caseStudies'

interface Props { study: CaseStudy }

export function CaseStudyHero({ study }: Props) {
  return (
    <section className="min-h-[80vh] relative flex flex-col justify-end pt-36 pb-20 overflow-hidden">
      {/* Background placeholder — replace with Image when covers are available */}
      <div className="absolute inset-0 bg-gradient-to-br from-text via-text/90 to-text/70" />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <Container className="relative z-10">
        <Badge className="mb-4 bg-white/10 text-white border border-white/20">
          {study.category}
        </Badge>

        <h1 className="text-display-xl font-display font-bold text-white max-w-3xl mb-6">
          {study.title}
        </h1>
        <p className="text-body-lg text-white/70 max-w-2xl mb-10">{study.summary}</p>

        {/* Results bar */}
        <div className="flex gap-8 flex-wrap">
          {study.results.map((r) => (
            <div key={r.metric}>
              <span className="text-display-lg font-display font-bold text-accent block">
                {r.value}
              </span>
              <p className="text-body-sm text-white/60">{r.metric}</p>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/20 text-body-sm text-white/50">
          <span>
            Client: <strong className="text-white font-semibold">{study.client}</strong>
          </span>
          <span>Tags: {study.tags.join(', ')}</span>
        </div>
      </Container>
    </section>
  )
}
