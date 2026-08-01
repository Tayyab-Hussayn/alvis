import type { Metadata } from 'next'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactMain } from '@/components/sections/contact/ContactMain'
import { ContactMap }  from '@/components/sections/contact/ContactMap'
import { ContactFAQ }  from '@/components/sections/contact/ContactFAQ'
import { ContactCTA }  from '@/components/sections/contact/ContactCTA'

export const metadata: Metadata = {
  title: 'Contact Alvis | Have Questions? Let’s Talk.',
  description:
    'Get in touch with the Alvis team. Send us a message and we’ll get back to you soon — quick response, expert support and a free consultation.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMain />
      <ContactMap />
      <ContactFAQ />
      <ContactCTA />
    </>
  )
}
