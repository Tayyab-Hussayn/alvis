'use client'

import { useState } from 'react'

export type SubscribeState = 'idle' | 'sending' | 'done' | 'error'

/**
 * Shared newsletter submit logic.
 *
 * The site had three separate signup forms (footer, blog sidebar, blog CTA) with
 * three different implementations — two of which had no submit handler at all and
 * silently discarded the address. The markup still differs per placement, so only
 * the behaviour is shared here.
 */
export function useNewsletterSubscribe(source: string) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubscribeState>('idle')
  const [error, setError] = useState('')

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state === 'sending') return

    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, source }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Something went wrong. Please try again.')
        setState('error')
        return
      }
      setState('done')
      setEmail('')
    } catch {
      setError('Network error. Please try again.')
      setState('error')
    }
  }

  return { email, setEmail, state, error, subscribe }
}
