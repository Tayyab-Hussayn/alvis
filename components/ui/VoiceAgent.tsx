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

/* iOS label colours — kept as constants so the whole panel stays on one system. */
const LABEL = '#0b0b0f'
const LABEL_2 = 'rgba(60,60,67,0.62)'
const LABEL_3 = 'rgba(60,60,67,0.36)'

/* ------------------------------------------------------------------ icons */

function MicIcon({ size = 20, strokeWidth = 1.8 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
    </svg>
  )
}

function MicOffIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2l20 20" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
      <path d="M19 10v2a7 7 0 0 1-.31 2.05M12 19v3M5 10v2a7 7 0 0 0 10.68 5.96" />
    </svg>
  )
}

function HangUpIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 9c-1.6 0-3.15.25-4.6.7v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85a.99.99 0 0 1-1.35-.02L.29 13.08a.99.99 0 0 1 0-1.4C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.68a.99.99 0 0 1 0 1.4l-2.54 2.45a.99.99 0 0 1-1.35.02 11.7 11.7 0 0 0-2.66-1.85.998.998 0 0 1-.56-.9V9.7C15.15 9.25 13.6 9 12 9z" />
    </svg>
  )
}

function CloseIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.6" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/* ------------------------------------------------------------- Siri-style orb */

/**
 * Layered blurred gradient blobs behind a frosted disc. Scales with live volume so
 * the orb physically reacts to speech rather than looping a canned animation.
 */
function Orb({ level, speaking, phase }: { level: number; speaking: boolean; phase: Phase }) {
  const active = phase === 'live' || phase === 'connecting'
  const v = Math.min(level, 1)

  return (
    <div className="va-orb relative flex items-center justify-center" style={{ width: 150, height: 150 }}>
      {/* ambient glow */}
      <span
        aria-hidden
        className="absolute rounded-full transition-transform duration-150 ease-out"
        style={{
          width: 150, height: 150,
          background: `radial-gradient(circle, rgba(230,57,70,${speaking ? 0.3 : 0.16}) 0%, rgba(230,57,70,0) 70%)`,
          transform: `scale(${active ? 1 + v * 0.35 : 1})`,
        }}
      />

      {/* connecting pulse */}
      {phase === 'connecting' && (
        <>
          <span aria-hidden className="va-ring absolute rounded-full" style={{ width: 104, height: 104, border: `1.5px solid rgba(230,57,70,0.5)` }} />
          <span aria-hidden className="va-ring va-ring-delay absolute rounded-full" style={{ width: 104, height: 104, border: `1.5px solid rgba(230,57,70,0.5)` }} />
        </>
      )}

      {/* frosted disc holding the animated mesh */}
      <span
        className="va-orb-disc relative rounded-full overflow-hidden flex items-center justify-center transition-transform duration-150 ease-out"
        style={{
          width: 104, height: 104,
          transform: `scale(${active ? 1 + v * 0.08 : 1})`,
          animation: !active ? 'va-breathe 4s ease-in-out infinite' : undefined,
        }}
      >
        <span aria-hidden className="va-blob va-blob-a" />
        <span aria-hidden className="va-blob va-blob-b" />
        <span aria-hidden className="va-blob va-blob-c" />
        <span className="relative" style={{ color: speaking ? '#fff' : RED_DEEP, transition: 'color 0.25s' }}>
          <MicIcon size={30} strokeWidth={1.7} />
        </span>
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
  const [firstVisit, setFirstVisit] = useState(false)

  const clientRef = useRef<RetellWebClient | null>(null)
  const rafRef = useRef<number | null>(null)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const key = 'alvis_voice_seen'
      if (!sessionStorage.getItem(key)) {
        setFirstVisit(true)
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

  useEffect(() => () => { endCall() }, [endCall])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { endCall(); setOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, endCall])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [turns])

  const startCall = useCallback(async () => {
    setError('')
    setTurns([])
    setPhase('connecting')

    try {
      // Lazy: the SDK touches browser-only APIs and must not run during SSR.
      const { RetellWebClient } = await import('retell-client-js-sdk')

      const res = await fetch('/api/retell/web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagePath: window.location.pathname, referrer: document.referrer }),
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
        const tick = () => {
          try {
            const val = client.analyzerComponent?.calculateVolume?.() ?? 0
            setLevel(Number.isFinite(val) ? val : 0)
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

      // Token expires after 30s — start immediately.
      await client.startCall({ accessToken })
    } catch (err) {
      console.error('[VoiceAgent] start failed', err)
      setError(
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Microphone access was blocked. Allow it in your browser settings and try again.'
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
    phase === 'connecting' ? 'Connecting'
    : phase === 'live' ? (speaking ? 'Speaking' : muted ? 'Muted' : 'Listening')
    : phase === 'ended' ? 'Call ended'
    : phase === 'error' ? 'Not connected'
    : 'Ready'

  const dotColor =
    phase === 'live' ? '#34c759' : phase === 'connecting' ? '#ff9f0a'
    : phase === 'error' ? RED : 'rgba(60,60,67,0.3)'

  const lastTurns = turns.slice(-10)
  const inCall = phase === 'connecting' || phase === 'live'

  return (
    <>
      {/* ---------------------------------------------------------- launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Talk to the Alvis voice assistant"
          className="va-launcher group fixed z-[60] flex items-center rounded-full"
        >
          {firstVisit && (
            <>
              <span aria-hidden className="va-ring absolute inset-0 rounded-full" style={{ border: `1.5px solid rgba(230,57,70,0.55)` }} />
              <span aria-hidden className="va-ring va-ring-delay absolute inset-0 rounded-full" style={{ border: `1.5px solid rgba(230,57,70,0.55)` }} />
            </>
          )}
          <span
            className="relative flex items-center justify-center rounded-full shrink-0"
            style={{ width: 30, height: 30, color: RED_DEEP }}
          >
            <MicIcon size={21} strokeWidth={1.9} />
          </span>
          <span className="va-launcher-label overflow-hidden whitespace-nowrap text-[14px] font-semibold" style={{ color: LABEL, letterSpacing: '-0.01em' }}>
            <span className="block pl-2.5 pr-1.5">Talk to us</span>
          </span>
        </button>
      )}

      {/* ------------------------------------------------------------- panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Alvis voice assistant"
          className="va-panel fixed z-[60] flex flex-col overflow-hidden"
        >
          {/* mobile grabber */}
          <span aria-hidden className="va-grabber" />

          {/* header */}
          <div className="va-header flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 34, height: 34,
                  background: `linear-gradient(150deg, ${RED}, ${RED_DEEP})`,
                  color: '#fff',
                  boxShadow: '0 4px 12px -3px rgba(230,57,70,0.55)',
                }}
              >
                <MicIcon size={16} strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-bold text-[14.5px] leading-tight truncate" style={{ color: LABEL, letterSpacing: '-0.02em' }}>
                  Alvis Assistant
                </span>
                <span className="flex items-center gap-1.5 text-[11.5px] font-medium" style={{ color: LABEL_2 }}>
                  <span
                    className="rounded-full shrink-0"
                    style={{
                      width: 6, height: 6, background: dotColor,
                      animation: phase === 'live' ? 'va-blink 1.9s ease-in-out infinite' : undefined,
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
              className="va-close flex items-center justify-center rounded-full shrink-0"
            >
              <CloseIcon />
            </button>
          </div>

          {/* body */}
          <div className="flex-1 flex flex-col min-h-0">
            {!inCall && (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-7 py-4">
                <Orb level={0} speaking={false} phase={phase} />

                <h3 className="font-display font-bold mt-5 mb-2" style={{ fontSize: '21px', letterSpacing: '-0.03em', color: LABEL }}>
                  {phase === 'ended' ? 'Thanks for talking' : 'Ask us anything'}
                </h3>
                <p className="text-[13.5px] mb-6 max-w-[264px]" style={{ lineHeight: '1.55', color: LABEL_2 }}>
                  {phase === 'ended'
                    ? 'Want to pick up where you left off?'
                    : 'Talk to our assistant about services, pricing or past work. It only takes a minute.'}
                </p>

                {phase === 'error' && error && (
                  <p className="va-alert text-[12.5px] mb-4 max-w-[280px]" role="alert">{error}</p>
                )}

                <button type="button" onClick={startCall} className="va-cta">
                  <span>{phase === 'ended' || phase === 'error' ? 'Start again' : 'Start conversation'}</span>
                  <span className="va-cta-chip"><MicIcon size={15} strokeWidth={2} /></span>
                </button>

                <p className="text-[11px] mt-4" style={{ color: LABEL_3 }}>
                  Your browser will ask for microphone access
                </p>
              </div>
            )}

            {inCall && (
              <div className="flex-1 flex flex-col items-center min-h-0 px-5 pt-2">
                <Orb level={level} speaking={speaking} phase={phase} />

                <div ref={logRef} className="va-log w-full mt-3 flex-1 min-h-0 overflow-y-auto space-y-2" aria-live="polite">
                  {lastTurns.length === 0 && phase === 'live' && (
                    <p className="text-center text-[12.5px] pt-3" style={{ color: LABEL_3 }}>
                      Say hello to get started
                    </p>
                  )}
                  {lastTurns.map((t, i) => {
                    const isAgent = t.role === 'agent' || t.role === 'assistant'
                    return (
                      <div key={i} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                        <span className={isAgent ? 'va-bubble va-bubble-agent' : 'va-bubble va-bubble-user'}>
                          {t.content}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* FaceTime-style control row */}
          {inCall && (
            <div className="va-controls shrink-0">
              <button
                type="button"
                onClick={toggleMute}
                disabled={phase !== 'live'}
                aria-pressed={muted}
                aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
                className={`va-ctrl ${muted ? 'va-ctrl-on' : ''}`}
              >
                {muted ? <MicOffIcon size={19} /> : <MicIcon size={19} />}
              </button>

              <button
                type="button"
                onClick={endCall}
                aria-label="End call"
                className="va-ctrl va-ctrl-end"
              >
                <HangUpIcon size={21} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
