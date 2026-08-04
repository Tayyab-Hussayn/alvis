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
  {
    name: 'Rajesh Patel',
    title: 'Founder & CEO',
    company: 'Meridian Finance',
    quote: 'The social media strategy Alvis created completely transformed our brand perception. We went from 5K followers to 45K in 8 months with highly engaged audience. Their content calendar system saved us 20 hours per week.',
  },
  {
    name: 'Lisa Chen',
    title: 'Marketing Head',
    company: 'Qalam Media',
    quote: 'Their SEO work is surgical. We were nowhere on search results. Within 6 months, we ranked top 3 for 40+ keywords in our industry. The organic traffic increase alone has paid for the entire engagement.',
  },
  {
    name: 'Marcus Thompson',
    title: 'Operations Director',
    company: 'LeadsGen Co',
    quote: 'Alvis automated our entire lead nurturing funnel. Response time dropped from 2 days to real-time. Conversion rates went up 65%. They did not just build it, they trained our team to manage and optimize it.',
  },
  {
    name: 'Aisha Williams',
    title: 'Chief Commercial Officer',
    company: 'Stellar Insights',
    quote: 'What impressed us most was how Alvis understood our unique market position. They did not just throw generic solutions. The website redesign increased qualified leads by 3x. ROI was immediate and substantial.',
  },
]
