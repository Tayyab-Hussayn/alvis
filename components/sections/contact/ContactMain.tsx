'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { useScrollRevealGroup } from '@/components/animations/useScrollReveal'

const details = [
  {
    title: 'Email Us',
    lines: ['info@alvismarketing.com'],
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),
  },
  {
    title: 'Call Us',
    lines: ['(571) 207-8314'],
    icon: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
  },
  {
    title: 'Visit Us',
    lines: ['South Plainfield, NJ 07080', 'United States'],
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
]

const socials = [
  { label: 'Facebook',  color: '#1877F2', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', href: 'https://www.facebook.com/share/1Bwx3RM7pc/' },
  { label: 'Instagram', color: '#E1306C', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM17.8 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z', href: 'https://www.instagram.com/alvisdigital?igsh=MWVhbWY4dXd6Y2Z5OA==' },
  { label: 'LinkedIn',  color: '#0A66C2', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', href: 'https://www.linkedin.com/company/alvis-marketing-agency' },
]

const inputStyle: React.CSSProperties = {
  border: '1px solid #f0dedd',
  color: '#271717',
  background: '#fffdfc',
}

function Field({
  id, placeholder, error, register, type = 'text',
}: {
  id: string
  placeholder: string
  error?: string
  register: object
  type?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl px-5 py-4 text-[14px] outline-none transition-colors focus:border-[#e63946]"
        style={{ ...inputStyle, borderColor: error ? '#e63946' : '#f0dedd' }}
        {...register}
      />
      {error && <p className="text-[12px] mt-1.5" style={{ color: '#e63946' }}>{error}</p>}
    </div>
  )
}

export function ContactMain() {
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const mainRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.1 })

  const onSubmit = async (data: ContactFormData) => {
    setApiError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('API error')
      setSubmitted(true)
    } catch {
      setApiError(true)
    }
  }

  return (
    <section className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div ref={mainRef} className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Get In Touch */}
        <div
          className="lg:col-span-4 bg-white rounded-3xl p-8"
          style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
        >
          <h2 className="font-display font-extrabold text-[22px] mb-2" style={{ color: '#0d0d0d' }}>Get In Touch</h2>
          <span className="block w-10 h-[3px] rounded-full mb-8" style={{ background: '#e63946' }} />

          <ul className="space-y-6 mb-8">
            {details.map(d => (
              <li key={d.title} className="flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#fde8ea', color: '#e63946' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {d.icon}
                  </svg>
                </span>
                <span>
                  <span className="block font-bold text-[14px] mb-1" style={{ color: '#0d0d0d' }}>{d.title}</span>
                  {d.lines.map(l => (
                    <span key={l} className="block text-[13px]" style={{ lineHeight: '1.5', color: '#5b403f' }}>{l}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <p className="font-bold text-[13px] mb-4" style={{ color: '#0d0d0d' }}>Follow Us</p>
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5"
                style={{ border: '1px solid #f0dedd', color: s.color }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Send Us a Message */}
        <div
          className="lg:col-span-8 bg-white rounded-3xl p-8"
          style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
        >
          <h2 className="font-display font-extrabold text-[22px] mb-2" style={{ color: '#0d0d0d' }}>Send Us a Message</h2>
          <span className="block w-10 h-[3px] rounded-full mb-8" style={{ background: '#e63946' }} />

          {submitted ? (
            <div className="text-center py-16">
              <span className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: '#e3f7ec' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h3 className="font-display font-extrabold text-[22px] mb-2" style={{ color: '#0d0d0d' }}>Message Sent!</h3>
              <p className="text-[14px]" style={{ color: '#5b403f' }}>
                We&apos;ve received your message and will reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="name"  placeholder="Your Name"  error={errors.name?.message}  register={register('name')} />
                <Field id="email" placeholder="Your Email" error={errors.email?.message} register={register('email')} type="email" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="phone"   placeholder="Phone Number" error={errors.phone?.message}   register={register('phone')} />
                <Field id="subject" placeholder="Subject"      error={errors.subject?.message} register={register('subject')} />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Your Message"
                  className="w-full rounded-xl px-5 py-4 text-[14px] outline-none resize-none transition-colors focus:border-[#e63946]"
                  style={{ ...inputStyle, borderColor: errors.message ? '#e63946' : '#f0dedd' }}
                  {...register('message')}
                />
                {errors.message && <p className="text-[12px] mt-1.5" style={{ color: '#e63946' }}>{errors.message.message}</p>}
              </div>

              {/* Honeypot — invisible to users, bots fill it */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" {...register('_gotcha')} />

              {apiError && (
                <p className="rounded-xl p-4 text-[13px]" style={{ background: '#fde8ea', color: '#b7102a' }}>
                  Something went wrong. Please try again or email us at info@alvismarketing.com.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-3 rounded-full text-white text-[13px] font-bold pl-8 pr-2 py-2 transition-transform hover:scale-[1.02] disabled:opacity-60"
                style={{ background: '#e63946', boxShadow: '0 20px 40px -14px rgba(230,57,70,0.45)' }}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.22)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
