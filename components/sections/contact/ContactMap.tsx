'use client'

import { useScrollReveal } from '@/components/animations/useScrollReveal'
import { mapsUrl, addressLine, address } from '@/lib/site'

export function ContactMap() {
  const mapRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div
        ref={mapRef}
        className="max-w-[1280px] mx-auto rounded-3xl overflow-hidden relative group"
        style={{ border: '1px solid #f3dedd' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/contact/map.png"
          alt="World map showing Alvis serves clients globally"
          loading="lazy"
          decoding="async"
          className="w-full h-auto block"
        />

        {/* Address card + directions link — the map is a static image, so this is
            the only way a visitor can actually navigate to the office. */}
        <div className="absolute left-5 bottom-5 md:left-8 md:bottom-8 max-w-[280px]">
          <div
            className="rounded-2xl p-5 backdrop-blur"
            style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid #f3dedd', boxShadow: '0 18px 40px -22px rgba(39,23,23,0.35)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e63946"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                className="mt-[2px] shrink-0"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-[13px] font-bold" style={{ lineHeight: '1.5', color: '#271717' }}>
                <span className="block">{addressLine}</span>
                <span className="block font-normal" style={{ color: '#5b403f' }}>{address.country}</span>
              </span>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.06em] uppercase transition-colors hover:text-[#b7102a]"
              style={{ color: '#e63946' }}
            >
              Get Directions
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
