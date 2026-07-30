'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Depends on scope — small automations ship in 1–2 weeks. Full web products typically take 4–8 weeks from kickoff to launch.',
  },
  {
    q: 'Do you work fixed-price or hourly?',
    a: 'Both. We scope fixed-price for defined deliverables and hourly for consulting or retainer work.',
  },
  {
    q: 'What tech stack do you use?',
    a: 'Next.js, TypeScript, Tailwind for web. n8n, Make for automation. OpenAI, Claude, and custom pipelines for AI. We match the stack to the job.',
  },
  {
    q: 'Can you work with our existing codebase?',
    a: "Yes. We've joined projects mid-build many times. We'll audit the code first and give you an honest assessment.",
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes — maintenance retainers or ad-hoc support. Most clients keep us on a light retainer post-launch.',
  },
  {
    q: 'What does it cost to work with you?',
    a: "Scoped projects start from $1,500. Ongoing retainers from $800/month. We're transparent about pricing from the first call.",
  },
]

export function ServicesFAQ() {
  return (
    <section className="w-full bg-white py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left sticky header */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="lg:sticky lg:top-40">
              <span className="block text-[#004ac6] uppercase text-[12px] tracking-widest font-semibold mb-4">
                FAQ
              </span>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30] mb-8">
                Common questions, straight answers
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-[#004ac6] text-[14px] font-semibold hover:opacity-70 transition-opacity group"
              >
                Still have questions? Get in touch
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: FAQ list */}
          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-[#c3c6d7]/30">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-6 border-b border-[#c3c6d7]/30">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-[17px] font-semibold text-[#0b1c30] leading-snug">{q}</h3>
                    <ChevronDown size={20} className="text-[#004ac6] mt-0.5 shrink-0 rotate-180" />
                  </div>
                  <p className="text-[15px] text-[#434655] pr-8 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
