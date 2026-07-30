'use client'

import { Code2, Bot, Network, Target, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Code2,
    title: 'Web Development & Design',
    desc: 'Production-grade websites, web apps, and SaaS dashboards built with Next.js and TypeScript.',
    includes: ['Custom UI/UX design', 'Next.js App Router', 'SEO & performance'],
  },
  {
    icon: Bot,
    title: 'AI Automation & Agents',
    desc: 'Intelligent automation pipelines that replace manual work — from content generation to data processing.',
    includes: ['LLM-powered workflows', 'Custom AI agents', 'API integrations'],
  },
  {
    icon: Network,
    title: 'n8n & Workflow Automation',
    desc: 'End-to-end n8n workflows that connect your tools and eliminate repetitive operations.',
    includes: ['Multi-step workflow builds', 'Webhook integrations', 'CRM & data sync'],
  },
  {
    icon: Target,
    title: 'Lead Generation Systems',
    desc: 'Data-driven outreach systems and landing pages that bring qualified leads consistently.',
    includes: ['Outreach infrastructure', 'Landing page conversion', 'Lead tracking setup'],
  },
]

export function ServicesGrid() {
  return (
    <section className="w-full bg-[#f8f9ff] py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#004ac6] text-[12px] font-semibold uppercase tracking-widest mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30] mb-4">
            Everything you need to build, automate, and grow
          </h2>
          <p className="text-[18px] text-[#434655] leading-relaxed">
            Four core capabilities, built to work together.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, desc, includes }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-[#c3c6d7]/30 p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: '0 10px 25px -5px rgba(37,99,235,0.08), 0 8px 10px -6px rgba(37,99,235,0.05)' }}
            >
              <div className="bg-[#eff4ff] w-16 h-16 rounded-xl flex items-center justify-center mb-6 shrink-0">
                <Icon className="text-[#004ac6]" size={28} />
              </div>
              <h3 className="text-[22px] font-bold text-[#0b1c30] mb-4">{title}</h3>
              <p className="text-[16px] text-[#434655] leading-relaxed mb-8 flex-grow">{desc}</p>
              <ul className="space-y-3 mb-8">
                {includes.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#004ac6] mt-0.5 shrink-0" />
                    <span className="text-[15px] text-[#434655]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#004ac6] text-[14px] font-semibold hover:opacity-70 transition-opacity mt-auto"
              >
                Explore <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
