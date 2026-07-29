import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span className="block w-0.5 h-4 bg-accent" aria-hidden="true" />
      <span className="font-mono text-label uppercase tracking-widest text-accent">
        {children}
      </span>
    </div>
  )
}
