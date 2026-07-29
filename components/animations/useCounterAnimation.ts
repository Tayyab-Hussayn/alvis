'use client'

import { useEffect, useRef, useState } from 'react'

export function useCounterAnimation(target: number, duration = 2) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setCount(target)
      return
    }

    const el = ref.current
    if (!el) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          if (triggered.current) return
          triggered.current = true

          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.round(obj.val)),
          })
        },
      })
    }

    init()
  }, [target, duration])

  return { count, ref }
}
