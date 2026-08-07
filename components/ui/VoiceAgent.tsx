'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { RetellWebClient } from 'retell-client-js-sdk'

type Phase = 'idle' | 'connecting' | 'live' | 'ended' | 'error'

interface Turn {
  role: string
  content: string
}

const RED = '#e63946'
const RED_DEEP = '#b7102a'
const NAVY = '#0a1b3d'

/* ------------------------------------------------------------------ icons */

function MicIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
    </svg>
  )
}

function MicOffIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2l20 20" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
      <path d="M19 10v2a7 7 0 0 1-.31 2.05M12 19v3M5 10v2a7 7 0 0 0 10.68 5.96" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/* --------------------------------------------------------- audio-reactive orb */

/**
 * Scales with live mic/agent volume via the SDK's analyser. Falls back to a calm
 * idle pulse when there is no signal, so it never looks frozen.
 */
function Orb({ level, speaking, phase }: { level: number; speaking: boolean; phase: Phase }) {
  const active = phase === 'live'
  const scale = active ? 1 + Math.min(level, 1) * 0.42 : 1

  return (
    <div className="relative flex items-center justify-center" style={{ width: 132, height: 132 }}>
      {/* outer reactive halo */}
      <span
        aria-hidden
        className="absolute rounded-full transition-transform duration-100 ease-out"
        style={{
          width: 132, height: 132,
          background: `radial-gradient(circle, ${speaking ? 'rgba(230,57,70,0.42)' : 'rgba(255,255,255,0.18)'} 0%, transparent 68%)`,
          transform: `scale(${scale})`,
        }}
      />
      {/* breathing rings while connecting */}
      {phase === 'connecting' && (
        <>
          <span aria-hidden className="va-ring absolute rounded-full" style={{ width: 96, height: 96, border: `2px solid ${RED}` }} />
          <span aria-hidden className="va-ring va-ring-delay absolute rounded-full" style={{ width: 96, height: 96, border: `2px solid ${RED}` }} />
        </>
      )}
      {/* core */}
      <span
        className="relative rounded-full flex items-center justify-center text-white transition-transform duration-100 ease-out"
        style={{
          width: 84, height: 84,
          background: speaking
            ? `linear-gradient(140deg, ${RED}, ${RED_DEEP})`
            : 'linear-gradient(140deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))',
          border: `1px solid ${speaking ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.22)'}`,
          boxShadow: speaking ? '0 0 44px -6px rgba(230,57,70,0.75)' : 'none',
          transform: `scale(${active ? 1 + Math.min(level, 1) * 0.1 : 1})`,
          animation: !active ? 'va-breathe 3.2s ease-in-out infinite' : undefined,
        }}
      >
        <MicIcon size={30} />
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ widget */

export function VoiceAgent() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [muted, setMuted] = useState(false)
  const [level, setLevel] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [turns, setTurns] = useState<Turn[]>([])
  const [error, setError] = useState('')
  const [seenBefore, setSeenBefore] = useState(true)

  const clientRef = useRef<RetellWebClient | null>(null)
  const rafRef = useRef<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)

  /* Nudge first-time visitors once per session. */
  useEffect(() => {
    try {
      const key = 'alvis_voice_seen'
      if (!sessionStorage.getItem(key)) {
        setSeenBefore(false)
        sessionStorage.setItem(key, '1')
      }
    } catch { /* private mode */ }
  }, [])

  const stopMeter = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setLevel(0)
  }, [])

  const endCall = useCallback(() => {
    try { clientRef.current?.stopCall() } catch { /* already closed */ }
    stopMeter()
  }, [stopMeter])

  /* Tear down on unmount so a call never outlives the widget. */
  useEffect(() => () => { endCall() }, [endCall])

  /* Escape closes the panel (and hangs up if live). */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { endCall(); setOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, endCall])

  /* Keep the transcript pinned to the newest line. */
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [turns])

  const startCall = useCallback(async () => {
    setError('')
    setTurns([])
    setPhase('connecting')

    try {
      // Imported lazily: the SDK touches browser-only APIs and must not run during SSR.
      const { RetellWebClient } = await import('retell-client-js-sdk')

      const res = await fetch('/api/retell/web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pagePath: window.location.pathname,
          referrer: document.referrer,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Could not start the call.')
        setPhase('error')
        return
      }

      const { accessToken } = await res.json()

      const client = new RetellWebClient()
      clientRef.current = client

      client.on('call_started', () => {
        setPhase('live')
        setMuted(false)

        // Drive the orb from the SDK analyser.
        const tick = () => {
          try {
            const v = client.analyzerComponent?.calculateVolume?.() ?? 0
            setLevel(Number.isFinite(v) ? v : 0)
          } catch { /* analyser not ready */ }
          rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
      })

      client.on('agent_start_talking', () => setSpeaking(true))
      client.on('agent_stop_talking', () => setSpeaking(false))

      client.on('update', (update: { transcript?: Turn[] }) => {
        if (Array.isArray(update?.transcript)) setTurns(update.transcript)
      })

      client.on('call_ended', () => {
        setPhase('ended')
        setSpeaking(false)
        stopMeter()
      })

      client.on('error', (e: unknown) => {
        console.error('[VoiceAgent]', e)
        setError('The connection dropped. Please try again.')
        setPhase('error')
        setSpeaking(false)
        stopMeter()
        try { client.stopCall() } catch { /* noop */ }
      })

      // Token is only valid for 30s — start immediately.
      await client.startCall({ accessToken })
    } catch (err) {
      console.error('[VoiceAgent] start failed', err)
      setError(
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Microphone access was blocked. Allow it in your browser and try again.'
          : 'Could not start the call. Please try again.',
      )
      setPhase('error')
    }
  }, [stopMeter])

  const toggleMute = useCallback(() => {
    const c = clientRef.current
    if (!c) return
    if (muted) { c.unmute(); setMuted(false) } else { c.mute(); setMuted(true) }
  }, [muted])

  const statusLabel =
    phase === 'connecting' ? 'Connecting…'
    : phase === 'live' ? (speaking ? 'Ava is speaking' : muted ? 'Microphone muted' : 'Listening…')
    : phase === 'ended' ? 'Call ended'
    : phase === 'error' ? 'Something went wrong'
    : 'Ready when you are'

  const lastTurns = turns.slice(-8)

  return (
    <>
      {/* ---------------------------------------------------------- launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Talk to the Alvis voice assistant"
          className="va-launcher group fixed z-[60] flex items-center gap-0 rounded-full text-white shadow-2xl transition-transform hover:scale-[1.04] active:scale-95"
          style={{
            right: 'clamp(16px, 4vw, 28px)',
            bottom: 'clamp(16px, 4vw, 28px)',
            background: `linear-gradient(135deg, ${RED}, ${RED_DEEP})`,
            boxShadow: '0 18px 44px -12px rgba(183,16,42,0.6)',
            padding: '14px',
          }}
        >
          {/* attention rings, first visit only */}
          {!seenBefore && (
            <>
              <span aria-hidden className="va-ring absolute inset-0 rounded-full" style={{ border: `2px solid ${RED}` }} />
              <span aria-hidden className="va-ring va-ring-delay absolute inset-0 rounded-full" style={{ border: `2px solid ${RED}` }} />
            </>
          )}
          <span className="relative flex items-center justify-center" style={{ width: 26, height: 26 }}>
            <MicIcon size={22} />
          </span>
          {/* label expands on hover (pointer devices only) */}
          <span className="va-launcher-label relative overflow-hidden whitespace-nowrap text-[13px] font-bold tracking-[0.02em]">
            <span className="block pl-2 pr-1">Talk to us</span>
          </span>
        </button>
      )}

      {/* ------------------------------------------------------------- panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Alvis voice assistant"
          className="va-panel fixed z-[60] flex flex-col overflow-hidden"
          style={{
            background: `linear-gradient(168deg, #0d2149 0%, ${NAVY} 46%, #071229 100%)`,
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 40px 90px -30px rgba(0,0,0,0.75)',
          }}
        >
          {/* header */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(140deg, ${RED}, ${RED_DEEP})` }}
              >
                <MicIcon size={17} />
              </span>
              <span>
                <span className="block font-display font-extrabold text-[14px] text-white leading-tight">
                  Alvis Assistant
                </span>
                <span className="flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: phase === 'live' ? '#4ade80' : phase === 'connecting' ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                      animation: phase === 'live' ? 'va-blink 1.8s ease-in-out infinite' : undefined,
                    }}
                  />
                  {statusLabel}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => { endCall(); setOpen(false) }}
              aria-label="Close voice assistant"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.06)' }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* body */}
          <div className="flex-1 flex flex-col items-center justify-center px-5 py-5 min-h-0">
            {/* idle / ended / error: pitch + CTA */}
            {(phase === 'idle' || phase === 'ended' || phase === 'error') && (
              <div className="text-center">
                <Orb level={0} speaking={false} phase={phase} />

                <h3 className="font-display font-extrabold text-white mt-4 mb-2" style={{ fontSize: '19px', letterSpacing: '-0.02em' }}>
                  {phase === 'ended' ? 'Thanks for calling' : 'Ask us anything'}
                </h3>
                <p className="text-[13px] mb-5 mx-auto max-w-[260px]" style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.62)' }}>
                  {phase === 'ended'
                    ? 'Want to pick up where you left off?'
                    : 'Talk to our assistant about services, pricing or past work. It only takes a minute.'}
                </p>

                {(phase === 'error' || error) && (
                  <p className="text-[12px] mb-4 rounded-lg px-3 py-2 mx-auto max-w-[280px]"
                     style={{ background: 'rgba(230,57,70,0.14)', color: '#ffb3b8' }} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={startCall}
                  className="inline-flex items-center gap-2.5 rounded-full text-white text-[13px] font-bold pl-6 pr-2 py-2 transition-transform hover:scale-[1.03] active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DEEP})`, boxShadow: '0 16px 36px -14px rgba(230,57,70,0.8)' }}
                >
                  {phase === 'ended' || phase === 'error' ? 'Start again' : 'Start conversation'}
                  <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.22)' }}>
                    <MicIcon size={16} />
                  </span>
                </button>

                <p className="text-[10.5px] mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Your browser will ask for microphone access
                </p>
              </div>
            )}

            {/* connecting / live */}
            {(phase === 'connecting' || phase === 'live') && (
              <div className="w-full flex flex-col items-center min-h-0 flex-1">
                <Orb level={level} speaking={speaking} phase={phase} />

                {/* transcript */}
                <div
                  ref={logRef}
                  className="va-log w-full mt-4 flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1"
                  aria-live="polite"
                >
                  {lastTurns.length === 0 && phase === 'live' && (
                    <p className="text-center text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Say hello to get started
                    </p>
                  )}
                  {lastTurns.map((t, i) => {
                    const isAgent = t.role === 'agent' || t.role === 'assistant'
                    return (
                      <div key={i} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                        <span
                          className="inline-block rounded-2xl px-3.5 py-2 text-[12.5px] max-w-[85%]"
                          style={{
                            lineHeight: '1.5',
                            background: isAgent ? 'rgba(255,255,255,0.09)' : `linear-gradient(135deg, ${RED}, ${RED_DEEP})`,
                            color: isAgent ? 'rgba(255,255,255,0.9)' : '#fff',
                            borderBottomLeftRadius: isAgent ? 6 : undefined,
                            borderBottomRightRadius: isAgent ? undefined : 6,
                          }}
                        >
                          {t.content}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* controls */}
          {(phase === 'connecting' || phase === 'live') && (
            <div
              className="flex items-center justify-center gap-3 px-5 py-4 shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                type="button"
                onClick={toggleMute}
                disabled={phase !== 'live'}
                aria-pressed={muted}
                className="flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-bold transition-colors disabled:opacity-40"
                style={{
                  background: muted ? 'rgba(230,57,70,0.18)' : 'rgba(255,255,255,0.08)',
                  color: muted ? '#ffb3b8' : 'rgba(255,255,255,0.85)',
                }}
              >
                {muted ? <MicOffIcon size={15} /> : <MicIcon size={15} />}
                {muted ? 'Unmute' : 'Mute'}
              </button>

              <button
                type="button"
                onClick={endCall}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
                style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DEEP})` }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                  <path d="M2 2l20 20" />
                </svg>
                End call
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
