'use client'

import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#286182" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    iconBg: 'rgba(40,97,130,0.06)',
    title: 'SEO',
    desc: 'Ranking aur visibility behtar karna',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b7102a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    iconBg: 'rgba(183,16,42,0.05)',
    title: 'Social Media Marketing',
    desc: 'Content, posting, paid ads',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#485f84" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    iconBg: 'rgba(72,95,132,0.08)',
    title: 'ORM',
    desc: 'Online reputation aur reviews manage karna',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
      </svg>
    ),
    iconBg: 'rgba(0,180,255,0.08)',
    title: 'Digital Marketing',
    desc: 'Google Ads, email marketing, analytics',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#77C1C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="17" x2="22" y2="17"/><polyline points="6 21 6 17 18 21 18 17"/>
      </svg>
    ),
    iconBg: 'rgba(119,193,193,0.08)',
    title: 'Web Development',
    desc: 'Websites aur landing pages banana',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="8" height="12" rx="1" ry="1"/><path d="M13 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/><circle cx="6" cy="14" r=".5" fill="currentColor"/>
      </svg>
    ),
    iconBg: 'rgba(230,57,70,0.08)',
    title: 'App Development',
    desc: 'Android/iOS apps',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"/><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/><path d="M12 2v4m0 8v4M2 12h4m8 0h4"/>
      </svg>
    ),
    iconBg: 'rgba(139,92,246,0.08)',
    title: 'AI Automation',
    desc: 'Chatbots aur business automation',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
      </svg>
    ),
    iconBg: 'rgba(22,163,74,0.08)',
    title: 'Graphic Design',
    desc: 'Professional design for all your needs',
    href: '/services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    iconBg: 'rgba(217,119,6,0.08)',
    title: 'Video Editing & Animation',
    desc: 'Professional video production',
    href: '/services',
  },
]

export function ServicesBento() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="pb-[100px] px-5 md:px-8 max-w-[1280px] mx-auto">
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

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
