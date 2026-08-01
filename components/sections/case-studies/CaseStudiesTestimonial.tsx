'use client'

export function CaseStudiesTestimonial() {
  return (
    <section className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div
        className="max-w-[1280px] mx-auto bg-white rounded-3xl px-8 py-10"
        style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex items-start gap-5">
            <span className="font-display font-extrabold shrink-0" style={{ fontSize: '64px', lineHeight: '0.8', color: '#e63946' }}>
              &ldquo;
            </span>
            <p style={{ fontSize: '17px', lineHeight: '1.65', color: '#271717' }}>
              Alvis Marketing Agency transformed our online presence and delivered outstanding results.
              Their strategies are innovative, data-driven and incredibly effective.
            </p>
          </div>

          <div className="lg:col-span-4 flex items-center gap-4 lg:justify-end">
            <span
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ background: '#0a1b3d' }}
            >
              TechNova
            </span>
            <span>
              <span className="block font-bold text-[15px]" style={{ color: '#0d0d0d' }}>David Johnson</span>
              <span className="block text-[13px] mb-2" style={{ color: '#8f6f6e' }}>CEO, TechNova</span>
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5b301">
                    <path d="M12 2l3 7 7 .6-5.3 4.6L18.3 21 12 17.3 5.7 21l1.6-6.8L2 9.6 9 9l3-7z" />
                  </svg>
                ))}
              </span>
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: i === 0 ? '#e63946' : '#f0dedd' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
