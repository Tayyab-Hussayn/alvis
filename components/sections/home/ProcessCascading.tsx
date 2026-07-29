'use client'

import { Search, Map, Zap, TrendingUp } from 'lucide-react'

const steps = [
  {
    num: '1',
    label: '1 Week',
    icon: Search,
    title: '1 Discovery',
    desc: 'We start by understanding your business, audience, market position, and goals. No assumptions, just clarity.',
    position: 'lg:top-0 lg:left-0',
    bg: 'bg-[#eff4ff]',
    iconBg: 'bg-[#004ac6]/20',
    border: '',
  },
  {
    num: '2',
    label: '2 Weeks',
    icon: Map,
    title: '2 Strategy',
    desc: 'Every engagement gets a custom roadmap. We define what success looks like before we write a single line.',
    position: 'lg:top-[200px] lg:left-[35%]',
    bg: 'bg-white shadow-sm',
    iconBg: 'bg-[#004ac6]/10',
    border: 'border border-[#c3c6d7]/30',
  },
  {
    num: '3',
    label: '3-4 Weeks',
    icon: Zap,
    title: '3 Execution',
    desc: 'Our team executes with precision. Design, development, campaigns, done on time and within budget.',
    position: 'lg:top-[450px] lg:left-[10%]',
    bg: 'bg-white shadow-sm',
    iconBg: 'bg-[#004ac6]/10',
    border: 'border border-[#c3c6d7]/30',
  },
  {
    num: '4',
    label: 'Ongoing',
    icon: TrendingUp,
    title: '4 Growth',
    desc: "We measure, analyze, and iterate. What works gets amplified. What doesn't gets cut.",
    position: 'lg:top-[600px] lg:left-[55%]',
    bg: 'bg-[#eff4ff]',
    iconBg: 'bg-[#004ac6]/20',
    border: '',
  },
]

export function ProcessCascading() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 py-20 lg:py-[80px] bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1 bg-[#004ac6]/10 rounded-full text-[#004ac6] text-[12px] uppercase tracking-wider font-bold mb-4">
              How We Work
            </div>
            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-[#0b1c30] mb-3">
              A Proven Process for <br />Digital Success
            </h2>
            <p className="text-[16px] leading-relaxed text-[#434655] max-w-lg">
              We&apos;ve refined our workflow to ensure maximum efficiency and impact for every project we touch.
            </p>
          </div>

          {/* Timeline bar */}
          <div className="flex items-stretch rounded-lg overflow-hidden border border-[#c3c6d7]/30 h-14 w-56 flex-shrink-0">
            <div className="flex-1 bg-[#e5eeff] flex items-center justify-center">
              <span className="text-[12px] text-[#434655] font-bold">Jul 2025</span>
            </div>
            <div className="flex-1 bg-[#004ac6] flex items-center justify-center">
              <span className="text-[12px] text-white font-bold">Aug 2025</span>
            </div>
          </div>
        </div>

        {/* Cascading cards */}
        <div className="relative min-h-[900px] lg:min-h-[780px]">

          {/* Dashed connecting SVG arrows — desktop only */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block"
            viewBox="0 0 1000 800"
            fill="none"
            strokeDasharray="6 6"
            strokeWidth="2"
          >
            {/* Arrow 1 Discovery → 2 Strategy: right-center of card1 to left-center of card2 */}
            <path d="M297 82 C 360 82, 280 287, 350 287" stroke="#c3c6d7" />
            <circle cx="350" cy="287" r="3" fill="#c3c6d7" />
            {/* Arrow 2 Strategy → 3 Execution: bottom-left of card2 to top-right of card3 */}
            <path d="M350 369 C 310 400, 370 430, 397 462" stroke="#c3c6d7" />
            <circle cx="397" cy="462" r="3" fill="#c3c6d7" />
            {/* Arrow 3 Execution → 4 Growth: right-center of card3 to left-center of card4 */}
            <path d="M397 544 C 460 544, 480 697, 550 697" stroke="#c3c6d7" />
            <circle cx="550" cy="697" r="3" fill="#c3c6d7" />
          </svg>

          {steps.map(({ label, icon: Icon, title, desc, position, bg, iconBg, border }) => (
            <div
              key={title}
              className={`lg:absolute ${position} w-full lg:w-[380px] z-10 mt-4 lg:mt-0 transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className={`${bg} ${border} rounded-2xl p-6 flex items-stretch relative overflow-hidden min-h-[160px]`}>
                {/* Vertical duration pill */}
                <div className="w-10 bg-[#0b1c30] rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <span className="text-white text-[9px] font-bold uppercase tracking-widest whitespace-nowrap -rotate-90">
                    {label}
                  </span>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center text-[#004ac6] flex-shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="text-[20px] font-semibold text-[#0b1c30]">{title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#434655]">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
