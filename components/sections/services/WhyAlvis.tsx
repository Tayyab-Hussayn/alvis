import { Target, Users, Handshake } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const differentiators = [
  {
    number: '01',
    Icon: Target,
    title: 'Results, Not Deliverables',
    body: "Most agencies bill for hours. We're obsessed with outcomes. Every engagement is tied to measurable goals, and we don't stop until we hit them.",
  },
  {
    number: '02',
    Icon: Users,
    title: 'No Account Managers. No Layers.',
    body: 'You work directly with the people building your project. Senior-level attention from day one — not handed off to a junior team.',
  },
  {
    number: '03',
    Icon: Handshake,
    title: 'Long-Term Partners, Not One-Off Vendors',
    body: 'We build long-term relationships. Our best clients have been with us for years because we grow alongside them.',
  },
]

export function WhyAlvis() {
  return (
    <section className="py-20 md:py-28 bg-subtle">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel className="mb-4 justify-center">Why Alvis</SectionLabel>
          <h2 className="text-display-lg font-display font-bold text-text">
            What Makes Us Different
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map(({ number, Icon, title, body }) => (
            <div
              key={number}
              className="bg-surface border border-border rounded-2xl p-8 hover:border-accent transition-colors duration-200"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-accent" />
                </div>
                <span className="text-display-lg font-display font-bold text-text-faint">
                  {number}
                </span>
              </div>
              <h3 className="text-display-md font-display font-semibold text-text mb-3">
                {title}
              </h3>
              <p className="text-body-md text-text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
