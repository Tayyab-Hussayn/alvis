'use client'

import { Search, Wrench, Rocket } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery & Scope',
    desc: 'We learn your business, constraints, and goals in a focused 60-min call. Scoping takes days, not weeks.',
  },
  {
    num: '02',
    icon: Wrench,
    title: 'Build & Iterate',
    desc: 'We ship working software fast, then refine based on real feedback. You see progress weekly.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Ship & Scale',
    desc: "Clean handoff with documentation. We stay available for support and scaling when you're ready.",
  },
]

export function OurProcess() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-[#004ac6] uppercase text-[12px] tracking-widest font-semibold mb-4">
            OUR PROCESS
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30] mb-4">
            Simple process, serious execution
          </h2>
          <p className="text-[18px] text-[#434655] leading-relaxed">
            No lengthy discovery phases, no scope creep. We move fast without cutting corners.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden md:block absolute top-[76px] left-[22%] right-[22%] h-px border-t-2 border-dashed border-[#c3c6d7]/40 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {steps.map(({ num, icon: Icon, title, desc }) => (
              <div
                key={num}
                className="bg-white rounded-2xl border border-[#c3c6d7]/20 p-6 shadow-lg flex flex-col relative hover:-translate-y-1 transition-all duration-200"
              >
                <span className="absolute top-4 right-4 text-[64px] font-bold text-[#004ac6]/10 leading-none select-none">
                  {num}
                </span>
                <div className="h-12 w-12 rounded-xl bg-[#e5eeff] flex items-center justify-center mb-6 shadow-sm">
                  <Icon size={22} className="text-[#004ac6]" />
                </div>
                <h3 className="text-[20px] font-semibold text-[#0b1c30] mb-2">{title}</h3>
                <p className="text-[15px] text-[#434655] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
