'use client'

import type { ReactNode } from 'react'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

/* ── Palette ──────────────────────────────────────────────────── */
const RED       = '#e63946'
const CARD_BG   = '#fdeeed'
const CARD_BD   = '#f8e0df'
const ICON_BG   = '#fad6d5'
const PANEL_BG  = '#fffbfb'
const TITLE     = '#1c1414'
const BODY      = '#5b4948'
const MUTED     = '#a98d8c'

const stroke = {
  fill: 'none',
  stroke: RED,
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* ── Card 1 visual: two analytics panels ──────────────────────── */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// x = 12 + i*29, y mapped from value against a 0–4k axis
const WEEK_PTS = '12,40 41,78 70,71 99,79 128,62 157,74 186,37'

function GrowthVisual() {
  return (
    <div className="flex gap-3 h-full">
      {/* Weekly line chart */}
      <div className="relative flex-1 min-w-0 rounded-2xl px-3 py-2.5 flex flex-col" style={{ background: 'rgba(255,255,255,0.55)' }}>
        <div className="flex-1 flex gap-1.5 min-h-0">
          <div className="flex flex-col justify-between py-0.5 text-[8px]" style={{ color: MUTED }}>
            {['4k', '3k', '2k', '1k', '0'].map(t => <span key={t}>{t}</span>)}
          </div>
          <svg viewBox="0 0 198 110" preserveAspectRatio="none" className="flex-1 min-w-0 h-full">
            {[10, 32.5, 55, 77.5, 100].map(y => (
              <line key={y} x1="0" y1={y} x2="198" y2={y} stroke="#f3dcdb" strokeWidth="1" />
            ))}
            {/* callout stem to the Wed point */}
            <line x1="70" y1="34" x2="70" y2="71" stroke="#eebcbc" strokeWidth="1" strokeDasharray="3 3" />
            <polyline points={WEEK_PTS} fill="none" stroke={RED} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            {WEEK_PTS.split(' ').map(p => {
              const [x, y] = p.split(',')
              return <circle key={p} cx={x} cy={y} r="2.6" fill={RED} />
            })}
          </svg>
        </div>
        <div className="flex justify-between pl-5 pt-1 text-[8px]" style={{ color: MUTED }}>
          {DAYS.map(d => <span key={d}>{d}</span>)}
        </div>
        {/* value badge */}
        <div
          className="absolute text-[9px] font-bold text-white px-1.5 py-0.5 rounded"
          style={{ background: RED, left: '22%', top: '14%' }}
        >
          1,150
        </div>
      </div>

      {/* Total growth panel */}
      <div
        className="w-[46%] shrink-0 rounded-2xl px-3.5 py-3 flex flex-col"
        style={{ background: PANEL_BG, border: `1px solid ${CARD_BD}` }}
      >
        <p className="text-[9px] mb-0.5" style={{ color: MUTED }}>Total Growth</p>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[19px] font-bold leading-none" style={{ color: TITLE }}>23,849</span>
          <span className="text-[9px] font-semibold" style={{ color: '#16a34a' }}>↗ +18.6%</span>
        </div>
        <svg viewBox="0 0 170 62" preserveAspectRatio="none" className="flex-1 w-full min-h-0">
          <defs>
            <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={RED} stopOpacity="0.28" />
              <stop offset="100%" stopColor={RED} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M8,52 L52,44 L96,30 L140,14 L162,10 L162,62 L8,62 Z" fill="url(#growth-fill)" />
          <polyline points="8,52 52,44 96,30 140,14 162,10" fill="none" stroke={RED} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {[[8, 52], [52, 44], [96, 30], [140, 14]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="2.6" fill={RED} />
          ))}
        </svg>
        <div className="flex justify-between pt-1 text-[7.5px]" style={{ color: MUTED }}>
          <span>1–10 Aug</span><span>11–20 Aug</span>
          <span className="font-bold" style={{ color: TITLE }}>21–30 Aug</span>
          <span>1–10 Nov</span>
        </div>
      </div>
    </div>
  )
}

/* ── Card 2 visual: code + wireframe + floating pills ─────────── */
const CODE = [
  { t: '<head>',                              i: 0 },
  { t: '<meta charset="UTF-8">',              i: 1 },
  { t: '<meta name="viewport" content="',     i: 1 },
  { t: 'width, initial-scale=1.0">',          i: 0 },
  { t: '<title>Alvis Marketing</title>',      i: 1 },
  { t: '</style>',                            i: 0 },
  { t: 'body {',                              i: 1 },
  { t: 'font-family: Arial, sans-serif;',     i: 2 },
]

function CodeVisual() {
  return (
    <div className="relative h-full">
      <div className="font-mono text-[9.5px] leading-[1.75]" style={{ color: '#8c7a79' }}>
        {CODE.map((l, n) => (
          <p key={n} style={{ paddingLeft: `${l.i * 10}px` }}>{l.t}</p>
        ))}
      </div>

      {/* wireframe placeholder */}
      <div className="absolute right-0 top-2 w-[34%] rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.5)' }}>
        <div className="w-9 h-9 rounded-full mb-2.5" style={{ background: '#f7c9c8' }} />
        <div className="h-1.5 w-full rounded-full mb-1.5" style={{ background: '#f7d9d8' }} />
        <div className="h-1.5 w-4/5 rounded-full mb-1.5" style={{ background: '#f7d9d8' }} />
        <div className="h-1.5 w-3/5 rounded-full" style={{ background: '#f7d9d8' }} />
      </div>

      {/* floating pills */}
      <div className="absolute right-1 top-7 bg-white shadow-lg rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 24 24" {...stroke}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span className="text-[10.5px] font-semibold" style={{ color: TITLE }}>Download</span>
      </div>
      <div className="absolute right-[26%] bottom-3 bg-white shadow-lg rounded-full px-2.5 py-1.5 flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={TITLE} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><polyline points="8.5 12 11 14.5 15.5 9.5" />
        </svg>
        <span className="text-[10.5px] font-semibold" style={{ color: TITLE }}>Accessible</span>
      </div>
    </div>
  )
}

/* ── Card 3 visual: team avatars + review cards ───────────────── */
const AVATARS = [
  '/images/homepage/avatar-sarah.webp',
  '/images/homepage/avatar-daniel.webp',
  '/images/homepage/avatar-emily.webp',
  '/images/homepage/avatar-jason.webp',
]

const Stars = () => (
  <div className="flex gap-0.5 mb-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill={RED}>
        <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3" />
      </svg>
    ))}
  </div>
)

const ReviewCard = ({ className }: { className: string }) => (
  <div className={`absolute rounded-xl px-3.5 py-3 ${className}`} style={{ background: 'rgba(255,255,255,0.6)' }}>
    <Stars />
    <div className="h-1.5 w-full rounded-full mb-1.5" style={{ background: '#f2dedd' }} />
    <div className="h-1.5 w-3/5 rounded-full" style={{ background: '#f2dedd' }} />
  </div>
)

function TeamVisual() {
  return (
    <div className="relative h-full">
      <div className="flex -space-x-3.5 absolute left-0 top-1/2 -translate-y-1/2">
        {AVATARS.map(src => (
          <img key={src} src={src} alt="" loading="lazy" decoding="async" className="w-[46px] h-[46px] rounded-full object-cover" style={{ border: '3px solid #fdeeed' }} />
        ))}
        <div
          className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white text-[13px] font-bold"
          style={{ background: RED, border: '3px solid #fdeeed' }}
        >
          +3
        </div>
      </div>
      <ReviewCard className="right-0 top-1 w-[52%]" />
      <ReviewCard className="right-[9%] bottom-2 w-[52%]" />
    </div>
  )
}

/* ── Card 4 visual: layered browser windows ───────────────────── */
const Panels = () => (
  <div className="flex gap-2 p-2.5">
    {[0, 1, 2].map(i => <div key={i} className="flex-1 h-[52px] rounded-lg" style={{ background: '#f9cfce' }} />)}
  </div>
)

function BrowserVisual() {
  return (
    <div className="relative h-full">
      {/* stacked ghosts behind */}
      <div className="absolute left-0 bottom-3 w-[62%] rounded-xl opacity-40" style={{ background: PANEL_BG }}>
        <div className="h-5 flex items-center px-2 gap-1 border-b" style={{ borderColor: CARD_BD }}>
          {['#f5a3a3', '#f7cf9c', '#a8d8b0'].map(c => <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
        </div>
        <Panels />
      </div>
      <div className="absolute left-[8%] bottom-6 w-[70%] rounded-xl opacity-70" style={{ background: PANEL_BG }}>
        <div className="h-5 flex items-center px-2 gap-1 border-b" style={{ borderColor: CARD_BD }}>
          {['#f5a3a3', '#f7cf9c', '#a8d8b0'].map(c => <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
        </div>
        <Panels />
      </div>

      {/* front window */}
      <div className="absolute right-0 top-1 w-[78%] rounded-xl shadow-lg overflow-hidden" style={{ background: '#ffffff' }}>
        <div className="h-6 flex items-center px-2.5 gap-1.5 border-b" style={{ background: '#fffafa', borderColor: CARD_BD }}>
          {['#f5665f', '#f7bf4f', '#5cc46e'].map(c => <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <div className="flex-1 h-2 rounded-full ml-1" style={{ background: '#fbeceb' }} />
        </div>
        <Panels />
      </div>

      {/* plus + cursor */}
      <span className="absolute right-1 top-[46%] text-[15px] font-light" style={{ color: MUTED }}>+</span>
      <svg className="absolute right-[16%] bottom-3" width="20" height="20" viewBox="0 0 24 24" fill="#3d2d2d">
        <path d="M9 3.5a1.2 1.2 0 012.4 0v6.2h.6V5.6a1.2 1.2 0 012.4 0v4.1h.6V7.2a1.2 1.2 0 012.4 0v7.6c0 3.2-2 5.7-5.2 5.7-2.4 0-3.7-1-5-3L7 14.4a1.2 1.2 0 011.9-1.4l.1.2V3.5z" />
      </svg>
    </div>
  )
}

/* ── Card data ────────────────────────────────────────────────── */
const cards: { icon: ReactNode; title: string; desc: string; visual: ReactNode }[] = [
  {
    icon: <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></svg>,
    title: 'Results That Scale',
    desc: 'Our data-driven strategies are built to scale with your business, delivering consistent growth and measurable impact.',
    visual: <GrowthVisual />,
  },
  {
    icon: <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    title: 'Client-Focused, Not Developer-Centric',
    desc: 'We simplify the complex. Our solutions are easy to use, so you can focus on growth—not code.',
    visual: <CodeVisual />,
  },
  {
    icon: <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    title: 'Experienced & Creative Team',
    desc: 'Our passionate team brings strategy, creativity, and expertise together to elevate your brand.',
    visual: <TeamVisual />,
  },
  {
    icon: <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
    title: 'Custom Solutions, Not Templates',
    desc: "We don't believe in one-size-fits-all. Our custom solutions are tailored to your unique goals, not limited by templates.",
    visual: <BrowserVisual />,
  },
]

const bottomBar = [
  { label: 'Strategic Approach',  sub: 'Every decision is backed\nby research and data.', icon: <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></svg> },
  { label: 'Transparent Process', sub: 'Clear communication\nat every step.',            icon: <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91 0z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg> },
  { label: 'Measurable Results',  sub: 'We track what matters\nand deliver ROI.',        icon: <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><line x1="6" y1="20" x2="6" y2="13" /><line x1="12" y1="20" x2="12" y2="5" /><line x1="18" y1="20" x2="18" y2="10" /></svg> },
  { label: 'Reliable Partnership',sub: "We're with you for the\nlong run.",               icon: <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { label: 'Client Success First',sub: 'Your growth is our\nultimate priority.',          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={RED} stroke={RED} strokeWidth="1.5" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1.1L12 21.2l7.8-7.8 1.1-1.1a5.5 5.5 0 000-7.8z" /></svg> },
]

export function StatsCounter() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const cardsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.1 })
  const barRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.06 })

  return (
    <section className="py-[100px] px-5 md:px-8" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="block mb-5 text-[13px] font-bold tracking-[0.18em] uppercase" style={{ color: RED }}>
            Why Choose Alvis
          </span>
          <h2
            className="font-display font-extrabold mb-6"
            style={{ fontSize: 'clamp(2rem, 4.4vw, 3.5rem)', lineHeight: '1.1', letterSpacing: '-0.03em', color: TITLE }}
          >
            Why Businesses Choose <span style={{ color: RED }}>Alvis</span>
          </h2>
          <p className="mx-auto" style={{ fontSize: '17px', lineHeight: '1.65', color: '#7a6968', maxWidth: '46em' }}>
            We create meaningful connections and deliver tailored, results-driven solutions.
            <br className="hidden md:block" /> With creativity and a client-focused approach, we help your brand succeed.
          </p>
        </div>

        {/* ── 2×2 feature cards ── */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {cards.map(card => (
            <div
              key={card.title}
              className="rounded-[24px] p-7 md:p-8 transition-shadow duration-300"
              style={{ background: CARD_BG, border: `1px solid ${CARD_BD}` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 18px 40px -14px rgba(150,60,60,0.22)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* icon beside visual */}
              <div className="flex items-start gap-5 h-[172px] mb-8 overflow-hidden">
                <div className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center shrink-0" style={{ background: ICON_BG }}>
                  {card.icon}
                </div>
                <div className="relative flex-1 min-w-0 h-full">{card.visual}</div>
              </div>

              <h3 className="font-display font-bold mb-3" style={{ fontSize: '24px', letterSpacing: '-0.015em', color: TITLE }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: BODY }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Bottom feature bar ── */}
        <div className="rounded-[24px] px-8 py-8" style={{ background: CARD_BG }}>
          <div ref={barRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {bottomBar.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 px-5 py-3 ${i > 0 ? 'lg:border-l' : ''}`}
                style={{ borderColor: '#f6d9d8' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: ICON_BG }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold mb-1" style={{ fontSize: '14.5px', color: TITLE }}>{item.label}</p>
                  <p style={{ fontSize: '13.5px', lineHeight: '1.45', color: BODY, whiteSpace: 'pre-line' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
