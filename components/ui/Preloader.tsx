'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'

const ROTATING_WORDS = ['Build.', 'Design.', 'Grow.']
const COUNTER_DURATION = 2500
const WORD_CYCLE_DURATION = 833 // ~2500 / 3 so each word shows once

function LoadingOverlay({ onComplete }: { onComplete: () => void }) {
  const [count, setCount]                   = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef       = useRef<number | null>(null)

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts
      const progress = Math.min((ts - startTimeRef.current) / COUNTER_DURATION, 1)
      setCount(Math.floor(progress * 100))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(onComplete, 350)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % ROTATING_WORDS.length)
    }, WORD_CYCLE_DURATION)
    return () => clearInterval(id)
  }, [])

  return (
    <m.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col overflow-hidden"
      style={{ background: '#0a1b3d' }}
    >
      {/* Subtle radial ambient glow — top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(230,57,70,0.22) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Top-left brand */}
      <m.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="absolute top-8 left-8 md:top-12 md:left-12"
      >
        <span className="block font-display font-bold text-white text-[15px] tracking-[0.22em] uppercase">
          Alvis
        </span>
        <span
          className="block mt-1 text-[10px] tracking-[0.38em] uppercase font-display"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Marketing Agency
        </span>
      </m.div>

      {/* Center: rotating words */}
      <div className="flex-1 flex items-center justify-center select-none">
        <AnimatePresence mode="wait">
          <m.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 8rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1,
            }}
          >
            {ROTATING_WORDS[currentWordIndex]}
          </m.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right: counter */}
      <div className="absolute bottom-10 right-8 md:bottom-14 md:right-12 select-none">
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="font-display font-bold tabular-nums"
          style={{
            fontSize: 'clamp(5rem, 14vw, 10rem)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          {String(count).padStart(3, '0')}
        </m.span>
      </div>

      {/* Bottom progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <m.div
          className="h-full"
          style={{
            transformOrigin: 'left',
            background: '#e63946',
            boxShadow: '0 0 14px rgba(230,57,70,0.70)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          transition={{ duration: 0.08, ease: 'linear' }}
        />
      </div>
    </m.div>
  )
}

export function Preloader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('alvis_preloader_shown')) {
      setShow(true)
    }
  }, [])

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('alvis_preloader_shown', '1')
    setShow(false)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {show && <LoadingOverlay key="preloader" onComplete={handleComplete} />}
      </AnimatePresence>
    </LazyMotion>
  )
}
