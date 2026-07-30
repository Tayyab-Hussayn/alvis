'use client'

import { Clock, MessageSquare, Handshake } from 'lucide-react'

const nextSteps = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'We review your message',
    desc: 'Within 24 hours on business days — usually sooner.',
  },
  {
    num: '02',
    icon: Clock,
    title: '30-min discovery call',
    desc: 'A focused conversation about your project. No pitch, no pressure.',
  },
  {
    num: '03',
    icon: Handshake,
    title: 'Clear proposal',
    desc: "If it's a fit, we send a scoped proposal with timeline and pricing.",
  },
]

export function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden pt-36 pb-20" style={{
      background: 'linear-gradient(135deg, #0b1c30 0%, #0f2340 60%, #0b1c30 100%)',
    }}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,74,198,0.20) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: headline + trust */}
          <div>
            <span className="block text-[12px] font-semibold uppercase tracking-widest mb-6"
              style={{ color: 'rgba(195,198,215,0.60)' }}>
              REACH OUT
            </span>
            <h1 className="font-bold leading-tight tracking-tight text-white mb-6"
              style={{ fontSize: 'clamp(2.25rem,5vw,3.5rem)' }}>
              {"Let's build something"}
              <br />
              <span style={{ color: '#b4c5ff' }}>together.</span>
            </h1>
            <p className="text-[18px] leading-relaxed mb-10 max-w-md"
              style={{ color: 'rgba(195,198,215,0.75)' }}>
              Tell us about your project. We&apos;ll review it and respond within 24 hours with honest thoughts and a clear next step.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                '24h Response Time',
                'No Commitment Required',
                'Remote-First',
              ].map(label => (
                <div key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.80)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: "What happens next" card */}
          <div className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-6"
              style={{ color: 'rgba(195,198,215,0.55)' }}>
              WHAT HAPPENS NEXT
            </p>

            <div className="space-y-6">
              {nextSteps.map(({ num, icon: Icon, title, desc }) => (
                <div key={num} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,74,198,0.25)', border: '1px solid rgba(0,74,198,0.40)' }}>
                    <Icon size={18} className="text-[#b4c5ff]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-[15px] mb-0.5">{title}</p>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(195,198,215,0.65)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
              <p className="text-[13px]" style={{ color: 'rgba(195,198,215,0.55)' }}>
                Prefer email?{' '}
                <a href="mailto:hello@alvis.agency"
                  className="text-[#b4c5ff] font-semibold hover:text-white transition-colors duration-200">
                  hello@alvis.agency
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
