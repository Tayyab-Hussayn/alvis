import { CTABanner } from '@/components/sections/shared/CTABanner'

export function ServicesCTA() {
  return (
    <CTABanner
      label="Let's Work Together"
      heading="Not Sure Which Service You Need?"
      body="Book a free 30-minute discovery call. We'll assess your situation and recommend the right approach — no obligation."
      primaryCTA={{ label: 'Book a Free Call', href: '/contact' }}
      secondaryCTA={{ label: 'See Case Studies', href: '/case-studies' }}
    />
  )
}
