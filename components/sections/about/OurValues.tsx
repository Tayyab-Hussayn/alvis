'use client'

import { Gem, MessageSquareMore, Layers, Users } from 'lucide-react'

const values = [
  {
    num: '01',
    Icon: Gem,
    title: 'Craft Over Speed',
    desc: "We won't ship something we're not proud of. Quality is our default state, not an upgrade.",
  },
  {
    num: '02',
    Icon: MessageSquareMore,
    title: 'Honest Before Polished',
    desc: "We tell clients what won't work before we agree to build it. Uncomfortable truths now beat expensive pivots later.",
  },
  {
    num: '03',
    Icon: Layers,
    title: 'Technical Depth First',
    desc: 'We understand what we build at the infrastructure level. Surface-level solutions never make it past our review.',
  },
  {
    num: '04',
    Icon: Users,
    title: 'Small Enough to Care',
    desc: 'We deliberately stay lean. Every client gets senior attention because we never overcommit.',
  },
]

export function OurValues() {
  return (
    <section className="w-full bg-white py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        <div className="text-center mb-16">
          <span className="block text-[#004ac6] uppercase text-[12px] tracking-widest font-semibold mb-4">
            HOW WE THINK
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30] mb-4">
            Four principles we never compromise on
          </h2>
          <p className="text-[18px] text-[#434655] leading-relaxed max-w-2xl mx-auto">
            Not wall-art values — how we actually make decisions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map(({ num, Icon, title, desc }) => (
            <div
              key={num}
              className="bg-[#f8f9ff] rounded-2xl border border-[#c3c6d7]/20 p-8 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="absolute top-4 right-6 text-[80px] font-bold leading-none select-none text-[#004ac6]/10">
                {num}
              </span>
              <div className="w-12 h-12 bg-[#eff4ff] rounded-xl flex items-center justify-center mb-6">
                <Icon size={22} className="text-[#004ac6]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#0b1c30] mb-2">{title}</h3>
              <p className="text-[15px] text-[#434655] leading-relaxed pr-8">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
