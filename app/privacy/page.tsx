import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/shared/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Alvis Marketing Agency collects, uses and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      updated="6 August 2026"
      intro="This policy explains what information Alvis Marketing Agency collects when you use our website or work with us, why we collect it, and what control you have over it."
      sections={[
        {
          heading: 'Information We Collect',
          body: [
            'When you submit our contact form we collect the name, email address, phone number, subject and message you provide. If you subscribe to our newsletter we collect your email address only.',
            'We also collect standard technical information automatically, such as your IP address, browser type and the pages you visit. This is used to keep the site secure and to understand which content is useful.',
          ],
        },
        {
          heading: 'How We Use Your Information',
          body: [
            'We use the details you send us to reply to your enquiry, provide the services you ask for, and send marketing updates where you have opted in. We do not sell your personal information to anyone.',
            'Newsletter emails always include an unsubscribe link. You can opt out at any time and we will stop sending them.',
          ],
        },
        {
          heading: 'Cookies and Analytics',
          body: [
            'We use a small number of cookies to keep the site working correctly and to measure aggregate traffic. You can block cookies in your browser settings, though parts of the site may not behave as expected if you do.',
          ],
        },
        {
          heading: 'Data Sharing',
          body: [
            'We share data only with the service providers that help us run the business, such as our email delivery and hosting providers. They are permitted to use it solely to deliver that service to us.',
            'We may disclose information where the law requires it, or to protect our rights and the safety of others.',
          ],
        },
        {
          heading: 'Data Retention and Security',
          body: [
            'We keep enquiry records for as long as needed to serve you and to meet our legal and accounting obligations, then delete them. Data is transmitted over encrypted connections and access is limited to staff who need it.',
          ],
        },
        {
          heading: 'Your Rights',
          body: [
            'You can ask us for a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Contact us using the details below and we will respond within 30 days.',
          ],
        },
        {
          heading: 'Changes to This Policy',
          body: [
            'If we change this policy we will update the date at the top of this page. Significant changes will be highlighted on the site.',
          ],
        },
      ]}
    />
  )
}
