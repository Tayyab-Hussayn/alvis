import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

interface CTABannerProps {
  label: string
  heading: string
  body: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
}

export function CTABanner({ label, heading, body, primaryCTA, secondaryCTA }: CTABannerProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#0a1b3d' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(230,57,70,0.16) 0%, transparent 70%)',
        }}
      />
      <Container className="relative z-10 text-center">
        <SectionLabel className="mb-6 justify-center [&>span:first-child]:bg-white/30 [&>span:last-child]:text-white/50">
          {label}
        </SectionLabel>
        <h2 className="text-display-xl font-display font-bold text-white mt-4 mb-5">
          {heading}
        </h2>
        <p className="text-body-lg text-white/60 max-w-xl mx-auto mb-10">{body}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={primaryCTA.href} variant="primary" size="lg" withArrow>
            {primaryCTA.label}
          </Button>
          {secondaryCTA && (
            <Button href={secondaryCTA.href} variant="secondary" size="lg" className="border-white/20 text-white hover:border-white/60">
              {secondaryCTA.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  )
}
