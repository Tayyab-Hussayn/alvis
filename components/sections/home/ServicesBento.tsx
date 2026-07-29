'use client'

import Link from 'next/link'
import {
  Code2, Sparkles, MessageSquare, Database,
  TrendingUp, Search, Palette, Settings,
} from 'lucide-react'

interface BentoCard {
  num: string
  icon: React.ElementType
  title: string
  desc: string
  span: string   // tailwind col-span class
}

const cards: BentoCard[] = [
  {
    num: '01',
    icon: Code2,
    title: 'Full Stack Web Development',
    desc: 'Scalable, production-ready web applications built with Next.js, React, and TypeScript. From concept to deployment.',
    span: 'md:col-span-6',
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'AI Automation & Agentic Workflows',
    desc: 'n8n orchestration, LLM agents, and intelligent automation pipelines for business processes.',
    span: 'md:col-span-4',
  },
  {
    num: '03',
    icon: MessageSquare,
    title: 'Chatbot Development & LLM Integration',
    desc: 'Custom AI chatbots and LLM integrations powered by OpenAI, Gemini, and Claude APIs.',
    span: 'md:col-span-4',
  },
  {
    num: '04',
    icon: Database,
    title: 'Web Scraping & Data Extraction',
    desc: 'Intelligent data extraction using Playwright, Python, and headless browsers. CSV exports, API feeds, and automation.',
    span: 'md:col-span-6',
  },
  {
    num: '05',
    icon: TrendingUp,
    title: 'Digital Marketing',
    desc: 'Comprehensive digital strategies to grow your brand and reach your target audience effectively.',
    span: 'md:col-span-10 lg:col-span-3',
  },
  {
    num: '06',
    icon: Search,
    title: 'SEO',
    desc: 'Data-driven search engine optimization to boost your visibility and drive organic traffic.',
    span: 'md:col-span-10 lg:col-span-4',
  },
  {
    num: '07',
    icon: Palette,
    title: 'Graphic Designing',
    desc: "Creative visual identities and marketing materials that capture your brand's essence.",
    span: 'md:col-span-10 lg:col-span-3',
  },
]

export function ServicesBento() {
  return (
    <section className="bg-bg py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight leading-none">
              <span className="block text-[#0b1c30]">Our</span>
              <span className="block text-[#004ac6]">Services</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#004ac6] text-[#004ac6] text-[13px] font-semibold hover:bg-[#004ac6]/5 transition-all shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)] self-start md:self-auto"
          >
            <Settings size={16} />
            EXPLORE ALL
          </Link>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
          {cards.map(({ num, icon: Icon, title, desc, span }) => (
            <div
              key={num}
              className={`${span} group relative overflow-hidden bg-white border border-[#c3c6d7] p-6 md:p-8 rounded-[2rem] transition-all duration-300 hover:border-[#2563eb] hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(37,99,235,0.1),0_10px_10px_-5px_rgba(37,99,235,0.04)]`}
            >
              {/* Number badge */}
              <span className="absolute top-6 right-6 text-[13px] font-bold text-[#c3c6d7]">
                {num}
              </span>

              {/* Icon */}
              <div className="inline-flex items-center justify-center p-3 bg-[#004ac6]/10 rounded-xl mb-6">
                <Icon size={26} className="text-[#004ac6]" />
              </div>

              {/* Text */}
              <h3 className="text-[22px] font-semibold text-[#0b1c30] mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#565e74]">
                {desc}
              </p>

              {/* Ghost icon */}
              <Icon
                size={120}
                className="absolute -bottom-5 -right-5 text-[#b4c5ff] opacity-[0.08] pointer-events-none select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
