import type { Metadata } from 'next'
import { ServicesHero }    from '@/components/sections/services/ServicesHero'
import { ServicesGrid }    from '@/components/sections/services/ServicesGrid'
import { ServiceDeepDives } from '@/components/sections/services/ServiceDeepDives'
import { OurProcess }      from '@/components/sections/services/OurProcess'
import { TechStack }       from '@/components/sections/services/TechStack'
import { WhyAlvis }        from '@/components/sections/services/WhyAlvis'
import { ServicesCTA }     from '@/components/sections/services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Services | Alvis Digital Marketing & IT Agency',
  description:
    'Full-service digital marketing and IT solutions: web design, SEO, PPC, social media, branding, UI/UX, content marketing, and IT consulting.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServiceDeepDives />
      <OurProcess />
      <TechStack />
      <WhyAlvis />
      <ServicesCTA />
    </>
  )
}
