import type { Metadata } from 'next'
import { AboutHero }   from '@/components/sections/about/AboutHero'
import { OurValues }   from '@/components/sections/about/OurValues'
import { TeamSection } from '@/components/sections/about/TeamSection'
import { Recognition } from '@/components/sections/about/Recognition'
import { AboutCTA }    from '@/components/sections/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About Alvis | Digital Agency Built to Ship',
  description:
    'Meet the Alvis team — a small, senior digital agency building web products, AI automation, and lead generation systems across 3 continents.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurValues />
      <TeamSection />
      <Recognition />
      <AboutCTA />
    </>
  )
}
