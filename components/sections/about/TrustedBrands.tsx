'use client'

const brands = [
  { name: 'Google', color: '#4285F4' },
  { name: 'Meta', color: '#0668E1' },
  { name: 'HubSpot', color: '#FF7A59' },
  { name: 'Canva', color: '#00C4CC' },
  { name: 'slack', color: '#4A154B' },
]

export function TrustedBrands() {
  return (
    <section className="px-5 md:px-8 pb-20" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.1em] mb-8" style={{ color: '#e63946' }}>
          Trusted by Top Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
          {brands.map(b => (
            <span key={b.name} className="font-display font-bold text-2xl" style={{ color: b.color }}>
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
