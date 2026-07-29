import type { Metadata } from 'next'
import { AboutHero }   from '@/components/sections/about/AboutHero'
import { OurStory }    from '@/components/sections/about/OurStory'
import { OurValues }   from '@/components/sections/about/OurValues'
import { TeamSection } from '@/components/sections/about/TeamSection'
import { Recognition } from '@/components/sections/about/Recognition'
import { AboutCTA }    from '@/components/sections/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About Alvis | Digital Marketing & IT Agency',
  description:
    'Meet the team behind Alvis — a digital marketing and IT agency built on transparency, craft, and measurable results.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurValues />
      <TeamSection />
      <Recognition />
      <AboutCTA />
    </>
  )
}
