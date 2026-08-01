'use client'

import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

interface LegalSection {
  heading: string
  body: string[]
}

interface LegalPageProps {
  label: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

/** Shared shell for the Privacy Policy and Terms pages — red theme. */
export function LegalPage({ label, title, updated, intro, sections }: LegalPageProps) {
  const sectionsRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })
  const contactRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="pt-40 pb-24 px-5 md:px-8" style={{ background: '#fff8f7' }}>
      <div className="max-w-[820px] mx-auto">
        <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: '#e63946' }}>
          {label}
        </span>

        <h1
          className="font-display font-extrabold mb-4"
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: '1.1', letterSpacing: '-0.04em', color: '#0d0d0d' }}
        >
          {title}
        </h1>

        <p className="text-[13px] mb-10" style={{ color: '#8f6f6e' }}>Last updated {updated}</p>

        <p className="mb-12" style={{ fontSize: '17px', lineHeight: '1.7', color: '#5b403f' }}>{intro}</p>

        <div
          ref={sectionsRef}
          className="bg-white rounded-3xl p-8 md:p-10 space-y-9"
          style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
        >
          {sections.map(s => (
            <div key={s.heading}>
              <h2 className="font-display font-extrabold text-[19px] mb-3" style={{ color: '#0d0d0d' }}>
                {s.heading}
              </h2>
              {s.body.map(p => (
                <p key={p} className="mb-3 last:mb-0" style={{ fontSize: '15px', lineHeight: '1.7', color: '#5b403f' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div ref={contactRef} className="mt-10 rounded-2xl p-6" style={{ background: '#fdeeed', border: '1px solid #f8e0df' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#5b403f' }}>
            Questions about this page? Email us at{' '}
            <a href="mailto:hello@alvisagency.com" className="font-bold" style={{ color: '#e63946' }}>
              hello@alvisagency.com
            </a>{' '}
            or write to 123 Marketing Street, New York, NY 10001.
          </p>
        </div>
      </div>
    </section>
  )
}
