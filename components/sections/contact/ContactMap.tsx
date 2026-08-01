'use client'

import { useScrollReveal } from '@/components/animations/useScrollReveal'

export function ContactMap() {
  const mapRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div ref={mapRef} className="max-w-[1280px] mx-auto rounded-3xl overflow-hidden" style={{ border: '1px solid #f3dedd' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/contact/map.png"
          alt="Map showing the Alvis office at 123 Marketing Street, New York"
          loading="lazy"
          decoding="async"
          className="w-full h-auto block"
        />
      </div>
    </section>
  )
}
