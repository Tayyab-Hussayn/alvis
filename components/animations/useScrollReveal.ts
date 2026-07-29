'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealOptions {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !ref.current) return

    const { y = 30, opacity = 0, duration = 0.7, delay = 0, start = 'top 80%' } = options

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(ref.current, {
        y,
        opacity,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
        },
      })
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

export function useScrollRevealGroup<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !ref.current) return

    const { y = 30, opacity = 0, duration = 0.7, delay = 0, stagger = 0.1, start = 'top 80%' } = options

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const children = ref.current?.children
      if (!children) return

      gsap.from(Array.from(children), {
        y,
        opacity,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
        },
      })
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
