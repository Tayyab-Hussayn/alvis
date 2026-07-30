'use client'

export function CaseStudiesHero() {
  return (
    <section className="w-full bg-white pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">

          {/* Left: headline */}
          <div>
            <span className="block text-[#004ac6] uppercase text-[12px] tracking-widest font-semibold mb-5">
              OUR WORK
            </span>
            <h1 className="font-bold leading-none tracking-tight text-[#0b1c30] mb-6"
              style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)' }}>
              Results we&apos;re<br />
              proud of.
            </h1>
            <p className="text-[18px] text-[#434655] leading-relaxed max-w-lg">
              Every number here represents a real business problem solved. No vanity metrics, no cherry-picked wins.
            </p>
          </div>

          {/* Right: stat counters */}
          <div className="grid grid-cols-3 gap-6 lg:gap-8 pb-2">
            {[
              { value: '9', label: 'Case Studies' },
              { value: '50+', label: 'Total Clients' },
              { value: '200+', label: 'Projects Shipped' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-start">
                <span className="font-extrabold text-[#004ac6] leading-none mb-2"
                  style={{ fontSize: 'clamp(2.25rem,4vw,3rem)' }}>
                  {value}
                </span>
                <span className="text-[#434655] text-[13px] uppercase tracking-widest font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 h-px bg-[#c3c6d7]/30" />
      </div>
    </section>
  )
}
