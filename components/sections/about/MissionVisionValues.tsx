'use client'

const values = [
  {
    title: 'Integrity',
    desc: 'We believe in honesty and transparency.',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: 'Innovation',
    desc: 'We embrace new ideas and creative thinking.',
    icon: <path d="M9.7 17h4.6M12 3v1m6.4 1.6-.7.7M21 12h-1M4 12H3m3.3-5.7-.7-.7m2.8 9.9a5 5 0 1 1 7.1 0l-.5.6a3.4 3.4 0 0 0-1 2.4V19a2 2 0 1 1-4 0v-.5c0-.9-.4-1.8-1-2.4l-.6-.6z" />,
  },
  {
    title: 'Excellence',
    desc: 'We are committed to delivering the best.',
    icon: <path d="M12 2 15 9l7 .6-5.3 4.6L18.3 21 12 17.3 5.7 21l1.6-6.8L2 9.6 9 9l3-7z" />,
  },
  {
    title: 'Client Success',
    desc: 'Your success is our ultimate goal.',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
]

/* 3D-style dartboard used by the Mission card */
function TargetArt() {
  return (
    <svg width="92" height="92" viewBox="0 0 64 64" fill="none" className="shrink-0">
      <circle cx="32" cy="34" r="27" fill="#000" opacity="0.06" />
      <circle cx="32" cy="32" r="26" fill="#e63946" />
      <circle cx="32" cy="32" r="19" fill="#fff" />
      <circle cx="32" cy="32" r="12" fill="#e63946" />
      <circle cx="32" cy="32" r="5.5" fill="#fff" />
      <circle cx="32" cy="32" r="2.5" fill="#e63946" />
      <path d="M32 32 54 12" stroke="#485f84" strokeWidth="3.4" strokeLinecap="round" />
      <path d="m50 8 7 1-1 7-6-8z" fill="#3b82f6" />
    </svg>
  )
}

/* 3D-style eye used by the Vision card */
function EyeArt() {
  return (
    <svg width="92" height="92" viewBox="0 0 64 64" fill="none" className="shrink-0">
      <circle cx="32" cy="34" r="27" fill="#000" opacity="0.06" />
      <circle cx="32" cy="32" r="26" fill="#e8f1fd" />
      <path d="M9 32s9-13 23-13 23 13 23 13-9 13-23 13S9 32 9 32z" fill="#fff" stroke="#3b82f6" strokeWidth="2.6" />
      <circle cx="32" cy="32" r="9" fill="#3b82f6" />
      <circle cx="32" cy="32" r="4" fill="#0a1b3d" />
      <circle cx="29" cy="29" r="1.8" fill="#fff" />
    </svg>
  )
}

function Card({ art, word, body }: { art: React.ReactNode; word: string; body: string }) {
  return (
    <div
      className="bg-white rounded-3xl p-7 flex items-start gap-5"
      style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
    >
      {art}
      <div>
        <h3 className="font-display font-extrabold text-[22px] mb-2" style={{ color: '#0d0d0d' }}>
          Our <span style={{ color: '#e63946' }}>{word}</span>
        </h3>
        <p className="mb-4" style={{ fontSize: '14px', lineHeight: '1.6', color: '#5b403f' }}>{body}</p>
        <span className="block w-12 h-[3px] rounded-full" style={{ background: '#e63946' }} />
      </div>
    </div>
  )
}

export function MissionVisionValues() {
  return (
    <section className="px-5 md:px-8 pb-24" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card
          art={<TargetArt />}
          word="Mission"
          body="To deliver innovative digital solutions that help businesses grow, build strong brands and achieve long-term success."
        />
        <Card
          art={<EyeArt />}
          word="Vision"
          body="To become the most trusted digital marketing agency known for creativity, integrity and results."
        />

        <div className="flex flex-col justify-center">
          <h3 className="font-display font-extrabold text-[22px] mb-6" style={{ color: '#0d0d0d' }}>
            Our C
            <span className="relative inline-block">
              ore Values
              <span className="absolute left-0 -bottom-1 w-full h-[3px] rounded-full" style={{ background: '#e63946' }} />
            </span>
          </h3>

          <div className="space-y-5">
            {values.map(v => (
              <div key={v.title} className="flex items-center gap-4">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#fde8ea', color: '#e63946' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {v.icon}
                  </svg>
                </span>
                <span>
                  <span className="block font-bold text-[14px]" style={{ color: '#0d0d0d' }}>{v.title}</span>
                  <span className="block text-[13px]" style={{ color: '#5b403f' }}>{v.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
