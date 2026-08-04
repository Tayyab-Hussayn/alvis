'use client'

import { Lightbulb, Target, Zap, TrendingUp } from 'lucide-react'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We understand your business, goals and audience.',
    color: '#e63946',
    chip: '#fde8ea',
    icon: Lightbulb,
  },
  {
    num: '02',
    title: 'Strategize',
    desc: 'We create a customized strategy based on data and insights.',
    color: '#8b5cf6',
    chip: '#eee9fd',
    icon: Target,
  },
  {
    num: '03',
    title: 'Execute',
    desc: 'Our team implements the plan with precision and creativity.',
    color: '#3b82f6',
    chip: '#e8f1fd',
    icon: Zap,
  },
  {
    num: '04',
    title: 'Grow',
    desc: 'We optimize, analyze and scale for maximum results.',
    color: '#16a34a',
    chip: '#e3f7ec',
    icon: TrendingUp,
  },
]

export function OurProcess() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const stepsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto rounded-3xl py-16 px-6 md:px-12 relative overflow-hidden" style={{ background: '#0a1b3d' }}>
        <span
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />

        <div ref={headerRef} className="relative text-center mb-14">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
            Our Process
          </span>
          <h2 className="font-display font-extrabold text-white" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', letterSpacing: '-0.03em' }}>
            How <span style={{ color: '#e63946' }}>We</span> Work
          </h2>
        </div>

        <div ref={stepsRef} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* dashed connector on large screens */}
          <span
            className="hidden lg:block absolute left-[12%] right-[12%] top-[44px] h-px"
            style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.35) 50%, transparent 0%)', backgroundSize: '10px 1px' }}
          />

          {steps.map((s, i) => (
            <div key={s.num} className="relative text-center">
              {i > 0 && (
                <span
                  className="hidden lg:flex absolute -left-[26px] top-[32px] w-6 h-6 rounded-full items-center justify-center"
                  style={{ background: '#e63946' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </span>
              )}

              <span
                className="relative w-[88px] h-[88px] rounded-full bg-white mx-auto mb-5 flex items-center justify-center"
                style={{ color: s.color, boxShadow: '0 12px 30px -12px rgba(0,0,0,0.5)' }}
              >
                <span className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: s.chip }}>
                  <s.icon size={56} strokeWidth={1.8} />
                </span>
              </span>

              <div className="font-display font-extrabold text-[22px] mb-1" style={{ color: '#e63946' }}>{s.num}</div>
              <h3 className="font-bold text-[15px] text-white mb-2">{s.title}</h3>
              <p className="text-[12.5px] mx-auto max-w-[210px]" style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.65)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
