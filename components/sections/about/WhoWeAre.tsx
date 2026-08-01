'use client'

const stats = [
  {
    value: '10+',
    label: 'Years of Experience',
    chip: '#e8f1fd',
    color: '#3b82f6',
    icon: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
      </>
    ),
  },
  {
    value: '100+',
    label: 'Happy Clients',
    chip: '#fde8ea',
    color: '#e63946',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </>
    ),
  },
  {
    value: '250+',
    label: 'Projects Completed',
    chip: '#e3f5f3',
    color: '#14a89b',
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
]

export function WhoWeAre() {
  return (
    <section className="px-5 md:px-8 pb-24" style={{ background: '#fff8f7' }}>
      <div
        className="max-w-[1280px] mx-auto bg-white rounded-3xl p-6 md:p-8"
        style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/office-reception.png"
            alt="Alvis office reception"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div>
            <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: '#e63946' }}>
              Our Story
            </span>

            <h2
              className="font-display font-extrabold mb-5"
              style={{ fontSize: 'clamp(1.9rem, 3vw, 2.5rem)', lineHeight: '1.15', letterSpacing: '-0.03em', color: '#0d0d0d' }}
            >
              Who <span style={{ color: '#e63946' }}>We Are</span>
            </h2>

            <p className="mb-8" style={{ fontSize: '16px', lineHeight: '1.65', color: '#5b403f' }}>
              Alvis is a results-driven digital marketing agency committed to helping businesses grow online.
              We combine creativity, data and technology to build strategies that deliver real, measurable results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-2xl p-3"
                  style={{ background: '#fffbfb', border: '1px solid #f8e0df' }}
                >
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: s.chip, color: s.color }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block font-display font-extrabold text-[18px]" style={{ color: '#0d0d0d' }}>{s.value}</span>
                    <span className="block text-[12px]" style={{ color: '#8f6f6e' }}>{s.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
