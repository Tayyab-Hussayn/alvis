import { CTABanner } from '@/components/sections/shared/CTABanner'

export function CaseStudiesCTA() {
  return (
    <CTABanner
      label="Start a Project"
      heading="Let's Create Your Success Story"
      body="Every case study here started with a conversation. Yours can too."
      primaryCTA={{ label: 'Get in Touch', href: '/contact' }}
    />
  )
}
