'use client'

import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b7102a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    iconBg: 'rgba(183,16,42,0.05)',
    title: 'Social Media Marketing',
    desc: 'Build your brand and engage the right audience across all platforms.',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#485f84" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
    ),
    iconBg: 'rgba(72,95,132,0.08)',
    title: 'Paid Advertising',
    desc: 'Get high-quality leads with targeted ad campaigns that convert.',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#286182" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    iconBg: 'rgba(40,97,130,0.06)',
    title: 'SEO Optimization',
    desc: 'Rank higher on Google and drive organic traffic that stays.',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    iconBg: 'rgba(0,180,255,0.08)',
    title: 'Branding & Design',
    desc: 'Create a brand identity that leaves a lasting impression on your clients.',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#77C1C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    iconBg: 'rgba(119,193,193,0.08)',
    title: 'Content Marketing',
    desc: 'Content that connects, converts and builds customer loyalty.',
    href: '/services',
  },
]

export function ServicesBento() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="pb-[160px] px-5 md:px-8 max-w-[1280px] mx-auto">
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-xl">
          <span className="block mb-4 text-[12px] font-bold tracking-[0.1em] uppercase" style={{ color: '#b7102a' }}>
            OUR SERVICES
          </span>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: '1.2', letterSpacing: '-0.02em', color: '#271717' }}>
            Smart Solutions For{' '}
            <span style={{ color: '#b7102a' }}>Real Business Growth</span>
          </h2>
        </div>
        <div className="hidden md:block">
          <svg fill="none" height="40" viewBox="0 0 120 40" width="120">
            <path d="M5 35C20 15 45 15 60 35C75 55 100 55 115 35" stroke="#b7102a" strokeLinecap="round" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="relative p-8 rounded-3xl flex flex-col justify-between group"
            style={{ minHeight: '360px', background: '#ffffff', border: '1px solid rgba(228,190,188,0.3)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'box-shadow 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(0,0,0,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)')}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: s.iconBg, transition: 'transform 0.3s' }}>
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-[20px] mb-4" style={{ color: '#271717' }}>{s.title}</h3>
              <p className="text-[16px] leading-[1.5]" style={{ color: '#5b403f' }}>{s.desc}</p>
            </div>
            <a
              href={s.href}
              className="mt-6 w-10 h-10 rounded-full border flex items-center justify-center transition-all"
              style={{ borderColor: '#e4bebc' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#b7102a'; e.currentTarget.style.borderColor = '#b7102a'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#e4bebc'; e.currentTarget.style.color = 'inherit' }}
              aria-label={`Learn more about ${s.title}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
