'use client'

export function AboutHero() {
  return (
    <section className="relative w-full min-h-[700px] flex flex-col items-center justify-center overflow-hidden py-28">

      {/* Gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0b1c30 0%, #004ac6 55%, #1e1b4b 100%)',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,74,198,0.35) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.30) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,74,198,0.20) 0%, transparent 60%)', filter: 'blur(80px)' }} />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        <div
          className="w-full rounded-3xl p-10 md:p-12"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <span className="block text-[12px] font-semibold uppercase tracking-widest mb-6"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            OUR STORY
          </span>
          <h1 className="font-bold leading-tight tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>
            Built to ship,<br />not to sell.
          </h1>
          <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '17px', lineHeight: '1.7' }}>
            <p>
              Alvis started as a two-person team with one belief: most agencies overpromise because
              they&apos;re selling before they&apos;re building. We flipped that — every engagement starts
              with a technical assessment, not a pitch deck.
            </p>
            <p>
              Today we work with founders, startups, and established businesses across 3 continents.
              The team is small by design. Every client gets senior attention, every project gets
              shipped.
            </p>
          </div>
        </div>

        {/* Frosted stat pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {['3 Continents', '50+ Clients', '200+ Projects'].map(stat => (
            <div
              key={stat}
              className="px-6 py-3 rounded-full text-[13px] font-semibold text-white"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
