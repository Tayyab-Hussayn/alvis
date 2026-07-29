import { Container } from '@/components/ui/Container'

const logos = [
  'NovaBridge',
  'Stacklane',
  'Lumient',
  'Fervent Group',
  'Meridian Finance',
  'Apex Fitness',
  'OrbitalTech',
  'PinnacleCo',
  'Veritas Labs',
  'CrestMedia',
]

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center mx-12 flex-shrink-0">
      <span className="text-body-sm font-display font-semibold text-text-muted opacity-50 hover:opacity-100 hover:text-text transition-all duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function TrustBar() {
  return (
    <section className="bg-subtle py-12 border-y border-border overflow-hidden">
      <Container>
        <p className="text-body-sm text-text-faint text-center uppercase tracking-widest mb-8">
          Trusted by growing companies worldwide
        </p>
      </Container>

      {/* Marquee row 1 — left */}
      <div className="relative flex overflow-hidden mb-4">
        <div className="flex animate-[scroll-left_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((name, i) => (
            <LogoItem key={`r1a-${i}`} name={name} />
          ))}
        </div>
        <div
          className="flex animate-[scroll-left_25s_linear_infinite] hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {[...logos, ...logos].map((name, i) => (
            <LogoItem key={`r1b-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — right */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-[scroll-right_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((name, i) => (
            <LogoItem key={`r2a-${i}`} name={name} />
          ))}
        </div>
        <div
          className="flex animate-[scroll-right_30s_linear_infinite] hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {[...logos, ...logos].map((name, i) => (
            <LogoItem key={`r2b-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  )
}
