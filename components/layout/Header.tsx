'use client'
import { useState } from 'react'
import { Bell, Plus, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { CURRENT_USER, MOCK_NOTIFICATIONS } from '@/lib/mock-data'

interface HeaderProps {
  title: string
  subtitle?: string
  onAddExpense?: () => void
}

export function Header({ title, subtitle, onAddExpense }: HeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false)
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length

  return (
    <header className="sticky top-0 z-30 bg-cream-50/80 backdrop-blur-xl border-b border-navy-800/[0.06] px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-navy-800 truncate">{title}</h1>
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <button className="p-2 rounded-xl text-gray-400 hover:text-navy-800 hover:bg-white transition-all border border-transparent hover:border-navy-800/8 hover:shadow-card">
            <Search size={18} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="p-2 rounded-xl text-gray-400 hover:text-navy-800 hover:bg-white transition-all border border-transparent hover:border-navy-800/8 hover:shadow-card relative"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-cream-50" />
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifs && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-navy border border-navy-800/8 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-navy-800/6 flex items-center justify-between">
                  <span className="font-semibold text-navy-800 text-sm">Notifications</span>
                  <button onClick={() => setShowNotifs(false)}>
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-navy-800/4">
                  {MOCK_NOTIFICATIONS.map(notif => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-cream-50 cursor-pointer transition-all ${!notif.isRead ? 'bg-gold-50/50' : ''}`}
                    >
                      <div className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.isRead ? 'bg-gold-500' : 'bg-gray-200'}`} />
                        <div>
                          <p className="text-xs font-semibold text-navy-800">{notif.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{notif.message}</p>
                          <p className="text-[10px] text-gray-300 mt-1">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-navy-800/6 text-center">
                  <button className="text-xs text-gold-600 font-medium hover:text-gold-700">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add Expense */}
          {onAddExpense && (
            <Button variant="gold" size="sm" icon={<Plus size={16} />} onClick={onAddExpense}>
              Add Expense
            </Button>
          )}

          {/* Avatar (mobile) */}
          <div className="md:hidden">
            <Avatar name={CURRENT_USER.name} size="sm" />
          </div>
        </div>
      </div>
    </header>
  )
}
