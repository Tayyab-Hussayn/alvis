'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  withArrow?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { href?: undefined }
type ButtonAsLink   = ButtonBaseProps & { href: string }
type ButtonProps    = ButtonAsButton | ButtonAsLink

/* Sizes keep a slimmer right pad when an arrow chip sits inside the pill. */
const sizeClasses = {
  sm: 'h-10 px-6 text-body-sm',
  md: 'h-12 px-8 text-body-md',
  lg: 'h-14 px-10 text-body-md',
}

const arrowSizeClasses = {
  sm: 'h-10 pl-6 pr-1.5 text-body-sm',
  md: 'h-12 pl-8 pr-2 text-body-md',
  lg: 'h-14 pl-10 pr-2 text-body-md',
}

const variantClasses = {
  primary:   'bg-accent text-white hover:bg-accent-dark border border-transparent hover:scale-[1.02]',
  secondary: 'bg-transparent border border-border text-text hover:border-accent hover:text-accent',
  ghost:     'bg-transparent text-accent hover:text-accent-dark underline-offset-4 hover:underline px-0',
}

const baseClasses =
  'group inline-flex items-center justify-center gap-3 rounded-full font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  // `ghost` has no pill body, so it keeps the plain inline arrow.
  const chipArrow = withArrow && variant !== 'ghost'

  const classes = cn(
    baseClasses,
    chipArrow ? arrowSizeClasses[size] : sizeClasses[size],
    variantClasses[variant],
    className,
  )

  const content = (
    <>
      {children}
      {chipArrow ? (
        <span
          className={cn(
            'flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 group-hover:translate-x-0.5',
            size === 'sm' ? 'w-7 h-7' : 'w-9 h-9',
            variant === 'primary' ? 'bg-white/20 text-white' : 'bg-accent text-white',
          )}
          aria-hidden="true"
        >
          <ArrowRight size={size === 'sm' ? 14 : 16} />
        </span>
      ) : (
        withArrow && (
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        )
      )}
    </>
  )

  if ('href' in props && props.href !== undefined) {
    const { href } = props
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton & { href?: undefined }
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
