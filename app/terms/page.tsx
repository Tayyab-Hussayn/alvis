import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/shared/LegalPage'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when you use the Alvis Marketing Agency website or engage our services.',
}

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms & Conditions"
      updated="6 August 2026"
      intro="These terms apply when you browse this website or engage Alvis Marketing Agency for work. By using the site you accept them."
      sections={[
        {
          heading: 'Using This Website',
          body: [
            'You may browse and share our content for your own reference. You may not copy, republish or resell it as your own, or use it in a way that misrepresents Alvis Marketing Agency.',
            'We try to keep the site available and accurate, but we do not guarantee uninterrupted access or that every detail is free of error.',
          ],
        },
        {
          heading: 'Services and Proposals',
          body: [
            'Prices and timelines shown on this site are indicative. The binding scope, fee and schedule for any engagement is the one set out in the written proposal or contract we sign with you.',
            'Any results, metrics or case study figures shown are outcomes achieved for specific clients. They are illustrative and are not a promise of the same result for your business.',
          ],
        },
        {
          heading: 'Payment',
          body: [
            'Unless the contract says otherwise, invoices are due within 14 days. We may pause work on overdue accounts after giving you notice.',
          ],
        },
        {
          heading: 'Intellectual Property',
          body: [
            'Once a project is fully paid for, ownership of the final deliverables created specifically for you passes to you. We keep ownership of our pre-existing tools, frameworks and know-how, and of anything we license from third parties.',
            'We may show completed work in our portfolio and case studies unless you ask us in writing not to.',
          ],
        },
        {
          heading: 'Your Responsibilities',
          body: [
            'You agree to give us the access, content, approvals and feedback we need to do the work, and to confirm that any material you supply is yours to use.',
          ],
        },
        {
          heading: 'Liability',
          body: [
            'To the extent the law allows, our total liability for any engagement is limited to the fees you paid us for that engagement. We are not liable for indirect or consequential losses such as lost profit or lost data.',
          ],
        },
        {
          heading: 'Ending an Engagement',
          body: [
            'Either party may end an engagement with written notice as set out in the contract. You remain responsible for work completed and costs committed up to that point.',
          ],
        },
        {
          heading: 'Governing Law',
          body: [
            'These terms are governed by the laws of the State of New York, and disputes fall to the courts of that state.',
          ],
        },
      ]}
    />
  )
}
