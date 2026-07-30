'use client'

const milestones = [
  {
    year: '2019',
    title: 'Founded',
    desc: 'Started as a two-person team focused on web development and local clients.',
    side: 'top',
  },
  {
    year: '2020',
    title: 'First AI Project',
    desc: 'Built our first automation pipeline for a SaaS client. Became obsessed with workflow efficiency.',
    side: 'bottom',
  },
  {
    year: '2021',
    title: 'Team Expanded',
    desc: 'Brought in design and growth expertise. First international clients from UK and UAE.',
    side: 'top',
  },
  {
    year: '2023',
    title: '50 Clients',
    desc: 'Crossed 50 active clients across 3 continents. Doubled down on AI-native tooling.',
    side: 'bottom',
  },
  {
    year: '2025',
    title: '200+ Projects',
    desc: '200+ shipped projects. Still small by design, still building things we\'re proud of.',
    side: 'top',
  },
]

export function Recognition() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        <div className="text-center mb-16">
          <span className="block text-[#004ac6] uppercase text-[12px] tracking-widest font-semibold mb-4">
            OUR JOURNEY
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30]">
            From two people to three continents
          </h2>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#c3c6d7]/50 -translate-y-1/2" />

          <div className="grid grid-cols-5 gap-4 relative">
            {milestones.map(({ year, title, desc, side }) => (
              <div key={year} className="relative flex flex-col items-center">
                {/* Top card */}
                {side === 'top' && (
                  <div className="bg-[#f8f9ff] rounded-xl border border-[#c3c6d7]/20 p-4 mb-6 text-center">
                    <span className="text-[#004ac6] font-bold text-[13px] block mb-1">{year}</span>
                    <p className="text-[#0b1c30] font-semibold text-[14px] mb-1">{title}</p>
                    <p className="text-[#434655] text-[12px] leading-relaxed">{desc}</p>
                  </div>
                )}
                {side === 'bottom' && <div className="mb-6 h-[120px]" />}

                {/* Node dot */}
                <div
                  className="w-4 h-4 rounded-full bg-[#004ac6] border-2 border-white relative z-10"
                  style={{ boxShadow: '0 0 0 3px rgba(0,74,198,0.2)' }}
                />

                {/* Bottom card */}
                {side === 'bottom' && (
                  <div className="bg-[#f8f9ff] rounded-xl border border-[#c3c6d7]/20 p-4 mt-6 text-center">
                    <span className="text-[#004ac6] font-bold text-[13px] block mb-1">{year}</span>
                    <p className="text-[#0b1c30] font-semibold text-[14px] mb-1">{title}</p>
                    <p className="text-[#434655] text-[12px] leading-relaxed">{desc}</p>
                  </div>
                )}
                {side === 'top' && <div className="mt-6 h-[120px]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-4">
          {milestones.map(({ year, title, desc }) => (
            <div key={year} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#004ac6] mt-1 shrink-0" />
                <div className="w-px flex-1 bg-[#c3c6d7]/40 mt-2" />
              </div>
              <div className="pb-6">
                <span className="text-[#004ac6] font-bold text-[13px]">{year}</span>
                <p className="text-[#0b1c30] font-semibold text-[15px] mt-0.5">{title}</p>
                <p className="text-[#434655] text-[14px] leading-relaxed mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
