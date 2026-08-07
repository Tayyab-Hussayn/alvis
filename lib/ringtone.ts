/**
 * Outbound ringback tone, synthesized with the Web Audio API.
 *
 * Synthesized rather than shipped as an audio file: no extra request, no CSP
 * media-src concerns, and the tone can be stopped mid-cycle with a clean fade
 * instead of an abrupt cut.
 *
 * Design follows modern app call tones (Discord, Telegram, Slack) rather than
 * telco ringback. Those share four traits:
 *   - a short melodic motif on consonant intervals, not a sustained two-tone drone
 *   - FM bell / mallet timbres rather than plain sines
 *   - percussive envelopes: near-instant attack, natural exponential decay
 *   - reverb, so it sits in a room instead of buzzing flat against the ear
 *
 * The motif here is root - fifth - octave (A4, E5, A5). That interval set is
 * maximally consonant, so it reads as a *signal* rather than a tune, which is
 * what keeps it tolerable on repeat. A quiet sub-octave pad swells underneath
 * each cycle to give it body.
 */

const CYCLE_S = 2.2
const PAD_GAIN = 0.05
const MASTER_GAIN = 0.85

/** [offset seconds, frequency Hz, decay seconds, peak gain] */
const MOTIF: Array<[number, number, number, number]> = [
  [0.0,  440.0,  1.5, 0.15],  // A4  — root
  [0.14, 659.25, 1.5, 0.13],  // E5  — fifth
  [0.28, 880.0,  1.9, 0.12],  // A5  — octave
]

/**
 * Two stacked FM voices per note.
 *
 * A single 2:1 ratio produces only odd harmonics, which measures as a hollow,
 * near-sine tone — soft but characterless. Real bells are *inharmonic*, so the
 * second voice uses a non-integer 3.5:1 ratio to scatter partials off the
 * harmonic grid. It decays much faster than the body voice, so it reads as
 * strike shimmer rather than pitch.
 */
const FM_BODY_RATIO = 2.0
const FM_BODY_INDEX = 4.0
const FM_SHIMMER_RATIO = 3.5
const FM_SHIMMER_INDEX = 3.6
const FM_SHIMMER_GAIN = 0.55
const FM_SHIMMER_DECAY = 0.3   // fraction of the note's decay

function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  return AC ? new AC() : null
}

/** Exponentially-decaying noise burst used as a reverb impulse response. */
function buildImpulse(ctx: AudioContext, seconds = 2.0, decay = 2.6): AudioBuffer {
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
  private dry: GainNode | null = null
  private reverbIn: ConvolverNode | null = null
  private timer: ReturnType<typeof setInterval> | null = null
  private stopped = true

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

      // Must be resumed from a user gesture; startCall runs from a click.
      if (ctx.state === 'suspended') await ctx.resume()

      const master = ctx.createGain()
      master.gain.value = MASTER_GAIN
      master.connect(ctx.destination)
      this.master = master

      // Bells keep more top end than the old telco tone, so this sits high.
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 4800
      lp.Q.value = 0.5
      lp.connect(master)
      this.dry = lp as unknown as GainNode

      const convolver = ctx.createConvolver()
      convolver.buffer = buildImpulse(ctx)
      const wet = ctx.createGain()
      wet.gain.value = 0.45
      convolver.connect(wet)
      wet.connect(master)
      this.reverbIn = convolver

      this.scheduleCycle()
      this.timer = setInterval(() => this.scheduleCycle(), CYCLE_S * 1000)
    } catch {
      // Audio is a nicety; never let it break the call flow.
      this.stopped = true
    }
  }

  private scheduleCycle(): void {
    const ctx = this.ctx
    if (!ctx || this.stopped) return

    const start = ctx.currentTime + 0.02
    for (const [offset, freq, decay, gain] of MOTIF) {
      this.strike(start + offset, freq, decay, gain)
    }
    this.pad(start)
  }

  /**
   * One FM-synthesized mallet strike.
   *
   * The modulator's depth decays much faster than the amplitude, which is what
   * produces the bright transient at the attack that then settles into a pure
   * tone — the defining character of a struck bell.
   */
  private strike(at: number, freq: number, decay: number, gain: number): void {
    const ctx = this.ctx
    if (!ctx || !this.dry) return

    const voice = (
      ratio: number, index: number, vGain: number, vDecay: number, modDecay: number,
    ) => {
      const carrier = ctx.createOscillator()
      carrier.type = 'sine'
      carrier.frequency.value = freq

      const modulator = ctx.createOscillator()
      modulator.type = 'sine'
      modulator.frequency.value = freq * ratio

      // Modulation depth collapses far faster than amplitude: that mismatch is
      // what produces the bright transient at the attack which then settles
      // into a pure tone — the defining character of a struck bell.
      const modDepth = ctx.createGain()
      modDepth.gain.setValueAtTime(freq * index, at)
      modDepth.gain.exponentialRampToValueAtTime(0.001, at + modDecay)
      modulator.connect(modDepth)
      modDepth.connect(carrier.frequency)

      const amp = ctx.createGain()
      amp.gain.setValueAtTime(0.0001, at)
      amp.gain.exponentialRampToValueAtTime(vGain, at + 0.005)
      amp.gain.exponentialRampToValueAtTime(0.0001, at + vDecay)

      carrier.connect(amp)
      amp.connect(this.dry!)
      if (this.reverbIn) amp.connect(this.reverbIn)

      carrier.start(at)
      carrier.stop(at + vDecay + 0.05)
      modulator.start(at)
      modulator.stop(at + vDecay + 0.05)
    }

    // Body: warm, sustains for the full note.
    voice(FM_BODY_RATIO, FM_BODY_INDEX, gain, decay, decay * 0.3)
    // Shimmer: inharmonic, brief — the metallic edge of the strike.
    voice(
      FM_SHIMMER_RATIO, FM_SHIMMER_INDEX, gain * FM_SHIMMER_GAIN,
      decay * FM_SHIMMER_DECAY, decay * 0.12,
    )
  }

  /** Quiet sub-octave swell under each cycle, for body rather than pitch. */
  private pad(at: number): void {
    const ctx = this.ctx
    if (!ctx || !this.dry) return

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 110 // A2

    const amp = ctx.createGain()
    amp.gain.setValueAtTime(0.0001, at)
    amp.gain.exponentialRampToValueAtTime(PAD_GAIN, at + 0.35)
    amp.gain.exponentialRampToValueAtTime(0.0001, at + 1.7)

    osc.connect(amp)
    amp.connect(this.dry)

    osc.start(at)
    osc.stop(at + 1.8)
  }

  /** Fade out over ~140ms so stopping never clicks. */
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
    this.dry = null
    this.reverbIn = null

    if (!ctx || !master) return

    try {
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now)
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)
    } catch {
      /* context may already be closing */
    }

    setTimeout(() => {
      try { ctx.close() } catch { /* already closed */ }
    }, 260)
  }
}

/**
 * Pickup chime: a rising fourth (E5 to A5) on the same bell voice as the
 * ringtone, so the moment of connection resolves the motif rather than
 * introducing an unrelated sound.
 */
export function playConnectChime(): void {
  try {
    const ctx = createAudioContext()
    if (!ctx) return

    const master = ctx.createGain()
    master.gain.value = 0.9
    master.connect(ctx.destination)

    const convolver = ctx.createConvolver()
    convolver.buffer = buildImpulse(ctx, 1.2, 3.0)
    const wet = ctx.createGain()
    wet.gain.value = 0.4
    convolver.connect(wet)
    wet.connect(master)

    const strike = (at: number, freq: number, decay: number, gain: number) => {
      const carrier = ctx.createOscillator()
      carrier.type = 'sine'
      carrier.frequency.value = freq

      const modulator = ctx.createOscillator()
      modulator.type = 'sine'
      modulator.frequency.value = freq * 2

      const modDepth = ctx.createGain()
      modDepth.gain.setValueAtTime(freq * 2.4, at)
      modDepth.gain.exponentialRampToValueAtTime(0.001, at + decay * 0.3)
      modulator.connect(modDepth)
      modDepth.connect(carrier.frequency)

      const amp = ctx.createGain()
      amp.gain.setValueAtTime(0.0001, at)
      amp.gain.exponentialRampToValueAtTime(gain, at + 0.005)
      amp.gain.exponentialRampToValueAtTime(0.0001, at + decay)

      carrier.connect(amp)
      amp.connect(master)
      amp.connect(convolver)

      carrier.start(at)
      carrier.stop(at + decay + 0.05)
      modulator.start(at)
      modulator.stop(at + decay + 0.05)
    }

    const t = ctx.currentTime + 0.01
    strike(t, 659.25, 0.5, 0.13)        // E5
    strike(t + 0.1, 880.0, 1.1, 0.14)   // A5 — resolves upward

    setTimeout(() => { try { ctx.close() } catch { /* noop */ } }, 1600)
  } catch {
    /* non-critical */
  }
}
