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

// Content must never depend on a background script succeeding in order to
// become visible. GSAP's ScrollTrigger hides elements the instant a tween is
// created and only reveals them once its own async-loaded plugin fires a
// trigger — any hiccup in that chain (slow dynamic import, throttled rAF in a
// backgrounded tab, a stale/duplicate registration) leaves the section stuck
// invisible. IntersectionObserver has no such dependency chain, and any
// element already in view at mount skips the hide/reveal choreography
// entirely instead of gambling on the animation succeeding in time.

function revealElement(el: HTMLElement, { y = 30, duration = 0.7, delay = 0 }: ScrollRevealOptions) {
  let cancelled = false

  const rect = el.getBoundingClientRect()
  const alreadyVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
  if (alreadyVisible) return () => {}

  el.style.opacity = '0'
  el.style.transform = `translateY(${y}px)`

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      import('gsap').then(({ gsap }) => {
        if (cancelled) return
        gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: 'power3.out' })
      })
    },
    { rootMargin: '0px 0px -20% 0px' }
  )
  observer.observe(el)

  return () => {
    cancelled = true
    observer.disconnect()
  }
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !ref.current) return

    return revealElement(ref.current, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

export function useScrollRevealGroup<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !ref.current) return

    const { stagger = 0.1, ...rest } = options
    const children = Array.from(ref.current.children) as HTMLElement[]
    const cleanups = children.map((child, i) =>
      revealElement(child, { ...rest, delay: (rest.delay ?? 0) + i * stagger })
    )

    return () => cleanups.forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
