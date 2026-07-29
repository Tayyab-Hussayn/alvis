import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'

const badges = [
  { name: 'Google Partner',        abbr: 'GP'  },
  { name: 'Meta Business Partner', abbr: 'MB'  },
  { name: 'Clutch Top Agency',     abbr: 'CL'  },
  { name: 'Certified Excellence',  abbr: 'CE'  },
]

export function Recognition() {
  return (
    <section className="bg-subtle py-20">
      <Container>
        <div className="text-center mb-12">
          <SectionLabel className="mb-4 justify-center">Recognition</SectionLabel>
          <h2 className="text-display-md font-display font-bold text-text">
            Recognized by the Best
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {badges.map(({ name, abbr }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {/* Placeholder badge shape */}
              <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center">
                <span className="text-display-md font-display font-bold text-text-faint">
                  {abbr}
                </span>
              </div>
              <p className="text-body-sm text-text-muted text-center">{name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
