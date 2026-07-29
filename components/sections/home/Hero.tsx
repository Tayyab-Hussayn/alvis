'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, Star } from 'lucide-react'

export function Hero() {
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (e.clientX - centerX) / 60
      const moveY = (e.clientY - centerY) / 60

      ;[card1Ref, card2Ref, card3Ref].forEach((ref, index) => {
        if (!ref.current) return
        const factor = (index + 1) * 0.15
        ref.current.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative px-4 sm:px-8 lg:px-16 pt-36 pb-20 overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* ── Left Content Column ── */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">

            {/* Announcement pill */}
            <div className="inline-flex items-center p-1 pr-4 bg-[#e5eeff] rounded-full text-[#434655] text-[14px] font-medium gap-2">
              <span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">New</span>
              <span>Digital Excellence</span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0b1c30] max-w-xl">
              We Build Digital Experiences That Drive{' '}
              <span className="text-[#004ac6]">Real Results</span>
            </h1>

            {/* Subtext */}
            <p className="text-[18px] leading-[1.6] text-[#434655] max-w-lg">
              Alvis is a full-service digital marketing and IT agency. We help ambitious
              companies grow through strategy, design, and technology that actually works.
            </p>

            {/* CTAs */}
            <div className="flex flex-row flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-black text-white text-[14px] font-semibold rounded-full hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                Start a Project
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-3.5 bg-transparent border-2 border-black text-black text-[14px] font-semibold rounded-full hover:bg-black/5 transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>

            {/* Trust element */}
            <div className="pt-2 flex items-center gap-4">
              <div className="flex -space-x-3">
                <Image
                  src="/images/avatar-1.jpg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <Image
                  src="/images/avatar-2.jpg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <Image
                  src="/images/avatar-3.jpg"
                  alt="Client"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-[#0b1c30] text-[14px] leading-snug">12k+</p>
                <p className="text-[12px] text-[#434655] font-medium leading-none">
                  Used by teams and professionals
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Column Visual ── */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Glow blob */}
            <div className="absolute -z-10 w-[500px] h-[500px] bg-blue-200/10 rounded-full blur-[80px]" />

            {/* Main image container */}
            <div className="relative w-full lg:h-[520px] rounded-xl overflow-visible shadow-2xl bg-white border border-gray-200/30">
              <Image
                src="/images/hero-dashboard.jpg"
                alt="Analytics Dashboard Interface"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-xl"
                priority
              />

              {/* Card 1: Conversion Rate — top left */}
              <div
                ref={card1Ref}
                className="absolute -top-6 left-10 glass-card p-4 rounded-xl shadow-lg border border-white/50 flex flex-col gap-1.5 z-10"
              >
                <div className="flex items-center gap-2 text-[#004ac6]">
                  <TrendingUp size={18} />
                  <span className="text-[13px] font-bold">+127% Conversion Rate</span>
                </div>
                <p className="text-[10px] text-[#434655]/60 font-medium">Optimization Performance</p>
              </div>

              {/* Card 2: Active Project — right side */}
              <div
                ref={card2Ref}
                className="absolute -right-4 bottom-20 glass-card p-4 rounded-xl shadow-lg border border-white/50 max-w-[220px] z-10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-[#2563eb] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                    MT
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0b1c30] leading-tight">Meridian Tech</p>
                    <p className="text-[10px] text-[#004ac6] font-semibold">SEO Campaign</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-[#434655] font-medium">Active Project</span>
                  <span className="text-[11px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                    +340% Traffic
                  </span>
                </div>
              </div>

              {/* Card 3: Rating — bottom pill */}
              <div
                ref={card3Ref}
                className="absolute -bottom-6 left-10 glass-card px-5 py-3 rounded-full shadow-lg border border-white/50 flex items-center gap-3 z-10"
              >
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-[13px] font-bold text-[#0b1c30]">4.9/5 rating</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-[13px] text-[#434655]">38 verified reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Logo Strip ── */}
        <div className="mt-20 pt-10 border-t border-gray-200/40">
          <div className="flex flex-row justify-between items-center w-full grayscale opacity-50">
            {['Slack', 'Zoom', 'Airbnb', 'Spotify', 'Envato'].map((name) => (
              <span key={name} className="text-[20px] font-bold text-[#0b1c30] tracking-tight">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
