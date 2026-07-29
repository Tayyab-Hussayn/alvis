import type { Metadata } from 'next'
import { Hero }             from '@/components/sections/home/Hero'
import { ServicesBento }    from '@/components/sections/home/ServicesBento'
import { ProcessCascading } from '@/components/sections/home/ProcessCascading'
import { PortfolioPreview } from '@/components/sections/home/PortfolioPreview'
import { StatsCounter }     from '@/components/sections/home/StatsCounter'
import { Testimonials }     from '@/components/sections/home/Testimonials'
import { BlogPreview }      from '@/components/sections/home/BlogPreview'
import { HomeCTA }          from '@/components/sections/home/HomeCTA'

export const metadata: Metadata = {
  title: 'Alvis | Digital Marketing & IT Services Agency',
  description:
    'Alvis is a full-service digital marketing and IT agency. We help ambitious businesses grow through strategy, design, and technology.',
  openGraph: {
    title: 'Alvis | Digital Marketing & IT Services Agency',
    description: 'Strategy, design, and technology for ambitious businesses.',
    url: 'https://alvis.agency',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
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
      <StatsCounter />
      <Testimonials />
      <BlogPreview />
      <HomeCTA />
    </>
  )
}
