'use client'

import Link from 'next/link'

export function ServicesHero() {
  return (
    <section className="w-full bg-[#f8f9ff] py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Column */}
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#dbe1ff] text-[#004ac6] text-[12px] font-semibold uppercase tracking-widest">
              WHAT WE BUILD
            </div>
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-tight tracking-tight text-[#0b1c30]">
              Technical services that turn ideas into working software
            </h1>
            <p className="text-[18px] leading-relaxed text-[#434655] max-w-lg">
              From AI-powered automation to full-stack web products — Alvis builds what others only plan.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#004ac6] text-white text-[14px] font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                Get in Touch
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#c3c6d7] text-[#0b1c30] text-[14px] font-semibold hover:bg-[#e5eeff] hover:-translate-y-0.5 transition-all duration-200"
              >
                See Our Work
              </Link>
            </div>
          </div>

          {/* Right Column: CSS Dashboard Mockup */}
          <div className="relative w-full flex justify-center items-center py-8">
            <div className="relative w-full max-w-[460px]" style={{ perspective: '1000px' }}>
              <div
                className="bg-[#0b1c30] rounded-2xl p-6 shadow-2xl"
                style={{ transform: 'rotateY(-6deg) rotateX(3deg)' }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-400/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                  <div className="w-3 h-3 rounded-full bg-green-400/50" />
                  <span className="ml-3 text-[#c3c6d7]/30 text-[11px]">dashboard.alvis.app</span>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Automations', val: '142' },
                    { label: 'Time Saved',   val: '38h'  },
                    { label: 'ROI',          val: '4.2x' },
                  ].map(m => (
                    <div key={m.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="text-[#004ac6] text-[10px] uppercase tracking-wide mb-1">{m.label}</div>
                      <div className="text-white text-[20px] font-bold">{m.val}</div>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-[#c3c6d7]/40 text-[11px] mb-3">Weekly Output</div>
                  <div className="flex items-end gap-1.5 h-12">
                    {[40, 62, 48, 82, 55, 95, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          backgroundColor: '#004ac6',
                          opacity: i === 5 ? 1 : 0.25 + i * 0.12,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Ambient glow */}
              <div
                className="absolute inset-0 -z-10 pointer-events-none rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,74,198,0.12) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
