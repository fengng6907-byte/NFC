'use client'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { MOCK_NOTIFICATIONS, MOCK_EXPENSES, MOCK_SETTLEMENTS, MOCK_USERS } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/balance'
import { CATEGORY_META } from '@/types'
import { Bell, CheckCircle2, Plus, Users, Award, AlertCircle } from 'lucide-react'

const ACTIVITY_FEED = [
  ...MOCK_EXPENSES.map(e => ({
    id: e.id, type: 'EXPENSE' as const, date: e.createdAt,
    data: e, user: e.payer,
  })),
  ...MOCK_SETTLEMENTS.map(s => ({
    id: s.id, type: 'SETTLEMENT' as const, date: s.createdAt,
    data: s, user: s.sender,
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

function ActivityItem({ item }: { item: typeof ACTIVITY_FEED[0] }) {
  const isExpense = item.type === 'EXPENSE'
  const expense = isExpense ? item.data as typeof MOCK_EXPENSES[0] : null
  const settlement = !isExpense ? item.data as typeof MOCK_SETTLEMENTS[0] : null
  const meta = expense ? CATEGORY_META[expense.category] : null

  return (
    <div className="flex items-start gap-3 px-5 py-4 hover:bg-cream-50 transition-all">
      {/* Icon */}
      <div className="relative shrink-0">
        <Avatar name={item.user.name} size="md" />
        <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${
          isExpense ? 'bg-navy-600' : 'bg-emerald-500'
        }`}>
          {isExpense ? <Plus size={10} className="text-white" /> : <CheckCircle2 size={10} className="text-white" />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isExpense && expense && meta ? (
          <>
            <p className="text-sm text-navy-800">
              <span className="font-semibold">{item.user.name.split(' ')[0]}</span>
              {' '}added{' '}
              <span className="font-semibold">{expense.title}</span>
              {' '}to{' '}
              <span className="text-gold-600 font-medium">
                {expense.groupId}
              </span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base">{meta.icon}</span>
              <Badge variant="gray" size="sm">{meta.label}</Badge>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{expense.shares.length} people</span>
              {expense.aiCategory && (
                <Badge variant="blue" size="sm">AI categorized</Badge>
              )}
            </div>
          </>
        ) : settlement ? (
          <p className="text-sm text-navy-800">
            <span className="font-semibold">{settlement.sender.name.split(' ')[0]}</span>
            {' '}settled{' '}
            <span className="font-bold text-emerald-600">{formatCurrency(settlement.amount)}</span>
            {' '}with{' '}
            <span className="font-semibold">{settlement.receiver.name.split(' ')[0]}</span>
          </p>
        ) : null}
        <p className="text-xs text-gray-300 mt-1">
          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right shrink-0">
        {isExpense && expense && (
          <p className="text-sm font-bold text-navy-800">{formatCurrency(expense.amount)}</p>
        )}
        {settlement && (
          <p className="text-sm font-bold text-emerald-600">{formatCurrency(settlement.amount)}</p>
        )}
      </div>
    </div>
  )
}

export default function ActivityPage() {
  const unreadNotifs = MOCK_NOTIFICATIONS.filter(n => !n.isRead)

  return (
    <>
      <Header title="Activity" subtitle="Recent transactions and notifications" />

      <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto space-y-6">

        {/* Unread notifications */}
        {unreadNotifs.length > 0 && (
          <Card padding="none">
            <div className="px-5 py-3.5 border-b border-navy-800/6 flex items-center gap-2">
              <Bell size={15} className="text-gold-500" />
              <h2 className="font-semibold text-navy-800 text-sm">Notifications</h2>
              <Badge variant="gold">{unreadNotifs.length} new</Badge>
            </div>
            <div className="divide-y divide-navy-800/4">
              {MOCK_NOTIFICATIONS.map(notif => {
                const icons: Record<string, React.ReactNode> = {
                  EXPENSE_ADDED: <Plus size={12} />,
                  SETTLEMENT_REQUESTED: <AlertCircle size={12} />,
                  SETTLEMENT_COMPLETED: <CheckCircle2 size={12} />,
                  GROUP_INVITE: <Users size={12} />,
                  REMINDER: <Bell size={12} />,
                  BADGE_EARNED: <Award size={12} />,
                }

                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 px-5 py-4 hover:bg-cream-50 transition-all cursor-pointer ${
                      !notif.isRead ? 'bg-gold-50/40' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${!notif.isRead ? 'bg-gold-100 text-gold-700' : 'bg-cream-100 text-gray-400'}`}>
                      {icons[notif.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-800">{notif.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{notif.message}</p>
                      <p className="text-[10px] text-gray-300 mt-1">
                        {new Date(notif.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-gold-500 shrink-0 mt-1.5" />}
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* Activity feed */}
        <Card padding="none">
          <div className="px-5 py-3.5 border-b border-navy-800/6">
            <h2 className="font-semibold text-navy-800 text-sm">All Activity</h2>
          </div>
          <div className="divide-y divide-navy-800/4">
            {ACTIVITY_FEED.map(item => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
