'use client'

interface GSAPProviderProps {
  children: React.ReactNode
}

// Scroll-reveal animations now run on IntersectionObserver (see
// components/animations/useScrollReveal.ts) instead of GSAP ScrollTrigger, so
// this no longer needs to preload or configure the ScrollTrigger plugin.
// Kept as a passthrough so call sites don't need to change.
export function GSAPProvider({ children }: GSAPProviderProps) {
  return <>{children}</>
}
