import type { Metadata } from 'next'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactMain } from '@/components/sections/contact/ContactMain'
import { ContactFAQ }  from '@/components/sections/contact/ContactFAQ'

export const metadata: Metadata = {
  title: 'Contact Alvis | Start Your Project',
  description:
    'Get in touch with the Alvis team. We respond within 24 hours. Tell us about your project — no commitment required.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMain />
      <ContactFAQ />
    </>
  )
}
