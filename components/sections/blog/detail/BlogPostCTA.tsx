import { CTABanner } from '@/components/sections/shared/CTABanner'

export function BlogPostCTA() {
  return (
    <CTABanner
      label="Work With Alvis"
      heading="Liked What You Read?"
      body="If this resonated, you'll love working with us. Let's talk about your business."
      primaryCTA={{ label: 'Book a Discovery Call', href: '/contact' }}
    />
  )
}
