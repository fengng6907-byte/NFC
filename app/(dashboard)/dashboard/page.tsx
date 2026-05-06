'use client'
import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, ArrowRight, Plus, Users, Receipt, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AvatarGroup } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { MiniSpendingChart } from '@/components/dashboard/MiniSpendingChart'
import { DebtGraph } from '@/components/dashboard/DebtGraph'
import { useAuth } from '@/components/providers/AuthProvider'
import { useBalance, useExpenses } from '@/lib/hooks/useExpenses'
import { useGroups } from '@/lib/hooks/useGroups'
import { CATEGORY_META } from '@/types'
import { formatCurrency } from '@/lib/balance'

function StatSkeleton() {
  return (
    <Card padding="md" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
        <div className="w-7 h-7 rounded-lg bg-gray-100 animate-pulse" />
      </div>
      <div>
        <div className="h-7 w-24 bg-gray-100 rounded animate-pulse mb-1" />
        <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
      </div>
    </Card>
  )
}

function GroupRowSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="w-10 h-10 rounded-2xl bg-gray-100 animate-pulse shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="space-y-1 text-right">
        <div className="h-3.5 w-16 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  )
}

function ExpenseRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <div className="w-10 h-10 rounded-2xl bg-gray-100 animate-pulse shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-40 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="space-y-1 text-right">
        <div className="h-3.5 w-16 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-10 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)
  const { user, profile } = useAuth()
  const { data: balance, isLoading: balanceLoading } = useBalance()
  const { data: groups,  isLoading: groupsLoading  } = useGroups()
  const { data: expenses, isLoading: expensesLoading } = useExpenses()

  const firstName = profile?.name?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'there'
  const streakDays = profile?.streak_days ?? 0

  const stats = [
    {
      label: "You're owed",
      value: balanceLoading ? null : formatCurrency(balance?.owedToYou ?? 0),
      change: 'Outstanding balance',
      trend: 'up' as const,
      color: 'bg-emerald-500/10 text-emerald-600',
      icon: TrendingUp,
    },
    {
      label: 'You owe',
      value: balanceLoading ? null : formatCurrency(balance?.youOwe ?? 0),
      change: 'To be settled',
      trend: 'down' as const,
      color: 'bg-rose-500/10 text-rose-500',
      icon: TrendingDown,
    },
    {
      label: 'Net balance',
      value: balanceLoading ? null : (balance?.net != null ? `${balance.net >= 0 ? '+' : ''}${formatCurrency(balance.net)}` : '$0.00'),
      change: `Across ${groups?.length ?? 0} groups`,
      trend: 'neutral' as const,
      color: 'bg-gold-500/10 text-gold-700',
      icon: Minus,
    },
    {
      label: 'Monthly spend',
      value: balanceLoading ? null : formatCurrency((expenses ?? []).reduce((s: number, e: any) => s + (e.amount ?? 0), 0)),
      change: 'All time total',
      trend: 'up' as const,
      color: 'bg-navy-500/10 text-navy-700',
      icon: Receipt,
    },
  ]

  return (
    <>
      <Header
        title={`Good morning, ${firstName} 👋`}
        subtitle="Here's your expense overview for today."
        onAddExpense={() => setExpenseModalOpen(true)}
      />

      <div className="px-4 sm:px-6 py-6 space-y-6 max-w-7xl mx-auto">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ label, value, change, trend, color, icon: Icon }) =>
            value === null ? (
              <StatSkeleton key={label} />
            ) : (
              <Card key={label} padding="md" className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">{label}</span>
                  <div className={`p-1.5 rounded-lg ${color}`}>
                    <Icon size={14} />
                  </div>
                </div>
                <div>
                  <div className={`text-2xl font-black ${
                    trend === 'up' && label.includes('owed') ? 'text-emerald-600' :
                    trend === 'up' && label.includes('spend') ? 'text-navy-800' :
                    trend === 'down' ? 'text-rose-500' :
                    'text-gold-700'
                  }`}>
                    {value}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{change}</div>
                </div>
              </Card>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending chart */}
          <Card className="lg:col-span-2" padding="md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-navy-800">Spending Overview</h2>
                <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
              </div>
              <Badge variant="gold">{new Date().toLocaleString('default', { month: 'short', year: 'numeric' })}</Badge>
            </div>
            <MiniSpendingChart data={[]} />
          </Card>

          {/* Quick actions + streak */}
          <div className="flex flex-col gap-4">
            {/* Streak card */}
            <Card navy padding="md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Settling Streak</span>
                <span className="text-2xl duck-bob">🦆</span>
              </div>
              <div className="text-5xl font-black text-gold-400 mb-1">{streakDays}</div>
              <p className="text-white/50 text-sm mb-3">days in a row</p>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-gradient rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (streakDays / 30) * 100)}%` }}
                />
              </div>
              <p className="text-white/30 text-xs mt-2">{Math.max(0, 30 - streakDays)} days to Golden Duck badge</p>
            </Card>

            {/* Quick actions */}
            <Card padding="md">
              <h3 className="font-semibold text-navy-800 mb-3 text-sm">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Add expense',  icon: Plus,        color: 'text-gold-600 bg-gold-50',    action: () => setExpenseModalOpen(true) },
                  { label: 'Create group', icon: Users,       color: 'text-navy-600 bg-navy-50',    href: '/groups' },
                  { label: 'Settle up',    icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', href: '/settle' },
                ].map(({ label, icon: Icon, color, action, href }) => (
                  href ? (
                    <Link
                      key={label}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-100 transition-all group"
                    >
                      <div className={`p-2 rounded-lg ${color}`}><Icon size={15} /></div>
                      <span className="text-sm font-medium text-navy-800">{label}</span>
                      <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </Link>
                  ) : (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-100 transition-all group"
                    >
                      <div className={`p-2 rounded-lg ${color}`}><Icon size={15} /></div>
                      <span className="text-sm font-medium text-navy-800">{label}</span>
                      <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </button>
                  )
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Groups and Debts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Groups */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy-800">Your Groups</h2>
              <Link href="/groups" className="text-xs text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-1">
              {groupsLoading ? (
                Array.from({ length: 3 }).map((_, i) => <GroupRowSkeleton key={i} />)
              ) : !groups?.length ? (
                <div className="py-10 text-center">
                  <div className="text-4xl mb-2">👥</div>
                  <p className="text-sm font-semibold text-navy-800 mb-1">No groups yet</p>
                  <Link href="/groups" className="text-xs text-gold-600 hover:text-gold-700 font-medium">Create your first group →</Link>
                </div>
              ) : (
                groups.slice(0, 4).map((group: any) => (
                  <Link
                    key={group.id}
                    href={`/groups/${group.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cream-100 transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${group.color}18`, border: `1px solid ${group.color}30` }}
                    >
                      {group.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-800 truncate">{group.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <AvatarGroup
                          users={(group.group_members ?? []).map((m: any) => ({ name: m.profiles?.name ?? '?' }))}
                          max={3}
                          size="xs"
                        />
                        <span className="text-xs text-gray-400">{group.group_members?.length ?? 0} members</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>

          {/* Debt graph */}
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy-800">Who Owes Who</h2>
              <Badge variant="blue" size="sm">Simplified</Badge>
            </div>
            <DebtGraph />
          </Card>
        </div>

        {/* Recent expenses */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy-800">Recent Expenses</h2>
            <Link href="/expenses" className="text-xs text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-1">
            {expensesLoading ? (
              Array.from({ length: 4 }).map((_, i) => <ExpenseRowSkeleton key={i} />)
            ) : !expenses?.length ? (
              <div className="py-10 text-center">
                <div className="text-4xl mb-2">💸</div>
                <p className="text-sm font-semibold text-navy-800 mb-1">No expenses yet</p>
                <button
                  onClick={() => setExpenseModalOpen(true)}
                  className="text-xs text-gold-600 hover:text-gold-700 font-medium"
                >
                  Add your first expense →
                </button>
              </div>
            ) : (
              (expenses as any[]).slice(0, 5).map((expense: any) => {
                const meta = CATEGORY_META[expense.category as keyof typeof CATEGORY_META] ?? CATEGORY_META.OTHER
                const isPayer = expense.payer_id === user?.id
                const myShare = expense.expense_splits?.find((s: any) => s.user_id === user?.id)

                return (
                  <div
                    key={expense.id}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cream-100 transition-all cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}25` }}
                    >
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-800 truncate">{expense.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">
                          {isPayer ? 'You paid' : `${expense.profiles?.name?.split(' ')[0] ?? 'Someone'} paid`}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{meta.label}</span>
                        {expense.ai_confidence && (
                          <span className="text-[10px] badge-blue px-1.5 py-0 rounded font-medium">AI</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-navy-800">{formatCurrency(expense.amount)}</div>
                      {myShare && (
                        <div className={`text-xs font-medium ${
                          isPayer ? 'text-emerald-600' : myShare.is_paid ? 'text-gray-400' : 'text-rose-500'
                        }`}>
                          {isPayer
                            ? `+${formatCurrency(expense.amount - myShare.amount)}`
                            : myShare.is_paid
                            ? 'settled'
                            : `-${formatCurrency(myShare.amount)}`
                          }
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Card>
      </div>

      <ExpenseModal
        open={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
      />
    </>
  )
}
