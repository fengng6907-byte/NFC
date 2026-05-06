'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Receipt, BarChart3, Bell, Settings,
  LogOut, ChevronRight, Zap, Shield
} from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { CURRENT_USER, MOCK_BADGES } from '@/lib/mock-data'
import { Avatar } from '@/components/ui/Avatar'

const NAV_ITEMS = [
  { href: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/groups',     label: 'Groups',      icon: Users },
  { href: '/expenses',   label: 'Expenses',    icon: Receipt },
  { href: '/analytics',  label: 'Analytics',   icon: BarChart3 },
  { href: '/activity',   label: 'Activity',    icon: Bell },
]

const BOTTOM_ITEMS = [
  { href: '/settings',   label: 'Settings',    icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-navy-800/[0.06] h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-navy-800/[0.06]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gold-gradient rounded-xl flex items-center justify-center shadow-gold text-xl">
            🦆
          </div>
          <div>
            <span className="font-bold text-navy-800 text-base">Gold Dutchy</span>
            <div className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Split Smarter</div>
          </div>
        </Link>
      </div>

      {/* Balance pill */}
      <div className="px-4 py-3">
        <div className="bg-navy-800/[0.03] rounded-2xl p-3.5 border border-navy-800/[0.05]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-400 font-medium">Your Balance</span>
            <span className="text-[10px] badge-gold px-1.5 py-0.5 rounded font-semibold">Live</span>
          </div>
          <div className="text-2xl font-bold text-navy-800">$84.33</div>
          <div className="text-xs text-emerald-500 mt-0.5 font-medium">↑ You're owed money</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={twMerge(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                  active
                    ? 'bg-gold-500/10 text-gold-700 border-l-[3px] border-gold-500 pl-[9px]'
                    : 'text-gray-500 hover:bg-navy-800/5 hover:text-navy-800'
                )}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                {label}
                {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </Link>
            )
          })}
        </div>

        {/* Streak badge */}
        <div className="mt-4 mx-1 p-3 rounded-2xl bg-navy-gradient text-white">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap size={14} className="text-gold-400" />
            <span className="text-xs font-semibold text-gold-400">Settling Streak</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{CURRENT_USER.streakDays}</span>
            <span className="text-xs text-white/50">days</span>
          </div>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-gradient rounded-full"
              style={{ width: `${Math.min(100, (CURRENT_USER.streakDays / 30) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-white/40 mt-1.5">{30 - CURRENT_USER.streakDays} days to next badge</p>
        </div>

        {/* Badges preview */}
        <div className="mt-3 mx-1">
          <div className="flex items-center gap-1.5 px-1 mb-2">
            <Shield size={12} className="text-gray-400" />
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Badges</span>
          </div>
          <div className="flex gap-1.5 flex-wrap px-1">
            {MOCK_BADGES.filter(b => b.earnedAt).slice(0, 4).map(badge => (
              <div
                key={badge.id}
                title={badge.name}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-base bg-cream-100 border border-navy-800/5 cursor-default"
              >
                {badge.icon}
              </div>
            ))}
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs text-gray-400 bg-cream-100 border border-dashed border-navy-800/10">
              +{MOCK_BADGES.filter(b => !b.earnedAt).length}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-navy-800/[0.06] px-3 py-3 space-y-0.5">
        {BOTTOM_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-navy-800/5 hover:text-navy-800 transition-all"
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </Link>
        ))}

        {/* User profile */}
        <div className="mt-2 pt-2 border-t border-navy-800/[0.05]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-800/5 cursor-pointer transition-all group">
            <Avatar name={CURRENT_USER.name} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-navy-800 truncate">{CURRENT_USER.name}</div>
              <div className="text-xs text-gray-400 truncate">{CURRENT_USER.points} pts</div>
            </div>
            <LogOut size={15} className="text-gray-300 group-hover:text-rose-400 transition-colors shrink-0" />
          </div>
        </div>
      </div>
    </aside>
  )
}
