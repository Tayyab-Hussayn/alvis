'use client'

import { useEffect } from 'react'

export function ImageProtection() {
  useEffect(() => {
    // Prevent right-click context menu on all images
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return null
}
