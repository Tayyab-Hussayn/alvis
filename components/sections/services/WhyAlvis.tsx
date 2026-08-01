'use client'

const reasons = [
  {
    title: 'Experienced Team',
    desc: 'Skilled professionals with years of experience in digital marketing.',
    chip: '#fde8ea',
    color: '#e63946',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: 'Data-Driven Approach',
    desc: 'We make decisions based on data to get real measurable results.',
    chip: '#e8f1fd',
    color: '#3b82f6',
    icon: <path d="M18 20V10M12 20V4M6 20v-6" />,
  },
  {
    title: 'ROI Focused',
    desc: 'Our strategies are designed to deliver maximum return on investment.',
    chip: '#eee9fd',
    color: '#8b5cf6',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
  },
  {
    title: '24/7 Support',
    desc: "We're here to help you at every step of your growth journey.",
    chip: '#e3f5f3',
    color: '#14a89b',
    icon: (
      <>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </>
    ),
  },
]

export function WhyAlvis() {
  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
            Why Choose Us
          </span>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', letterSpacing: '-0.03em', color: '#0d0d0d' }}
          >
            Your Growth is <span style={{ color: '#e63946' }}>Our Priority</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`text-center px-6 py-4 ${i > 0 ? 'lg:border-l' : ''}`}
              style={{ borderColor: '#f3dedd' }}
            >
              <span
                className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                style={{ background: r.chip, color: r.color }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {r.icon}
                </svg>
              </span>
              <h3 className="font-bold text-[14px] mb-2" style={{ color: '#0d0d0d' }}>{r.title}</h3>
              <p className="text-[12.5px] mx-auto max-w-[220px]" style={{ lineHeight: '1.6', color: '#5b403f' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
