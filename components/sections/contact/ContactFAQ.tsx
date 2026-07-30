'use client'

import { ChevronDown } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'

const faqs = [
  {
    q: 'How quickly will you respond?',
    a: "Within 24 hours on business days. If it's urgent, say so in your message.",
  },
  {
    q: 'Do you work with small businesses or just large companies?',
    a: 'Both. Our clients range from solo founders to teams of 50+. The right fit is more about ambition than company size.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: "No. Project-based work has no lock-in. Some services like SEO work best with 3–6 month commitments for results to compound, but we don't trap you.",
  },
  {
    q: "Can I see more work than what's on the website?",
    a: 'Yes — NDA-protected case studies are available on request. Just mention it in your message.',
  },
  {
    q: 'Do you work with clients outside your country?',
    a: 'Entirely remote. We have clients across 12+ countries. Time zones are manageable.',
  },
  {
    q: 'What happens after I send a message?',
    a: "We review your project, and if it's a good fit, we schedule a 30-minute discovery call — no charge. From there, we'll propose exact next steps.",
  },
]

export function ContactFAQ() {
  return (
    <section className="w-full bg-[#f8f9ff] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left sticky header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="block text-[#004ac6] uppercase text-[12px] tracking-widest font-semibold mb-4">
                COMMON QUESTIONS
              </span>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30] mb-4">
                Before you<br />reach out
              </h2>
              <p className="text-[18px] text-[#434655] leading-relaxed max-w-sm">
                The questions we hear most often — answered honestly.
              </p>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-7">
            <Accordion.Root type="single" collapsible className="flex flex-col border-t border-[#c3c6d7]/30">
              {faqs.map((faq, i) => (
                <Accordion.Item
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-[#c3c6d7]/30"
                >
                  <Accordion.Trigger className="group flex items-center justify-between w-full text-[17px] font-semibold text-[#0b1c30] py-5 hover:text-[#004ac6] transition-colors duration-200 text-left gap-4">
                    {faq.q}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-[#004ac6] transition-transform duration-200 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease-out] data-[state=closed]:animate-[accordion-up_0.2s_ease-out]">
                    <p className="text-[15px] text-[#434655] pb-5 leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>

        </div>
      </div>
    </section>
  )
}
