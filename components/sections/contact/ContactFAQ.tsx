'use client'

import { useState } from 'react'
import { useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const faqs = [
  {
    q: 'How long does it take to see results?',
    a: 'Most clients see early movement within 4–6 weeks. Meaningful, compounding results usually land between months three and six, depending on the channel and how competitive your market is.',
  },
  {
    q: 'Can you manage our social media?',
    a: 'Yes. We handle strategy, content production, scheduling and community management across the platforms where your audience actually spends time.',
  },
  {
    q: 'How much do your services cost?',
    a: 'Pricing depends on scope and the channels involved. We scope every engagement individually and send a clear proposal before any work starts — no hidden fees.',
  },
  {
    q: 'Do you offer support after project delivery?',
    a: 'Always. Every project includes a support window, and most clients continue with us on an ongoing retainer for optimization and reporting.',
  },
]

/* 3D-style question-mark bubble */
function QuestionArt() {
  return (
    <svg width="220" height="200" viewBox="0 0 220 200" fill="none" className="w-full max-w-[220px]">
      <rect x="30" y="18" width="140" height="120" rx="34" fill="#8b5cf6" />
      <path d="M74 132h34l-14 26z" fill="#8b5cf6" />
      <path
        d="M100 52c-13 0-22 8-23 19h15c1-4 4-7 8-7 5 0 8 3 8 7 0 6-9 8-12 15-1 3-1 6-1 9h14c0-3 0-5 1-6 3-6 13-9 13-19 0-11-10-18-23-18z"
        fill="#fff"
      />
      <circle cx="100" cy="112" r="7" fill="#fff" />
      <circle cx="182" cy="150" r="24" fill="#fff" stroke="#efe6fd" strokeWidth="2" />
      <g fill="#c4b5fd">
        <circle cx="173" cy="150" r="3" />
        <circle cx="182" cy="150" r="3" />
        <circle cx="191" cy="150" r="3" />
      </g>
      <g fill="#e63946">
        <circle cx="16" cy="60" r="3.5" />
        <circle cx="200" cy="40" r="3" />
        <circle cx="24" cy="150" r="2.5" />
      </g>
      <g fill="#f59e0b">
        <circle cx="206" cy="98" r="3" />
        <circle cx="10" cy="110" r="2.5" />
      </g>
    </svg>
  )
}

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const faqsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
          FAQ
        </span>
        <h2
          className="font-display font-extrabold mb-10"
          style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', letterSpacing: '-0.03em', color: '#0d0d0d' }}
        >
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div ref={faqsRef} className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4 self-start">
            {faqs.map((f, i) => (
              <div key={f.q} className="bg-white rounded-2xl h-fit" style={{ border: '1px solid #f0dedd' }}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                >
                  <span className="font-bold text-[14px]" style={{ color: '#0d0d0d' }}>{f.q}</span>
                  <span
                    className="text-[20px] leading-none shrink-0 transition-transform"
                    style={{ color: '#8f6f6e', transform: open === i ? 'rotate(45deg)' : 'none' }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <p className="px-5 pb-5 text-[13px]" style={{ lineHeight: '1.65', color: '#5b403f' }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex justify-center">
            <QuestionArt />
          </div>
        </div>
      </div>
    </section>
  )
}
