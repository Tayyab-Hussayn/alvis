'use client'

import { useScrollReveal } from '@/components/animations/useScrollReveal'
import { useNewsletterSubscribe } from '@/components/hooks/useNewsletterSubscribe'

/* 3D-style open envelope with @ badge */
function EnvelopeArt() {
  return (
    <svg width="200" height="170" viewBox="0 0 200 170" fill="none" className="w-full max-w-[200px]">
      <path d="M40 66h110v76H40z" fill="#fff" />
      <path d="M52 80h86v8H52zM52 96h70v6H52zM52 110h56v6H52z" fill="#dbe4f0" />
      <path d="M30 78l65 44 65-44v82H30V78z" fill="#eef2f7" />
      <path d="M30 78l65 44 65-44-65-30-65 30z" fill="#fff" />
      <path d="M30 160l65-46 65 46H30z" fill="#e3e9f2" />
      <circle cx="46" cy="118" r="20" fill="#e63946" />
      <text x="46" y="126" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">@</text>
      <path d="M148 22l38 14-30 12-8-26z" fill="#e63946" />
      <path d="M148 22l8 26 8-12-16-14z" fill="#b7102a" />
      <g fill="#e63946">
        <circle cx="18" cy="44" r="3.5" />
        <circle cx="188" cy="96" r="3" />
        <circle cx="26" cy="152" r="2.5" />
      </g>
      <g fill="#3b82f6">
        <circle cx="176" cy="140" r="2.5" />
        <circle cx="12" cy="92" r="2" />
      </g>
    </svg>
  )
}

export function NewsletterSignup() {
  const cardRef = useScrollReveal<HTMLDivElement>()
  const { email, setEmail, state, error, subscribe } = useNewsletterSubscribe('blog-cta')
  const done = state === 'done'

  return (
    <section id="newsletter" className="px-5 md:px-8 pb-24" style={{ background: '#fff8f7' }}>
      <div ref={cardRef} className="max-w-[1280px] mx-auto rounded-3xl px-6 md:px-12 py-10" style={{ background: '#0a1b3d' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          <div className="md:col-span-3 flex justify-center">
            <EnvelopeArt />
          </div>

          <div className="md:col-span-5 text-center md:text-left">
            <span className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: '#e63946' }}>
              Don&apos;t Miss Out
            </span>
            <h2
              className="font-display font-extrabold text-white mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: '1.2', letterSpacing: '-0.03em' }}
            >
              Get Exclusive Insights<br />
              Straight to Your <span style={{ color: '#e63946' }}>Inbox</span>
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.72)' }}>
              Join 5,000+ marketers who receive our best content on growth, marketing and more.
            </p>
          </div>

          <div className="md:col-span-4">
            {done ? (
              <p className="text-center md:text-right text-[14px] font-bold text-white">
                You&apos;re subscribed. Watch your inbox.
              </p>
            ) : (
              <form onSubmit={subscribe} noValidate className="flex flex-col gap-3 items-center md:items-stretch">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full bg-white px-5 py-3.5 text-[13px] outline-none"
                  style={{ color: '#271717' }}
                />
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="flex items-center justify-center gap-2 rounded-full text-white text-[13px] font-bold px-7 py-3.5 transition-transform hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: '#e63946' }}
                >
                  {state === 'sending' ? 'Subscribing…' : 'Subscribe Now'}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </button>
                {state === 'error' && (
                  <p className="text-[12px] text-center" style={{ color: '#ffb3b8' }} role="alert">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
