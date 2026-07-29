'use client'

import Link from 'next/link'

const stats = [
  {
    value: '50+',
    label: 'Clients Served',
    desc: 'Businesses across e-commerce, SaaS, and services that we have helped grow.',
  },
  {
    value: '200+',
    label: 'Projects Delivered',
    desc: 'Real projects across web development, automation, and AI integration.',
  },
  {
    value: '98%',
    label: 'Client Satisfaction',
    desc: 'Our clients keep coming back — that speaks louder than any metric.',
  },
  {
    value: '5+',
    label: 'Years of Experience',
    desc: 'Building and shipping digital products across industries worldwide.',
  },
]

export function StatsCounter() {
  return (
    <section className="bg-[#f8f9ff] py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: Headline + body + CTAs */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-tight text-[#0b1c30]">
                We Turn Ideas into <br />
                <span className="text-[#004ac6]">Technical Reality</span>
              </h2>
              <p className="text-[18px] leading-relaxed text-[#434655] max-w-lg">
                From complex software architectures to seamless automation workflows, we bridge the gap between creative vision and robust technical execution.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-[#004ac6] text-white px-8 py-4 rounded-full text-[14px] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="border border-[#c3c6d7] text-[#0b1c30] px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-[#eff4ff] transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: 2x2 stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map(({ value, label, desc }) => (
              <div
                key={label}
                className="p-10 bg-white border border-[#c3c6d7]/30 rounded-xl shadow-lg shadow-[#004ac6]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#004ac6]/10"
              >
                <div className="text-[42px] font-extrabold text-[#0b1c30] leading-none mb-3">
                  {value}
                </div>
                <div className="inline-block px-4 py-1 bg-[#0b1c30] text-white rounded-full text-[11px] uppercase tracking-wider font-bold mb-4">
                  {label}
                </div>
                <p className="text-[15px] leading-snug text-[#434655]">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
