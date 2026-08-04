'use client'

import { useScrollReveal } from '@/components/animations/useScrollReveal'

const logos = [
  { src: '/images/homepage/logo-boulevard.png',    alt: 'Boulevard',      cls: 'h-10' },
  { src: '/images/homepage/logo-depop.png',        alt: 'Depop',          cls: 'h-9' },
  { src: '/images/homepage/logo-eagleview-1.png',  alt: 'EagleView',       cls: 'h-10' },
  { src: '/images/homepage/logo-grailed.png',      alt: 'Grailed',        cls: 'h-9' },
  { src: '/images/homepage/logo-phorest.png',      alt: 'Phorest',        cls: 'h-9' },
  { src: '/images/homepage/logo-retool.png',       alt: 'Retool',         cls: 'h-9' },
  { src: '/images/homepage/logo-servicetitan_logo_black_2.png', alt: 'ServiceTitan', cls: 'h-10' },
  { src: '/images/homepage/logo-simpro.png',       alt: 'Simpro',         cls: 'h-9' },
  { src: '/images/homepage/logo-quoteiq.png',      alt: 'QuoteIQ',        cls: 'h-9' },
  { src: '/images/homepage/logo-images.png',       alt: 'Images',         cls: 'h-9' },
]

export function TrustedBrands() {
  const headerRef = useScrollReveal<HTMLParagraphElement>()

  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">
        <p ref={headerRef} className="text-center text-[12px] font-bold uppercase tracking-[0.1em] mb-12" style={{ color: '#e63946' }}>
          Trusted by 20+ brands
        </p>

        {/* Horizontal scrolling logos */}
        <div
          className="relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex gap-16 items-center w-max py-4" style={{ animation: 'logo-scroll 20s linear infinite' }}>
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.cls} w-auto`}
                loading="lazy"
                decoding="async"
                style={{ transition: 'transform 0.3s, filter 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.filter = 'brightness(1.2)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
