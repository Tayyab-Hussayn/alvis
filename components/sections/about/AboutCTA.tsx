'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function AboutCTA() {
  return (
    <section className="relative w-full bg-[#0b1c30] py-36 overflow-hidden flex items-center justify-center">

      {/* Dot pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(195,198,215,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(0,74,198,0.15) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-[#c3c6d7]/20 bg-white/5 backdrop-blur-sm mb-8">
          <span className="text-[#c3c6d7]/80 uppercase tracking-widest text-[12px] font-semibold">
            WORK WITH US
          </span>
        </div>

        <h2 className="text-white font-bold text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight mb-6">
          Ready to build something real?
        </h2>

        <p className="text-[#c3c6d7]/70 text-[18px] leading-relaxed max-w-xl mx-auto mb-12">
          We work with founders and teams who want execution, not presentations. Let&apos;s talk about what you&apos;re building.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#004ac6] text-white rounded-full px-8 py-4 text-[14px] font-semibold shadow-[0_8px_24px_rgba(0,74,198,0.25)] hover:shadow-[0_12px_32px_rgba(0,74,198,0.35)] hover:-translate-y-1 transition-all duration-200 group active:scale-95"
          >
            Start a Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-[#c3c6d7]/30 text-white rounded-full px-8 py-4 text-[14px] font-semibold hover:bg-white/5 hover:-translate-y-1 transition-all duration-200"
          >
            See Our Services
          </Link>
        </div>
      </div>

    </section>
  )
}
