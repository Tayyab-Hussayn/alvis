'use client'

const Stars = ({ color = '#004ac6' }: { color?: string }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color }} className="text-xl leading-none">★</span>
    ))}
  </div>
)

export function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#004ac6] text-[12px] font-semibold tracking-widest uppercase mb-4 block">
            Our Impact
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-[#0b1c30] mb-6">
            Success Stories from Our Clients
          </h2>
          <p className="text-[18px] leading-relaxed text-[#434655] max-w-2xl mx-auto">
            Discover how Alvis has empowered businesses across the globe with technical precision and creative marketing excellence.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">

          {/* Card 1 — David Chen: quote icon + avatar */}
          <div className="masonry-item">
            <div className="group bg-white rounded-2xl p-8 custom-shadow border border-[#c3c6d7]/30 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <span className="text-[#004ac6] text-5xl leading-none opacity-40 group-hover:opacity-100 transition-opacity select-none">&ldquo;</span>
                <div className="w-16 h-16 rounded-full border-2 border-[#2563eb] p-0.5 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/testimonials/david-chen.jpg"
                    alt="David Chen"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div>
                <p className="text-[#0b1c30] text-[17px] italic leading-relaxed mb-6">
                  &ldquo;The automation workflows they built saved us over 20 hours a week.&rdquo;
                </p>
                <div className="border-t border-[#c3c6d7]/20 pt-4">
                  <p className="font-bold text-[#0b1c30]">David Chen</p>
                  <p className="text-[13px] text-[#434655]">COO, Tech Logistics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Sarah Jenkins: centered, large avatar, stars */}
          <div className="masonry-item">
            <div className="bg-white rounded-2xl p-8 custom-shadow border border-[#c3c6d7]/30 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-24 h-24 rounded-full p-1.5 bg-[#2563eb]/10 mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/testimonials/sarah-jenkins.jpg"
                  alt="Sarah Jenkins"
                  className="w-full h-full object-cover rounded-full shadow-md"
                />
              </div>
              <Stars />
              <h3 className="text-[22px] font-semibold text-[#0b1c30] mt-4 mb-3">Incredible Results!!</h3>
              <p className="text-[15px] text-[#434655] leading-relaxed mb-6">
                &ldquo;Working with Alvis was a game-changer for our digital presence. Their attention to detail is unmatched.&rdquo;
              </p>
              <p className="font-semibold text-[#004ac6]">Sarah Jenkins</p>
            </div>
          </div>

          {/* Card 3 — Emma Richardson: image on top, text below */}
          <div className="masonry-item">
            <div className="bg-white rounded-2xl overflow-hidden custom-shadow border border-[#c3c6d7]/30 transition-all duration-300 hover:-translate-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/testimonials/emma-office.jpg"
                alt="Modern Office Setting"
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <p className="text-[#0b1c30] text-[16px] italic mb-6">
                  &ldquo;A perfect blend of technical expertise and creative vision.&rdquo;
                </p>
                <p className="italic text-[22px] text-[#434655]/70 border-t border-[#c3c6d7]/20 pt-4">
                  Emma Richardson
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 — Top Tier Quality: blue accent card */}
          <div className="masonry-item">
            <div className="bg-[#2563eb] text-[#eeefff] rounded-2xl p-8 custom-shadow transition-all duration-300 hover:-translate-y-1">
              <Stars color="#eeefff" />
              <h3 className="text-[22px] font-semibold mt-6 mb-3">Top Tier Quality</h3>
              <p className="text-[15px] opacity-90 leading-relaxed">
                Delivered exactly what we needed, ahead of schedule. Highly recommended!
              </p>
            </div>
          </div>

          {/* Card 5 — Michael Ross: side-by-side image + quote */}
          <div className="masonry-item">
            <div className="bg-white rounded-2xl overflow-hidden custom-shadow border border-[#c3c6d7]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row">
              <div className="md:w-2/5 shrink-0 min-h-[180px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/testimonials/michael-ross.jpg"
                  alt="Michael Ross"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[#004ac6] text-4xl leading-none mb-4 select-none">&ldquo;</span>
                <p className="text-[#0b1c30] text-[15px] italic leading-relaxed mb-6">
                  &ldquo;The most seamless agency experience we have ever had.&rdquo;
                </p>
                <p className="font-bold text-[#004ac6]">Michael Ross</p>
              </div>
            </div>
          </div>

          {/* Card 6 — Jessica Wu: minimal, stacked avatars */}
          <div className="masonry-item">
            <div className="bg-white rounded-2xl p-8 custom-shadow border border-[#c3c6d7]/30 flex flex-col transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-[22px] font-semibold text-[#0b1c30] mb-4">Beyond Impressed</h3>
              <p className="text-[15px] text-[#434655] leading-relaxed mb-8">
                &ldquo;They understood our complex requirements immediately and executed perfectly.&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#0b1c30]">Jessica Wu</p>
                <div className="flex -space-x-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/testimonials/jessica-team.jpg"
                    alt="Team member"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover ring-2 ring-[#2563eb]/10"
                  />
                  <div className="w-10 h-10 rounded-full bg-[#2563eb] text-[#eeefff] flex items-center justify-center text-xs font-bold border-2 border-white ring-2 ring-[#2563eb]/10">
                    +4
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 7 — Robert Vance: speech bubble with avatar */}
          <div className="masonry-item">
            <div className="speech-bubble bg-white rounded-3xl p-10 custom-shadow border border-[#c3c6d7]/20 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-[#004ac6] text-3xl leading-none flex-shrink-0 select-none">&ldquo;</span>
                    <span className="text-[#0b1c30] text-[20px] font-bold leading-snug">
                      Alvis turned our vision into reality.
                    </span>
                  </div>
                  <p className="text-[#434655] text-[15px] italic mb-4">
                    Highly responsive and professional throughout.
                  </p>
                  <div className="pt-4 border-t border-[#c3c6d7]/10">
                    <span className="text-[#004ac6] font-bold text-[13px]">Robert Vance, Founder</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/testimonials/robert-vance.jpg"
                    alt="Robert Vance"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
