'use client'

import { useEffect, useRef } from 'react'
import {
  Monitor, TrendingUp, Share2, Target, Palette, Layout, FileText, Server,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const iconItems = [
  { Icon: Monitor,    label: 'Web Design & Dev',    top: '10%',  left: '5%'  },
  { Icon: TrendingUp, label: 'SEO',                 top: '5%',   left: '40%' },
  { Icon: Share2,     label: 'Social Media',        top: '18%',  left: '70%' },
  { Icon: Target,     label: 'Google Ads & PPC',    top: '48%',  left: '10%' },
  { Icon: Palette,    label: 'Branding',            top: '55%',  left: '50%' },
  { Icon: Layout,     label: 'UI/UX Design',        top: '38%',  left: '78%' },
  { Icon: FileText,   label: 'Content Marketing',   top: '72%',  left: '22%' },
  { Icon: Server,     label: 'IT Consulting',       top: '75%',  left: '65%' },
]

export function ServicesHero() {
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !iconsRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')

      const icons = Array.from(iconsRef.current!.children) as HTMLElement[]
      icons.forEach((icon, i) => {
        gsap.from(icon, {
          opacity: 0,
          scale: 0.6,
          duration: 0.5,
          delay: 0.4 + i * 0.07,
          ease: 'back.out(1.7)',
        })
        gsap.to(icon, {
          y: i % 2 === 0 ? -8 : 8,
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })
    }

    init()
  }, [])

  return (
    <section className="relative min-h-[65vh] flex flex-col justify-center pt-36 pb-20 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left text */}
          <div className="lg:col-span-8">
            <SectionLabel className="mb-6">Our Services</SectionLabel>
            <h1 className="text-display-2xl font-display font-bold text-text mb-6">
              Every Service,<br />
              Engineered to<br />
              <span className="text-accent italic">Perform.</span>
            </h1>
            <p className="text-body-lg text-text-muted max-w-xl mb-10">
              We don&apos;t offer generic services. Each engagement is custom-built around your
              business, your market, and your goals. From design to digital marketing to IT —
              Alvis delivers results you can measure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">Get a Free Audit</Button>
              <Button href="/case-studies" variant="secondary">See Our Results</Button>
            </div>
          </div>

          {/* Right — icon cloud */}
          <div className="hidden lg:block lg:col-span-4">
            <div ref={iconsRef} className="relative h-80">
              {iconItems.map(({ Icon, label, top, left }) => (
                <div
                  key={label}
                  title={label}
                  className="group absolute w-14 h-14 rounded-2xl bg-surface border border-border shadow-sm flex items-center justify-center hover:-translate-y-1 hover:border-accent transition-all duration-200 cursor-default"
                  style={{ top, left }}
                >
                  <Icon size={22} className="text-text-muted group-hover:text-accent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
