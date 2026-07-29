'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { services } from '@/data/services'

/* ── Simple div-based service mockups ─────────────────────────── */

function WebDevMockup() {
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-3 h-3 rounded-full bg-error/60" />
        <span className="w-3 h-3 rounded-full bg-accent/40" />
        <span className="w-3 h-3 rounded-full bg-success/60" />
        <div className="flex-1 h-5 rounded bg-border ml-2" />
      </div>
      <div className="h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center px-4">
        <div className="w-16 h-3 rounded bg-accent/40" />
      </div>
      <div className="grid grid-cols-3 gap-2 flex-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg bg-surface border border-border" />
        ))}
      </div>
    </div>
  )
}

function SEOMockup() {
  const bars = [30, 45, 55, 65, 72, 80, 92]
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex flex-col gap-4">
      <p className="text-body-sm font-mono text-accent">Organic Traffic</p>
      <div className="flex-1 flex items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-accent/80 transition-all"
            style={{ height: `${h}%`, opacity: 0.5 + i * 0.07 }}
          />
        ))}
      </div>
      <div className="flex justify-between text-label text-text-faint">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
        <span>May</span><span>Jun</span><span>Jul</span>
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10 border border-success/20">
        <span className="text-body-sm font-semibold text-success">+218% organic traffic</span>
      </div>
    </div>
  )
}

function SocialMockup() {
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex justify-center items-center">
      <div className="w-40 rounded-3xl border-2 border-border bg-surface overflow-hidden shadow-md">
        <div className="h-6 bg-border/40 flex items-center justify-center">
          <span className="w-12 h-1.5 rounded bg-border" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-2 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-accent/30" />
              <div className="w-16 h-1.5 rounded bg-border" />
            </div>
            <div className="h-10 rounded-lg bg-accent-soft/60" />
            <div className="flex gap-3 mt-2">
              <div className="w-4 h-1.5 rounded bg-border" />
              <div className="w-4 h-1.5 rounded bg-border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PPCMockup() {
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex flex-col gap-4">
      <p className="text-body-sm font-mono text-accent">Campaign Performance</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'ROAS', value: '6.1x', color: 'text-success' },
          { label: 'CPA',  value: '-40%', color: 'text-accent'  },
          { label: 'CTR',  value: '4.8%', color: 'text-text'    },
          { label: 'Conv', value: '+130', color: 'text-success'  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-surface border border-border rounded-xl p-3">
            <p className="text-label text-text-faint mb-1">{label}</p>
            <p className={`text-display-md font-display font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl bg-surface border border-border p-3 flex flex-col gap-1.5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="flex-1 h-2 rounded bg-accent/20" style={{ width: `${80 - i * 15}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandingMockup() {
  const colors = ['#2563EB', '#0D0D0D', '#F9F9F7', '#6B7280']
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex flex-col gap-4">
      <div className="flex gap-3">
        {colors.map((c) => (
          <div key={c} className="w-10 h-10 rounded-full border border-border" style={{ background: c }} />
        ))}
      </div>
      <div className="bg-surface border border-border rounded-2xl p-4 flex-1 flex flex-col justify-center gap-3">
        <div className="w-24 h-5 rounded bg-accent/20" />
        <div className="font-display text-display-lg font-bold text-text">Aa</div>
        <div className="space-y-1.5">
          {['Plus Jakarta Sans', 'Inter', 'DM Mono'].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-label text-text-muted">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UIUXMockup() {
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex flex-col gap-3">
      <div className="flex gap-2">
        {['Wireframe', 'Design', 'Prototype'].map((t, i) => (
          <span
            key={t}
            className={`text-label px-3 py-1 rounded-full ${i === 1 ? 'bg-accent text-white' : 'bg-surface border border-border text-text-muted'}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex-1 bg-surface border border-border rounded-2xl p-4 flex flex-col gap-3">
        <div className="h-8 rounded-lg bg-accent/10 border border-accent/20" />
        <div className="grid grid-cols-2 gap-2 flex-1">
          <div className="rounded-lg bg-subtle border border-border" />
          <div className="rounded-lg bg-subtle border border-border" />
        </div>
        <div className="h-10 rounded-lg bg-accent flex items-center justify-center">
          <div className="w-16 h-2 rounded bg-white/50" />
        </div>
      </div>
    </div>
  )
}

function ContentMockup() {
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex flex-col gap-3">
      <div className="bg-surface border border-border rounded-2xl p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-label text-accent font-mono">SEO</span>
        </div>
        <div className="w-3/4 h-3 rounded bg-text/20" />
        <div className="w-full h-2 rounded bg-border" />
        <div className="w-5/6 h-2 rounded bg-border" />
        <div className="w-4/6 h-2 rounded bg-border" />
        <div className="flex gap-2 mt-2">
          {['Content', 'Strategy', 'SEO'].map((tag) => (
            <span key={tag} className="text-label text-accent bg-accent-soft px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-surface border border-border flex flex-col justify-end p-2">
            <div className="h-1.5 rounded bg-accent/30 mb-1" style={{ width: `${60 + i * 10}%` }} />
            <div className="h-1 rounded bg-border" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ITMockup() {
  return (
    <div className="rounded-3xl bg-subtle border border-border p-6 aspect-[4/3] flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-label font-mono text-text-muted">System Architecture</span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {['Frontend', 'API Layer', 'Database', 'Infrastructure'].map((layer, i) => (
          <div
            key={layer}
            className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2"
            style={{ opacity: 1 - i * 0.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-body-sm font-mono text-text">{layer}</span>
            <div className="ml-auto flex gap-1">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-5 h-1.5 rounded bg-accent/20" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mockups = [
  WebDevMockup, SEOMockup, SocialMockup, PPCMockup,
  BrandingMockup, UIUXMockup, ContentMockup, ITMockup,
]

interface ServiceBlockProps {
  service: (typeof services)[0]
  index: number
}

function ServiceBlock({ service, index }: ServiceBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null)
  const isEven   = index % 2 === 0
  const Mockup   = mockups[index]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !blockRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(blockRef.current, {
        opacity: 0,
        x: isEven ? -40 : 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: blockRef.current, start: 'top 80%' },
      })
    }

    init()
  }, [isEven])

  const textCol = (
    <div className="flex flex-col justify-center">
      <Badge className="mb-4 self-start capitalize">{service.category}</Badge>
      <h3 className="text-display-lg font-display font-bold text-text mt-3 mb-4">
        {service.title}
      </h3>
      <p className="text-body-lg text-text-muted mb-8">{service.longDescription}</p>
      <ul className="space-y-3 mb-8">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
            <span className="text-body-md text-text">{item}</span>
          </li>
        ))}
      </ul>
      <Button href={`/contact?service=${service.slug}`} variant="ghost" withArrow>
        Get a Quote for This
      </Button>
    </div>
  )

  const visualCol = <Mockup />

  return (
    <div
      ref={blockRef}
      id={service.slug}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 border-b border-border scroll-mt-24"
    >
      {isEven ? (
        <>
          {textCol}
          {visualCol}
        </>
      ) : (
        <>
          {visualCol}
          {textCol}
        </>
      )}
    </div>
  )
}

export function ServiceDeepDives() {
  return (
    <section className="py-10 bg-bg">
      <Container>
        {services.map((service, i) => (
          <ServiceBlock key={service.slug} service={service} index={i} />
        ))}
      </Container>
    </section>
  )
}
