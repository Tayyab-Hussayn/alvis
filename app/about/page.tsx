import type { Metadata } from 'next'
import { AboutHero }           from '@/components/sections/about/AboutHero'
import { WhoWeAre }            from '@/components/sections/about/WhoWeAre'
import { ImpactNumbers }       from '@/components/sections/about/ImpactNumbers'
import { MissionVisionValues } from '@/components/sections/about/MissionVisionValues'
import { MeetExperts }         from '@/components/sections/about/MeetExperts'
import { TrustedBrands }       from '@/components/sections/about/TrustedBrands'
import { AboutCTA }            from '@/components/sections/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About Alvis | We Help Businesses Grow Faster',
  description:
    'Alvis is a results-driven digital marketing agency committed to helping businesses grow online with creativity, data and technology.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <ImpactNumbers />
      <MissionVisionValues />
      <MeetExperts />
      <TrustedBrands />
      <AboutCTA />
    </>
  )
}
