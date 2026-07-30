'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import {
  AlertCircle, Loader2, CheckCircle,
  Mail, Clock, Globe, Linkedin, Instagram, Twitter,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

const budgets = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not Sure Yet',
]

const socialLinks = [
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter,   href: '#', label: 'Twitter'   },
]

const fieldClass = cn(
  'w-full border border-border-dark rounded-xl px-4 py-3.5 text-body-md bg-surface text-text',
  'transition-all duration-200 outline-none',
  'focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)]',
  'placeholder:text-text-faint',
)

const errorClass = 'text-body-sm text-error mt-1.5 flex items-center gap-1'

/* ─── Form (inner — needs searchParams) ─────────────────────────── */

function ContactForm() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service') ?? ''

  const [submitted, setSubmitted] = useState(false)
  const [apiError,  setApiError]  = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: serviceParam },
  })

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

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-success" />
        </div>
        <h3 className="text-display-md font-display font-bold text-text mb-3">
          Message Sent!
        </h3>
        <p className="text-body-lg text-text-muted max-w-sm mx-auto">
          We&apos;ve received your message and will reply within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label className="text-body-sm font-medium text-text block mb-2">
          Full Name <span className="text-error">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="Jane Smith"
          className={cn(fieldClass, errors.name && 'border-error focus:border-error focus:shadow-none')}
        />
        {errors.name && (
          <p className={errorClass}>
            <AlertCircle size={14} />{errors.name.message}
          </p>
        )}
      </div>

      {/* Email + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-body-sm font-medium text-text block mb-2">
            Email Address <span className="text-error">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="jane@company.com"
            className={cn(fieldClass, errors.email && 'border-error focus:border-error focus:shadow-none')}
          />
          {errors.email && (
            <p className={errorClass}>
              <AlertCircle size={14} />{errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-body-sm font-medium text-text block mb-2">
            Company / Business Name
          </label>
          <input
            {...register('company')}
            type="text"
            placeholder="Acme Inc."
            className={fieldClass}
          />
        </div>
      </div>

      {/* Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-body-sm font-medium text-text block mb-2">
            Service Interested In <span className="text-error">*</span>
          </label>
          <select
            {...register('service')}
            className={cn(fieldClass, errors.service && 'border-error focus:border-error focus:shadow-none')}
          >
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className={errorClass}>
              <AlertCircle size={14} />{errors.service.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-body-sm font-medium text-text block mb-2">
            Budget Range <span className="text-error">*</span>
          </label>
          <select
            {...register('budget')}
            className={cn(fieldClass, errors.budget && 'border-error focus:border-error focus:shadow-none')}
          >
            <option value="">Select a range…</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && (
            <p className={errorClass}>
              <AlertCircle size={14} />{errors.budget.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="text-body-sm font-medium text-text block mb-2">
          Tell Us About Your Project <span className="text-error">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Describe your project, goals, and any specific requirements…"
          className={cn(fieldClass, 'resize-none', errors.message && 'border-error focus:border-error focus:shadow-none')}
        />
        {errors.message && (
          <p className={errorClass}>
            <AlertCircle size={14} />{errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot — invisible to users, bots fill it */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
        {...register('_gotcha')}
      />

      {/* API error banner */}
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 border border-red-200 text-error rounded-xl p-4 text-body-sm flex items-center gap-2"
          >
            <AlertCircle size={16} />
            Something went wrong. Please try again or email us directly at{' '}
            <a href="mailto:hello@alvis.agency" className="underline">hello@alvis.agency</a>.
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Sending…
          </span>
        ) : (
          'Send Message →'
        )}
      </Button>
    </form>
  )
}

/* ─── Details sidebar ────────────────────────────────────────────── */

function ContactDetails() {
  return (
    <div className="space-y-8 sticky top-24">
      <h3 className="text-display-md font-display font-bold text-text">
        Other Ways to Reach Us
      </h3>

      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
          <Mail size={20} className="text-accent" />
        </div>
        <div>
          <p className="text-body-sm text-text-muted mb-1">Email</p>
          <a
            href="mailto:hello@alvis.agency"
            className="text-body-md font-medium text-text hover:text-accent transition-colors duration-200"
          >
            hello@alvis.agency
          </a>
        </div>
      </div>

      {/* Response time */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
          <Clock size={20} className="text-accent" />
        </div>
        <div>
          <p className="text-body-sm text-text-muted mb-1">Response Time</p>
          <p className="text-body-md font-medium text-text">Within 24 hours</p>
          <p className="text-body-sm text-text-faint">Monday – Friday</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
          <Globe size={20} className="text-accent" />
        </div>
        <div>
          <p className="text-body-sm text-text-muted mb-1">Location</p>
          <p className="text-body-md font-medium text-text">Remote-First</p>
          <p className="text-body-sm text-text-faint">Serving clients worldwide</p>
        </div>
      </div>

      {/* Social */}
      <div>
        <p className="text-body-sm text-text-muted mb-4">Follow Alvis</p>
        <div className="flex gap-3">
          {socialLinks.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:border-accent hover:text-accent transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Trust note */}
      <div className="bg-subtle rounded-2xl p-6 border border-border">
        <p className="text-body-sm text-text-muted leading-relaxed">
          <strong className="text-text font-semibold">Not ready to commit?</strong>
          <br />
          No problem. Tell us what you&apos;re thinking — even a rough idea — and we&apos;ll
          give you honest direction for free.
        </p>
      </div>
    </div>
  )
}

/* ─── Main export ────────────────────────────────────────────────── */

export function ContactMain() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#0b1c30] mb-8">
              Send Us a Message
            </h2>
            <Suspense fallback={<div className="h-96 animate-pulse bg-subtle rounded-2xl" />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <ContactDetails />
          </div>
        </div>
      </Container>
    </section>
  )
}
