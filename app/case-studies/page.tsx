import type { Metadata } from 'next'
import { CaseStudiesHero }        from '@/components/sections/case-studies/CaseStudiesHero'
import { CaseStudiesClient }      from '@/components/sections/case-studies/CaseStudiesClient'
import { CaseStudiesImpact }      from '@/components/sections/case-studies/CaseStudiesImpact'
import { CaseStudiesTestimonial } from '@/components/sections/case-studies/CaseStudiesTestimonial'
import { CaseStudiesProcess }     from '@/components/sections/case-studies/CaseStudiesProcess'
import { CaseStudiesCTA }         from '@/components/sections/case-studies/CaseStudiesCTA'

export const metadata: Metadata = {
  title: 'Case Studies | Real Results. Real Impact. — Alvis',
  description:
    'Discover how we helped brands overcome challenges, achieve their goals, and grow beyond expectations.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesClient />
      <CaseStudiesImpact />
      <CaseStudiesTestimonial />
      <CaseStudiesProcess />
      <CaseStudiesCTA />
    </>
  )
}
