import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'

const categories = [
  {
    name: 'Development',
    items: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    name: 'Marketing',
    items: ['Google Ads', 'Meta Ads', 'SEMrush', 'Ahrefs', 'Mailchimp', 'HubSpot'],
  },
  {
    name: 'Design',
    items: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Framer'],
  },
  {
    name: 'Infrastructure',
    items: ['AWS', 'Vercel', 'Cloudflare', 'GitHub', 'cPanel'],
  },
]

export function TechStack() {
  return (
    <section className="py-20 md:py-28 bg-bg">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel className="mb-4 justify-center">Tools & Platforms</SectionLabel>
          <h2 className="text-display-lg font-display font-bold text-text">
            We Work With the Best Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(({ name, items }) => (
            <div key={name}>
              <h3 className="text-label uppercase tracking-widest text-text-muted mb-5">
                {name}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-body-md text-text-muted hover:text-text transition-colors duration-200 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
