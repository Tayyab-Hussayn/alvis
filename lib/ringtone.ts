/**
 * Outbound ringback tone, synthesized with the Web Audio API.
 *
 * Synthesized rather than shipped as an audio file: no extra request, no CSP
 * media-src concerns, and the tone can be stopped mid-cycle with a clean fade
 * instead of an abrupt cut.
 *
 * The tone is the classic 440 Hz + 480 Hz ringback pair — the two frequencies
 * beat against each other, which is what gives a real phone ring its warmth —
 * plus a quiet octave partial for shimmer, run through a lowpass and a small
 * synthesized reverb so it sounds like a room rather than a test tone.
 *
 * Pattern is a double-ring (two short bursts, then a rest), which reads as
 * "calling someone" rather than "alarm".
 */

const CYCLE_S = 1.9          // full ring cycle: burst, gap, burst, rest
const BURST_S = 0.4
const GAP_S = 0.22
const PEAK_GAIN = 0.16       // deliberately restrained; this plays unprompted
const ATTACK_S = 0.025
const RELEASE_S = 0.11

type Ctx = AudioContext & { webkitAudioContext?: never }

function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  return AC ? new AC() : null
}

/** Short exponentially-decaying noise burst used as a reverb impulse response. */
function buildImpulse(ctx: AudioContext, seconds = 1.6, decay = 3.2): AudioBuffer {
  const rate = ctx.sampleRate
  const length = Math.max(1, Math.floor(rate * seconds))
  const impulse = ctx.createBuffer(2, length, rate)

  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
    }
  }
  return impulse
}

export class Ringtone {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private timer: ReturnType<typeof setInterval> | null = null
  private stopped = true

  /** True once audio is actually running (autoplay policy can block it). */
  get playing(): boolean {
    return !this.stopped
  }

  async start(): Promise<void> {
    if (!this.stopped) return
    this.stopped = false

    try {
      const ctx = createAudioContext()
      if (!ctx) return
      this.ctx = ctx

      // Must be resumed from a user gesture; startCall is called from a click.
      if (ctx.state === 'suspended') await ctx.resume()

      const master = ctx.createGain()
      master.gain.value = 1
      master.connect(ctx.destination)
      this.master = master

      // Reverb send, kept subtle — enough to give the tone some air.
      const convolver = ctx.createConvolver()
      convolver.buffer = buildImpulse(ctx)
      const wet = ctx.createGain()
      wet.gain.value = 0.5
      convolver.connect(wet)
      wet.connect(master)
      ;(this as unknown as { _wetIn: ConvolverNode })._wetIn = convolver

      // First cycle immediately, then repeat.
      this.scheduleCycle()
      this.timer = setInterval(() => this.scheduleCycle(), CYCLE_S * 1000)
    } catch {
      // Audio is a nicety; never let it break the call flow.
      this.stopped = true
    }
  }

  private scheduleCycle(): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master || this.stopped) return

    const now = ctx.currentTime + 0.02
    this.scheduleBurst(now)
    this.scheduleBurst(now + BURST_S + GAP_S)
  }

  private scheduleBurst(at: number): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master) return

    const wetIn = (this as unknown as { _wetIn?: ConvolverNode })._wetIn

    const burst = ctx.createGain()
    burst.gain.setValueAtTime(0.0001, at)
    burst.gain.exponentialRampToValueAtTime(PEAK_GAIN, at + ATTACK_S)
    burst.gain.setValueAtTime(PEAK_GAIN, at + BURST_S - RELEASE_S)
    burst.gain.exponentialRampToValueAtTime(0.0001, at + BURST_S)

    // Warmth: roll off the top so it reads as a phone, not a synth lead.
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1700
    lp.Q.value = 0.6

    lp.connect(burst)
    burst.connect(master)
    if (wetIn) burst.connect(wetIn)

    const voices: Array<[number, number]> = [
      [440, 0.5],   // classic ringback pair — these two beating together
      [480, 0.5],   // is the characteristic phone-ring sound
      [880, 0.09],  // quiet octave for shimmer
    ]

    for (const [freq, gainValue] of voices) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq

      const g = ctx.createGain()
      g.gain.value = gainValue

      osc.connect(g)
      g.connect(lp)
      osc.start(at)
      osc.stop(at + BURST_S + 0.05)
    }
  }

  /** Fade out over ~120ms so stopping never clicks. */
  stop(): void {
    if (this.stopped) return
    this.stopped = true

    if (this.timer !== null) {
      clearInterval(this.timer)
      this.timer = null
    }

    const ctx = this.ctx
    const master = this.master
    this.ctx = null
    this.master = null

    if (!ctx || !master) return

    try {
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now)
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
    } catch {
      /* context may already be closing */
    }

    setTimeout(() => {
      try { ctx.close() } catch { /* already closed */ }
    }, 220)
  }
}

/**
 * Two-note rising blip marking the moment the agent picks up — the audible
 * equivalent of the call connecting.
 */
export function playConnectChime(): void {
  try {
    const ctx = createAudioContext()
    if (!ctx) return

    const play = (freq: number, at: number, dur: number) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      g.gain.setValueAtTime(0.0001, at)
      g.gain.exponentialRampToValueAtTime(0.12, at + 0.015)
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
      osc.connect(g)
      g.connect(ctx.destination)
      osc.start(at)
      osc.stop(at + dur + 0.02)
    }

    const t = ctx.currentTime + 0.01
    play(660, t, 0.1)
    play(990, t + 0.09, 0.16)

    setTimeout(() => { try { ctx.close() } catch { /* noop */ } }, 600)
  } catch {
    /* non-critical */
  }
}
