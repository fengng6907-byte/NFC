'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Receipt, BarChart3, Bell } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Home',     icon: LayoutDashboard },
  { href: '/groups',    label: 'Groups',   icon: Users },
  { href: '/expenses',  label: 'Expenses', icon: Receipt },
  { href: '/analytics', label: 'Stats',    icon: BarChart3 },
  { href: '/activity',  label: 'Activity', icon: Bell },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-navy-800/[0.06] pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={twMerge(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all',
                active ? 'text-gold-600' : 'text-gray-400'
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className={twMerge('text-[10px] font-medium', active ? 'text-gold-600' : 'text-gray-400')}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
