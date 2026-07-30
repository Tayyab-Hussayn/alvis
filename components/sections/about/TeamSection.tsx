'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

const team = [
  {
    initials: 'TH',
    name: 'Tayyab H.',
    role: 'Founder & Technical Lead',
    bio: 'Full-stack dev and automation architect. Shipped 200+ projects. Obsessed with systems that scale.',
  },
  {
    initials: 'SK',
    name: 'Sarah K.',
    role: 'Design & Creative Lead',
    bio: 'UI/UX and brand designer. Makes complex products feel intuitive. 6 years in digital product design.',
  },
  {
    initials: 'OA',
    name: 'Omar A.',
    role: 'Growth & Automation Lead',
    bio: 'Runs outreach systems and AI workflows. Built lead generation infrastructure for 30+ businesses.',
  },
]

export function TeamSection() {
  return (
    <section className="w-full bg-[#f8f9ff] py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        <div className="text-center mb-16">
          <span className="block text-[#004ac6] uppercase text-[12px] tracking-widest font-semibold mb-4">
            THE TEAM
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30] mb-4">
            Small team, big output
          </h2>
          <p className="text-[18px] text-[#434655] leading-relaxed max-w-2xl mx-auto">
            Every person here ships code, writes copy, or runs campaigns. No passengers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(({ initials, name, role, bio }) => (
            <div
              key={name}
              className="bg-white rounded-2xl border border-[#c3c6d7]/20 p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 border-2 border-[#004ac6]/20 shrink-0"
                style={{ background: 'linear-gradient(135deg, #e5eeff 0%, #dce9ff 100%)' }}
              >
                <span className="text-[#004ac6] font-bold text-[22px]">{initials}</span>
              </div>
              <p className="text-[#0b1c30] font-bold text-[18px]">{name}</p>
              <span className="inline-block mt-2 mb-4 px-3 py-1 rounded-full bg-[#eff4ff] text-[#004ac6] text-[11px] font-semibold uppercase tracking-wide">
                {role}
              </span>
              <p className="text-[14px] text-[#434655] leading-relaxed">{bio}</p>
            </div>
          ))}

          {/* We're Growing card */}
          <div className="bg-white rounded-2xl border-2 border-dashed border-[#c3c6d7]/40 p-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[#eff4ff] flex items-center justify-center mb-4">
              <Plus size={22} className="text-[#004ac6]" />
            </div>
            <h3 className="text-[#0b1c30] font-bold text-[17px] mb-2">{"We're Growing"}</h3>
            <p className="text-[#434655] text-[14px] leading-relaxed mb-5">
              Think you belong here? We want to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#004ac6] text-[#004ac6] text-[13px] font-semibold hover:bg-[#eff4ff] transition-colors duration-200"
            >
              Say Hello
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
