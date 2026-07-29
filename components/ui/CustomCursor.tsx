'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    document.body.classList.add('has-custom-cursor')

    const init = async () => {
      const { default: gsap } = await import('gsap')

      gsap.set([outer, inner], { opacity: 1 })

      const onMove = (e: MouseEvent) => {
        gsap.to(inner, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
        gsap.to(outer, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' })
      }

      const onEnterLink = () => gsap.to(outer, { scale: 2, duration: 0.2 })
      const onLeaveLink = () => gsap.to(outer, { scale: 1, duration: 0.2 })
      const onEnterCard = () => gsap.to(outer, { scale: 3, opacity: 0.3, duration: 0.2 })
      const onLeaveCard = () => gsap.to(outer, { scale: 1, opacity: 1, duration: 0.2 })

      document.addEventListener('mousemove', onMove)

      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })

      document.querySelectorAll('[data-cursor="expand"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterCard)
        el.addEventListener('mouseleave', onLeaveCard)
      })

      return () => {
        document.removeEventListener('mousemove', onMove)
        document.body.classList.remove('has-custom-cursor')
      }
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => { cleanup = fn })
    return () => cleanup?.()
  }, [])

  return (
    <>
      <div
        ref={outerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={innerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}
