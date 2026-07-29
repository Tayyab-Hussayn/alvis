import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-accent-soft text-accent text-body-sm rounded-full px-3 py-1 font-medium',
        className,
      )}
    >
      {children}
    </span>
  )
}
