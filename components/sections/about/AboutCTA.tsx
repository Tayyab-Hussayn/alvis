'use client'

/* Glossy 3D-style rocket launching from clouds */
function RocketArt() {
  return (
    <svg width="200" height="180" viewBox="0 0 200 180" fill="none" className="w-full max-w-[200px]">
      {/* flame */}
      <path d="M100 108c-9 0-16 10-16 20s7 16 16 16 16-6 16-16-7-20-16-20z" fill="#3b82f6" opacity="0.85" />
      <path d="M100 118c-5 0-9 6-9 12s4 9 9 9 9-3 9-9-4-12-9-12z" fill="#93c5fd" />
      {/* body */}
      <path d="M100 8c18 16 28 40 28 66v22H72V74c0-26 10-50 28-66z" fill="#fff" />
      <path d="M100 8c18 16 28 40 28 66v22h-28V8z" fill="#eef2f7" />
      {/* nose */}
      <path d="M100 8c8 7 14 17 18 28H82c4-11 10-21 18-28z" fill="#e63946" />
      {/* fins */}
      <path d="M72 76c-12 6-20 18-22 32l22-8V76z" fill="#e63946" />
      <path d="M128 76c12 6 20 18 22 32l-22-8V76z" fill="#c81e2f" />
      {/* window */}
      <circle cx="100" cy="62" r="13" fill="#0a1b3d" />
      <circle cx="100" cy="62" r="9" fill="#3b82f6" />
      <circle cx="96" cy="58" r="3" fill="#bfdbfe" />
      {/* clouds */}
      <g fill="#fff">
        <ellipse cx="70" cy="158" rx="30" ry="17" />
        <ellipse cx="104" cy="166" rx="36" ry="14" />
        <ellipse cx="138" cy="156" rx="26" ry="15" />
      </g>
      <g fill="#e63946">
        <circle cx="34" cy="60" r="3" />
        <circle cx="168" cy="44" r="2.5" />
        <circle cx="24" cy="112" r="2" />
      </g>
      <g fill="#3b82f6">
        <circle cx="176" cy="96" r="2.5" />
        <circle cx="46" cy="26" r="2" />
      </g>
    </svg>
  )
}

export function AboutCTA() {
  return (
    <section className="px-5 md:px-8 pb-24" style={{ background: '#fff8f7' }}>
      <div
        className="max-w-[1280px] mx-auto rounded-3xl relative overflow-hidden px-6 md:px-12 py-10"
        style={{ background: '#0a1b3d' }}
      >
        {/* dotted texture at the right edge */}
        <span
          className="absolute right-0 top-0 h-full w-1/3 pointer-events-none opacity-[0.12]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 flex justify-center">
            <RocketArt />
          </div>

          <div className="md:col-span-5 text-center md:text-left">
            <h2
              className="font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', lineHeight: '1.2', letterSpacing: '-0.03em' }}
            >
              Let&apos;s Build Something<br />
              Amazing <span style={{ color: '#e63946' }}>Together</span>
            </h2>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-end gap-5">
            <p className="text-center md:text-right" style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.72)' }}>
              We&apos;re ready to help you grow your business<br className="hidden md:block" /> and achieve your goals.
            </p>
            <a
              href="/contact"
              className="flex items-center gap-3 rounded-full text-white text-[13px] font-bold pl-7 pr-2 py-2 transition-transform hover:scale-[1.02]"
              style={{ background: '#e63946', boxShadow: '0 20px 40px -14px rgba(230,57,70,0.5)' }}
            >
              Get Free Consultation
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
