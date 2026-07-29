'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

export function NewsletterSignup() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      })
    } catch {
      // silent — show success regardless for MVP
    }

    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="bg-subtle border-y border-border py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel className="mb-4 justify-center">Stay Sharp</SectionLabel>
          <h2 className="text-display-lg font-display font-bold text-text mt-4 mb-4">
            Marketing Insights, Monthly.
          </h2>
          <p className="text-body-lg text-text-muted mb-8">
            One email a month. No fluff, no spam — just practical insights on
            what&apos;s working in digital marketing and growth.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-3 bg-success/10 border border-success/30 text-success rounded-full px-6 py-3 text-body-md font-semibold">
              <span>✓</span> You&apos;re in — talk soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border border-border rounded-full px-5 py-3 text-body-md bg-surface focus:outline-none focus:border-accent transition-colors"
              />
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Subscribing…' : 'Subscribe →'}
              </Button>
            </form>
          )}

          <p className="text-label text-text-faint mt-4">
            Unsubscribe anytime. No spam — ever.
          </p>
        </div>
      </Container>
    </section>
  )
}
