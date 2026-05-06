import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type BadgeVariant = 'gold' | 'green' | 'red' | 'blue' | 'purple' | 'gray' | 'orange'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  dot?: boolean
}

const variants: Record<BadgeVariant, string> = {
  gold:   'badge-gold',
  green:  'badge-green',
  red:    'badge-red',
  blue:   'badge-blue',
  purple: 'bg-violet-500/10 text-violet-600 border border-violet-500/20',
  gray:   'bg-gray-100 text-gray-600 border border-gray-200',
  orange: 'bg-orange-500/10 text-orange-600 border border-orange-500/20',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-2.5 py-1 text-xs rounded-lg',
}

export function Badge({ variant = 'gray', size = 'md', dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1.5 font-medium whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={twMerge(
          'w-1.5 h-1.5 rounded-full',
          variant === 'green' ? 'bg-emerald-500' :
          variant === 'red'   ? 'bg-rose-500' :
          variant === 'gold'  ? 'bg-gold-500' :
          variant === 'blue'  ? 'bg-navy-500' : 'bg-gray-400'
        )} />
      )}
      {children}
    </span>
  )
}
