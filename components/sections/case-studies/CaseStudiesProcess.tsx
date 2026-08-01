'use client'

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We analyze your business, audience and competitors.',
    color: '#e63946',
    chip: '#fde8ea',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
  },
  {
    num: '02',
    title: 'Strategize',
    desc: 'We create a customized strategy tailored to your goals.',
    color: '#f59e0b',
    chip: '#fdf0dd',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </>
    ),
  },
  {
    num: '03',
    title: 'Execute',
    desc: 'Our team implements the plan with precision and creativity.',
    color: '#3b82f6',
    chip: '#e8f1fd',
    icon: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />,
  },
  {
    num: '04',
    title: 'Optimize',
    desc: 'We continuously monitor and optimize for better performance.',
    color: '#16a34a',
    chip: '#e3f7ec',
    icon: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  },
  {
    num: '05',
    title: 'Grow',
    desc: 'We scale successful campaigns for maximum impact and growth.',
    color: '#8b5cf6',
    chip: '#eee9fd',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
  },
]

export function CaseStudiesProcess() {
  return (
    <section className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        <div className="lg:col-span-3">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
            Our Proven Process
          </span>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', lineHeight: '1.2', letterSpacing: '-0.03em', color: '#0d0d0d' }}
          >
            A Strategic Approach That Delivers <span style={{ color: '#e63946' }}>Results</span>
          </h2>
        </div>

        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative text-center">
              {i > 0 && (
                <span className="hidden lg:block absolute -left-[18px] top-[26px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </span>
              )}
              <span
                className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ background: s.chip, color: s.color }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <div className="font-display font-extrabold text-[15px] mb-1" style={{ color: '#e63946' }}>{s.num}</div>
              <h3 className="font-bold text-[13.5px] mb-1.5" style={{ color: '#0d0d0d' }}>{s.title}</h3>
              <p className="text-[11.5px]" style={{ lineHeight: '1.55', color: '#5b403f' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
