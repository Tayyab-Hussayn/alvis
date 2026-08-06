import type { Metadata } from 'next'
import { Hero }             from '@/components/sections/home/Hero'
import { ServicesBento }    from '@/components/sections/home/ServicesBento'
import { ProcessCascading } from '@/components/sections/home/ProcessCascading'
import { PortfolioPreview } from '@/components/sections/home/PortfolioPreview'
import { Testimonials }     from '@/components/sections/home/Testimonials'
import { StatsCounter }     from '@/components/sections/home/StatsCounter'
import { HomeCTA }          from '@/components/sections/home/HomeCTA'
import { siteUrl }          from '@/lib/site'

export const metadata: Metadata = {
  title: 'Alvis | High-Performance Marketing Agency',
  description:
    'Data-driven strategies. Creative content. Real results that scale your business with mathematical precision and creative flair.',
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'Alvis | High-Performance Marketing Agency',
    description: 'Data-driven strategies and creative content for real business growth.',
    url: siteUrl,
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Alvis Marketing Agency' }],
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <ProcessCascading />
      <PortfolioPreview />
      <Testimonials />
      <StatsCounter />
      <HomeCTA />
    </>
  )
}
