'use client'

import Link from 'next/link'
import { Sparkles, Zap, Unlock, Wrench } from 'lucide-react'

const differentiators = [
  {
    icon: Sparkles,
    title: 'AI-Native by Default',
    desc: 'Every service we build uses AI where it creates real leverage — not as a gimmick, but as infrastructure.',
  },
  {
    icon: Zap,
    title: 'Ship in Weeks, Not Months',
    desc: 'No 6-month delivery timelines. We scope tightly and ship fast with modern stacks.',
  },
  {
    icon: Unlock,
    title: 'No Retainer Lock-In',
    desc: "Work with us project by project or ongoing — no long contracts that trap you when results don't come.",
  },
  {
    icon: Wrench,
    title: 'Technically Hands-On',
    desc: 'You talk directly with the people building your product. No account managers, no miscommunication.',
  },
]

export function WhyAlvis() {
  return (
    <section className="w-full bg-[#f8f9ff] py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left column */}
          <div className="flex flex-col gap-6 max-w-xl">
            <span className="text-[#004ac6] text-[12px] uppercase tracking-widest font-semibold">
              WHY ALVIS
            </span>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30]">
              {"We're not a typical agency"}
            </h2>
            <p className="text-[18px] text-[#434655] leading-relaxed">
              Most agencies overpromise and underdeliver. We do the opposite — smaller commitments, real output.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#004ac6] text-[#004ac6] px-8 py-3 text-[14px] font-semibold hover:bg-[#eff4ff] hover:-translate-y-0.5 transition-all duration-200"
              >
                {"Let's Talk"}
              </Link>
            </div>
          </div>

          {/* Right: 2×2 feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-[#c3c6d7]/20 shadow-lg p-8 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-[#eff4ff] rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-[#004ac6]" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-[#0b1c30] mb-2">{title}</h3>
                  <p className="text-[15px] text-[#434655] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
