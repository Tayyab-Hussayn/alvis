import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { ServicesGrid } from '@/components/sections/services/ServicesGrid'
import { OurProcess }  from '@/components/sections/services/OurProcess'
import { WhyAlvis }    from '@/components/sections/services/WhyAlvis'
import { ServicesFAQ } from '@/components/sections/services/ServicesFAQ'
import { ServicesCTA } from '@/components/sections/services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Services | Alvis — Web Development, AI Automation & Lead Generation',
  description:
    'Technical services that ship: Next.js web products, AI automation pipelines, n8n workflows, and lead generation systems. Built fast, no lock-in.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <OurProcess />
      <WhyAlvis />
      <ServicesFAQ />
      <ServicesCTA />
    </>
  )
}
