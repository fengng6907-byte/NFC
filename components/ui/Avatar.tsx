import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  image?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

const colors = [
  'bg-gold-500 text-navy-800',
  'bg-violet-500 text-white',
  'bg-emerald-500 text-white',
  'bg-rose-500 text-white',
  'bg-navy-500 text-white',
  'bg-amber-500 text-navy-800',
]

function getColor(name: string) {
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export function Avatar({ name, image, size = 'md', className, ...props }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className={twMerge(
        'rounded-full flex items-center justify-center font-semibold shrink-0 overflow-hidden',
        sizes[size],
        !image && getColor(name),
        className
      )}
      {...props}
    >
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
}

interface AvatarGroupProps {
  users: { name: string; image?: string }[]
  max?: number
  size?: AvatarProps['size']
}

export function AvatarGroup({ users, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const extra = users.length - max

  return (
    <div className="flex -space-x-2">
      {visible.map((user, i) => (
        <Avatar
          key={i}
          name={user.name}
          image={user.image}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {extra > 0 && (
        <div className={twMerge(
          'rounded-full ring-2 ring-white bg-cream-200 text-navy-700 font-semibold flex items-center justify-center',
          sizes[size]
        )}>
          +{extra}
        </div>
      )}
    </div>
  )
}
