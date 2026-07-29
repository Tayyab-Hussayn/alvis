import { notFound }     from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies }   from '@/data/caseStudies'
import { CaseStudyHero }    from '@/components/sections/case-studies/detail/CaseStudyHero'
import { CaseStudyContent } from '@/components/sections/case-studies/detail/CaseStudyContent'
import { CaseStudyResults } from '@/components/sections/case-studies/detail/CaseStudyResults'
import { RelatedStudies }   from '@/components/sections/case-studies/detail/RelatedStudies'
import { CaseStudyCTA }     from '@/components/sections/case-studies/detail/CaseStudyCTA'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = caseStudies.find((s) => s.slug === params.slug)
  if (!study) return {}
  return {
    title: `${study.title} | Alvis Case Study`,
    description: study.summary,
    openGraph: {
      images: [{ url: study.coverImage }],
    },
  }
}

export default function CaseStudyPage({ params }: PageProps) {
  const study = caseStudies.find((s) => s.slug === params.slug)
  if (!study) notFound()

  return (
    <>
      <CaseStudyHero    study={study} />
      <CaseStudyContent study={study} />
      <CaseStudyResults study={study} />
      <RelatedStudies   currentSlug={study.slug} />
      <CaseStudyCTA />
    </>
  )
}
