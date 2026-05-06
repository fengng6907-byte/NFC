'use client'
import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  gold?: boolean
  navy?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddings = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover, gold, navy, padding = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'rounded-2xl transition-all duration-200',
          navy
            ? 'navy-bg text-white border border-white/8'
            : gold
            ? 'bg-gold-gradient text-navy-800'
            : 'bg-white border border-navy-800/[0.06] shadow-card',
          hover && 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer',
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('flex items-center justify-between mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={twMerge('text-base font-semibold text-navy-800', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('', className)} {...props}>
      {children}
    </div>
  )
}
