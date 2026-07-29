import type { Metadata } from 'next'
import { CaseStudiesHero }   from '@/components/sections/case-studies/CaseStudiesHero'
import { CaseStudiesClient } from '@/components/sections/case-studies/CaseStudiesClient'
import { CaseStudiesCTA }    from '@/components/sections/case-studies/CaseStudiesCTA'

export const metadata: Metadata = {
  title: 'Case Studies | Alvis Agency',
  description:
    'Real results from real projects. Browse Alvis case studies across web development, SEO, branding, and digital marketing.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesClient />
      <CaseStudiesCTA />
    </>
  )
}
