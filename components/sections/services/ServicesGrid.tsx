'use client'

import Link from 'next/link'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const services = [
  {
    title: 'Social Media Marketing',
    desc: 'Build your brand presence, engage your audience and drive more conversions.',
    chip: '#fde8ea',
    color: '#e63946',
    icon: <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />,
  },
  {
    title: 'SEO Optimization',
    desc: 'Rank higher on Google and increase organic traffic with our proven SEO strategies.',
    chip: '#e8f1fd',
    color: '#3b82f6',
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
  },
  {
    title: 'Branding & Design',
    desc: 'Create a strong brand identity that leaves a lasting impression on your audience.',
    chip: '#eee9fd',
    color: '#8b5cf6',
    icon: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />,
  },
  {
    title: 'Content Marketing',
    desc: 'Engaging content that attracts, educates and converts your target audience.',
    chip: '#e3f7ec',
    color: '#16a34a',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h5M8 17h8" />
      </>
    ),
  },
  {
    title: 'Paid Advertising',
    desc: 'Target the right audience and get maximum ROI with our paid ad campaigns.',
    chip: '#e8f1fd',
    color: '#3b82f6',
    icon: <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />,
  },
  {
    title: 'E-Commerce Marketing',
    desc: 'Boost your online store sales with conversion-focused marketing strategies.',
    chip: '#fdf0dd',
    color: '#f59e0b',
    icon: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </>
    ),
  },
  {
    title: 'Email Marketing',
    desc: 'Nurture leads and build strong customer relationships through email campaigns.',
    chip: '#e3f7ec',
    color: '#16a34a',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
  },
  {
    title: 'Analytics & Reporting',
    desc: 'Track performance, measure results and optimize strategies for better growth.',
    chip: '#eee9fd',
    color: '#8b5cf6',
    icon: <path d="M18 20V10M12 20V4M6 20v-6" />,
  },
]

export function ServicesGrid() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div
        className="max-w-[1280px] mx-auto bg-white rounded-3xl px-6 md:px-10 py-14"
        style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.10)' }}
      >
        <div ref={headerRef} className="text-center mb-12">
          <span className="block text-[12px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
            What We Do
          </span>
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)', letterSpacing: '-0.03em', color: '#0d0d0d' }}
          >
            Our Digital Marketing <span style={{ color: '#e63946' }}>Services</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div
              key={s.title}
              className="rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
              style={{ background: '#fffbfb', border: '1px solid #f8e0df' }}
            >
              <span
                className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{ background: s.chip, color: s.color }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </span>
              <h3 className="font-bold text-[14px] mb-3" style={{ color: '#0d0d0d' }}>{s.title}</h3>
              <p className="text-[12.5px] mb-5" style={{ lineHeight: '1.6', color: '#5b403f' }}>{s.desc}</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[12px] font-bold" style={{ color: '#e63946' }}>
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
