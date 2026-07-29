'use client'

import { ChevronDown } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const faqs = [
  {
    q: 'How quickly will you respond?',
    a: 'Within 24 hours on business days. If it\'s urgent, say so in your message.',
  },
  {
    q: 'Do you work with small businesses or just large companies?',
    a: 'Both. Our clients range from solo founders to teams of 50+. The right fit is more about ambition than company size.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: "No. Some services (like SEO) work best with 3–6 month commitments for results to compound, but we don't lock you in with punitive contracts.",
  },
  {
    q: 'Can I see more work than what\'s on the website?',
    a: 'Yes — NDA-protected case studies are available on request. Just mention it in your message.',
  },
  {
    q: 'Do you work with clients outside your country?',
    a: 'Entirely remote. We have clients across 12 countries. Time zones are manageable.',
  },
  {
    q: 'What happens after I send a message?',
    a: "We review your project, and if it's a good fit, we schedule a 30-minute discovery call — no charge. From there, we'll propose next steps.",
  },
]

export function ContactFAQ() {
  return (
    <section className="bg-subtle py-20 border-t border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left label */}
          <div>
            <SectionLabel className="mb-4">Common Questions</SectionLabel>
            <h2 className="text-display-lg font-display font-bold text-text mt-4">
              Before You<br />Reach Out
            </h2>
            <p className="text-body-lg text-text-muted mt-4 max-w-sm">
              The questions we hear most often — answered honestly.
            </p>
          </div>

          {/* Right accordion */}
          <Accordion.Root type="single" collapsible className="space-y-0">
            {faqs.map((faq, i) => (
              <Accordion.Item key={i} value={`item-${i}`} className="border-b border-border last:border-b-0">
                <Accordion.Trigger className="group flex items-center justify-between w-full text-body-md font-semibold text-text py-5 hover:text-accent transition-colors duration-200 text-left">
                  {faq.q}
                  <motion.span
                    className="flex-shrink-0 ml-4 text-text-muted group-hover:text-accent transition-colors"
                    initial={false}
                  >
                    <ChevronDown
                      size={18}
                      className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                    />
                  </motion.span>
                </Accordion.Trigger>

                <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease-out] data-[state=closed]:animate-[accordion-up_0.2s_ease-out]">
                  <p className="text-body-md text-text-muted pb-5 leading-relaxed pr-8">
                    {faq.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </section>
  )
}
