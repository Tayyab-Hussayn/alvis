'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Monitor, TrendingUp, Share2, Target, Palette, Layout, FileText, Server, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'
import { services } from '@/data/services'

const iconMap: Record<string, React.ElementType> = {
  Monitor, TrendingUp, Share2, Target, Palette, Layout, FileText, Server,
}

export function ServicesOverview() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-bg">
      <Container>
        {/* Section header */}
        <div className="max-w-2xl mb-12 md:mb-16 text-center md:text-left mx-auto md:mx-0">
          <SectionLabel className="mb-4 justify-center md:justify-start">What We Do</SectionLabel>
          <h2 className="text-display-lg font-display font-bold text-text mb-4">
            Services Built for<br />Business Growth
          </h2>
          <p className="text-body-lg text-text-muted max-w-lg mx-auto md:mx-0">
            From strategy to execution — every service is built to move the needle.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.slug}
                initial={{ y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                className="group bg-surface border border-border rounded-2xl p-6 md:p-8 hover:border-accent hover:shadow-sm hover:-translate-y-1 transition-all duration-250 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-6">
                    {Icon && <Icon size={22} className="text-accent" />}
                  </div>

                  <h3 className="text-display-md font-display font-semibold text-text mb-3">
                    {service.title}
                  </h3>

                  <p className="text-body-sm text-text-muted leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <Link
                  href={`/services#${service.slug}`}
                  className="inline-flex items-center gap-1 text-body-sm text-accent mt-6 group/link font-medium"
                >
                  Learn more
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <Button href="/services" variant="secondary">
            View All Services
          </Button>
        </div>
      </Container>
    </section>
  )
}
