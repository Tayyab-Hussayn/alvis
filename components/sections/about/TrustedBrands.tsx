'use client'

import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const brands = [
  { name: 'Boulevard', src: '/images/homepage/logo-boulevard.png', alt: 'Boulevard' },
  { name: 'Depop', src: '/images/homepage/logo-depop.png', alt: 'Depop' },
  { name: 'EagleView', src: '/images/homepage/logo-eagleview-1.png', alt: 'EagleView' },
  { name: 'Grailed', src: '/images/homepage/logo-grailed.png', alt: 'Grailed' },
  { name: 'Phorest', src: '/images/homepage/logo-phorest.png', alt: 'Phorest' },
  { name: 'Retool', src: '/images/homepage/logo-retool.png', alt: 'Retool' },
  { name: 'ServiceTitan', src: '/images/homepage/logo-servicetitan_logo_black_2.png', alt: 'ServiceTitan' },
  { name: 'Simpro', src: '/images/homepage/logo-simpro.png', alt: 'Simpro' },
]

export function TrustedBrands() {
  const labelRef = useScrollReveal<HTMLParagraphElement>()
  const brandsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.06 })

  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">
        <p ref={labelRef} className="text-center text-[12px] font-bold uppercase tracking-[0.1em] mb-12" style={{ color: '#e63946' }}>
          Trusted by 20+ brands
        </p>
        <div ref={brandsRef} className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {brands.map(b => (
            <img
              key={b.name}
              src={b.src}
              alt={b.alt}
              className="h-12 w-auto"
              loading="lazy"
              decoding="async"
              style={{ transition: 'transform 0.3s, filter 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.filter = 'brightness(1.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
