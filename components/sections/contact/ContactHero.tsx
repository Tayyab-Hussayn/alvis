'use client'

const perks = ['Quick Response', 'Expert Support', 'Free Consultation']

export function ContactHero() {
  return (
    <section className="pt-40 pb-16 px-5 md:px-8" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-5">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-5" style={{ color: '#e63946' }}>
            Contact Us
          </span>

          <h1
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)', lineHeight: '1.08', letterSpacing: '-0.04em', color: '#0d0d0d' }}
          >
            Have Questions?<br />
            <span style={{ color: '#e63946' }}>Let&apos;s Talk.</span>
          </h1>

          <p className="mb-8 max-w-sm" style={{ fontSize: '16px', lineHeight: '1.7', color: '#5b403f' }}>
            We&apos;d love to hear from you. Send us a message and we&apos;ll get back to you soon.
          </p>

          <ul className="space-y-3">
            {perks.map(p => (
              <li key={p} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: '#fde8ea' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-[14px] font-medium" style={{ color: '#271717' }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/contact/hero-illustration.png" alt="Contact Alvis" className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}
