'use client'

/* 3D-style megaphone */
function MegaphoneArt() {
  return (
    <svg width="190" height="150" viewBox="0 0 190 150" fill="none" className="w-full max-w-[190px]">
      <path d="M118 28 58 62v26l60 34V28z" fill="#fff" />
      <path d="M118 28 88 45v60l30 17V28z" fill="#dbe4f0" />
      <ellipse cx="118" cy="75" rx="13" ry="47" fill="#3b82f6" />
      <ellipse cx="118" cy="75" rx="8" ry="38" fill="#1e5fd0" />
      <path d="M58 62H40a10 10 0 0 0-10 10v6a10 10 0 0 0 10 10h18V62z" fill="#3b82f6" />
      <path d="M50 88h14l-4 34a7 7 0 0 1-14 0l4-34z" fill="#3b82f6" />
      <g stroke="#e63946" strokeWidth="5" strokeLinecap="round">
        <path d="M144 44 158 32" />
        <path d="M150 75h18" />
        <path d="M144 106l14 12" />
      </g>
      <g fill="#e63946">
        <circle cx="34" cy="26" r="4" />
        <circle cx="176" cy="128" r="3.5" />
      </g>
    </svg>
  )
}

export function ContactCTA() {
  return (
    <section className="px-5 md:px-8 pb-24" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto rounded-3xl px-6 md:px-12 py-8" style={{ background: '#0a1b3d' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 flex justify-center">
            <MegaphoneArt />
          </div>

          <div className="md:col-span-5 text-center md:text-left">
            <h2
              className="font-display font-extrabold text-white mb-2"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 1.95rem)', letterSpacing: '-0.03em' }}
            >
              Ready to Start Your Project?
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.72)' }}>
              Book a free consultation today and let&apos;s grow your business together.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <a
              href="#top"
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
