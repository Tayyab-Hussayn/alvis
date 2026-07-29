'use client'

import Image from 'next/image'
import { Linkedin, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'
import { team } from '@/data/team'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function TeamSection() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-bg">
      <Container>
        <div className="mb-12 md:mb-16">
          <SectionLabel className="mb-4">The Team</SectionLabel>
          <h2 className="text-display-lg font-display font-bold text-text">
            The People Who Deliver
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <motion.div
              key={member.name}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group cursor-default"
            >
              {/* Photo */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-subtle relative">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {/* Gradient placeholder — user will replace with real photos */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-soft to-subtle flex items-center justify-center">
                    <span className="text-display-xl font-display font-bold text-accent/40">
                      {getInitials(member.name)}
                    </span>
                  </div>
                  {/* Uncomment when real photos exist:
                  <Image src={member.photo} alt={member.name} fill className="object-cover object-top" />
                  */}
                </motion.div>
              </div>

              {/* Details */}
              <div className="flex items-start justify-between mt-4">
                <div>
                  <p className="text-body-lg font-display font-semibold text-text">
                    {member.name}
                  </p>
                  <p className="text-body-sm text-text-muted mt-0.5">{member.role}</p>
                </div>
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                  className="text-text-faint hover:text-accent transition-colors duration-200 mt-1"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          ))}

          {/* We're Hiring card */}
          <div className="bg-accent-soft border border-accent border-dashed rounded-2xl p-8 flex flex-col items-center justify-center aspect-[3/4]">
            <Plus size={32} className="text-accent mb-4" />
            <h3 className="text-display-md font-display font-semibold text-text mb-2 text-center">
              We&apos;re Growing
            </h3>
            <p className="text-body-sm text-text-muted text-center mb-6">
              Think you belong here? We&apos;d love to hear from you.
            </p>
            <Button href="/contact" variant="ghost" withArrow>
              Say Hello
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
