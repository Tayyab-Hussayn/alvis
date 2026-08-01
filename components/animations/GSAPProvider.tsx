'use client'

import { useEffect } from 'react'

interface GSAPProviderProps {
  children: React.ReactNode
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })
    }
    init()
  }, [])

  return <>{children}</>
}
