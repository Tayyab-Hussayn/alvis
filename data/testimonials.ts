export interface Testimonial {
  name: string
  title: string
  company: string
  quote: string
  avatar?: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    title: 'CEO',
    company: 'NovaBridge Consulting',
    quote: 'Alvis rebuilt our entire digital presence in six weeks. Traffic doubled. Our sales team finally has leads worth calling. The work speaks for itself.',
  },
  {
    name: 'James Okafor',
    title: 'Head of Growth',
    company: 'Stacklane SaaS',
    quote: "We hired three agencies before Alvis. None of them understood both design and performance at the same time. These guys do. Our CAC dropped 40% in Q2.",
  },
  {
    name: 'Priya Nair',
    title: 'Founder',
    company: 'Lumient Studio',
    quote: 'The branding work was exceptional. Not trendy, not generic — it actually captured what we are. We get compliments on our identity from prospective clients every week.',
  },
  {
    name: 'Daniel Cruz',
    title: 'Marketing Director',
    company: 'Fervent Retail Group',
    quote: "Our Google Ads account was bleeding money. Alvis audited it, restructured everything, and within 30 days we were at a 6x ROAS. Couldn't ask for more.",
  },
]
