import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { ServicesGrid } from '@/components/sections/services/ServicesGrid'
import { OurProcess }   from '@/components/sections/services/OurProcess'
import { WhyAlvis }     from '@/components/sections/services/WhyAlvis'
import { ServicesCTA }  from '@/components/sections/services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Services | Smart Solutions For Real Growth — Alvis',
  description:
    'Data-driven digital marketing services that help businesses grow, generate leads and maximize ROI — social media, SEO, branding, content, paid ads and analytics.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <OurProcess />
      <WhyAlvis />
      <ServicesCTA />
    </>
  )
}
