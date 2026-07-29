'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

interface AnimatedHeadingProps {
  as?: HeadingTag
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className,
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !ref.current) return

    let gsap: typeof import('gsap').gsap
    let ScrollTrigger: unknown

    const init = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
      gsap = gsapModule.gsap
      ScrollTrigger = ST
      gsap.registerPlugin(ST)

      const el = ref.current
      if (!el) return

      const text = el.textContent || ''
      const chars = text.split('').map((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? ' ' : char
        span.style.display = 'inline-block'
        return span
      })

      el.textContent = ''
      chars.forEach((span) => el.appendChild(span))

      gsap.from(chars, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.02,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      })
    }

    init()

    return () => {
      if (ScrollTrigger && (ScrollTrigger as { getAll?: () => { kill: () => void }[] }).getAll) {
        (ScrollTrigger as { getAll: () => { kill: () => void }[] }).getAll().forEach((t: { kill: () => void }) => t.kill())
      }
    }
  }, [delay])

  return (
    <Tag ref={ref} className={cn('overflow-hidden', className)}>
      {children}
    </Tag>
  )
}
