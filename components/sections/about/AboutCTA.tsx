import { CTABanner } from '@/components/sections/shared/CTABanner'

export function AboutCTA() {
  return (
    <CTABanner
      label="Let's Work Together"
      heading="Ready to Meet Your Team?"
      body="Every project starts with a conversation. Tell us about your business and what you're trying to achieve."
      primaryCTA={{ label: 'Start a Project', href: '/contact' }}
      secondaryCTA={{ label: 'View Our Services', href: '/services' }}
    />
  )
}
