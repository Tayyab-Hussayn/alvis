import { CTABanner } from '@/components/sections/shared/CTABanner'

export function CaseStudyCTA() {
  return (
    <CTABanner
      label="Let's Work Together"
      heading="Ready to Be Our Next Success Story?"
      body="Tell us about your project and let's build something worth talking about."
      primaryCTA={{ label: 'Start a Project', href: '/contact' }}
      secondaryCTA={{ label: 'View All Work', href: '/case-studies' }}
    />
  )
}
