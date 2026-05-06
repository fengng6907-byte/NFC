'use client'
import { useState } from 'react'
import { Plus, Search, CheckCircle2 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { useExpenses } from '@/lib/hooks/useExpenses'
import { useAuth } from '@/components/providers/AuthProvider'
import { CATEGORY_META } from '@/types'
import { formatCurrency } from '@/lib/balance'
import type { Category } from '@/types'

function ExpenseSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-navy-800/4">
      <div className="w-11 h-11 rounded-2xl bg-gray-100 animate-pulse shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-44 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="space-y-1 text-right">
        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
        <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  )
}

export default function ExpensesPage() {
  const [modalOpen,      setModalOpen]      = useState(false)
  const [search,         setSearch]         = useState('')
  const [filterCategory, setFilterCategory] = useState<Category | 'ALL'>('ALL')
  const [filterStatus,   setFilterStatus]   = useState<'ALL' | 'SETTLED' | 'OUTSTANDING'>('ALL')

  const { user } = useAuth()
  const { data: expenses, isLoading } = useExpenses()

  const filtered = (expenses ?? []).filter((e: any) => {
    const matchSearch   = e.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory === 'ALL' || e.category === filterCategory
    const isPayer       = e.payer_id === user?.id
    const myShare       = e.expense_splits?.find((s: any) => s.user_id === user?.id)
    const isSettled     = myShare?.is_paid || isPayer
    const matchStatus   =
      filterStatus === 'ALL' ||
      (filterStatus === 'SETTLED'     && isSettled)  ||
      (filterStatus === 'OUTSTANDING' && !isSettled)
    return matchSearch && matchCategory && matchStatus
  })

  const totalAmount = filtered.reduce((s: number, e: any) => s + (e.amount ?? 0), 0)

  return (
    <>
      <Header
        title="Expenses"
        subtitle="All your shared expenses in one place"
        onAddExpense={() => setModalOpen(true)}
      />

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search expenses..."
              className="w-full bg-white border border-navy-800/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-navy-800 placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all"
            />
          </div>

          <div className="flex gap-1 bg-cream-200 rounded-xl p-1">
            {(['ALL', 'OUTSTANDING', 'SETTLED'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filterStatus === status ? 'bg-white text-navy-800 shadow-card' : 'text-gray-400 hover:text-navy-800'
                }`}
              >
                {status.toLowerCase()}
              </button>
            ))}
          </div>

          <Button variant="gold" size="sm" icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            Add Expense
          </Button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filterCategory === 'ALL' ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-gray-400 border-navy-800/10 hover:border-navy-800/20'
            }`}
          >
            All
          </button>
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(key as Category)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                filterCategory === key ? 'bg-navy-800 text-white border-navy-800' : 'bg-white text-gray-400 border-navy-800/10 hover:border-navy-800/20'
              }`}
            >
              {meta.icon} {meta.label}
            </button>
          ))}
        </div>

        {/* Summary */}
        {!isLoading && (
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-navy-800">{filtered.length}</span> expenses ·{' '}
            <span className="font-semibold text-navy-800">{formatCurrency(totalAmount)}</span> total
          </p>
        )}

        {/* Expense list */}
        <Card padding="none">
          <div className="divide-y divide-navy-800/4">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <ExpenseSkeleton key={i} />)
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center">
                <div className="text-5xl mb-3">💸</div>
                <p className="text-navy-800 font-semibold mb-1">
                  {search || filterCategory !== 'ALL' || filterStatus !== 'ALL'
                    ? 'No matching expenses'
                    : 'No expenses yet'}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  {search || filterCategory !== 'ALL' || filterStatus !== 'ALL'
                    ? 'Try adjusting your filters'
                    : 'Add your first expense to get started'}
                </p>
                {!search && filterCategory === 'ALL' && filterStatus === 'ALL' && (
                  <Button variant="gold" size="sm" icon={<Plus size={14} />} onClick={() => setModalOpen(true)}>
                    Add Expense
                  </Button>
                )}
              </div>
            ) : (
              filtered.map((expense: any) => {
                const meta     = CATEGORY_META[expense.category as keyof typeof CATEGORY_META] ?? CATEGORY_META.OTHER
                const myShare  = expense.expense_splits?.find((s: any) => s.user_id === user?.id)
                const isPayer  = expense.payer_id === user?.id
                const isSettled = myShare?.is_paid || (isPayer && (expense.expense_splits ?? []).every((s: any) => s.is_paid || s.user_id === user?.id))

                return (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-cream-50 transition-all cursor-pointer"
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}25` }}
                    >
                      {meta.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-navy-800 truncate">{expense.title}</p>
                        {expense.ai_confidence && (
                          <span className="text-[10px] badge-blue px-1.5 py-0 rounded font-medium shrink-0">AI</span>
                        )}
                        {myShare?.is_paid && (
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-400">
                          {isPayer ? 'You paid' : `${expense.profiles?.name?.split(' ')[0] ?? 'Someone'} paid`}
                        </span>
                        <span className="text-xs text-gray-200">·</span>
                        <span className="text-xs text-gray-400">
                          {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-base font-bold text-navy-800">{formatCurrency(expense.amount)}</p>
                      {myShare && (
                        <p className={`text-xs font-medium ${
                          isPayer ? 'text-emerald-600' :
                          myShare.is_paid ? 'text-gray-400' : 'text-rose-500'
                        }`}>
                          {isPayer
                            ? `+${formatCurrency(expense.amount - myShare.amount)}`
                            : myShare.is_paid ? 'settled' : `-${formatCurrency(myShare.amount)}`
                          }
                        </p>
                      )}
                    </div>

                    <Badge
                      variant={isSettled ? 'green' : 'red'}
                      size="sm"
                      dot
                    >
                      {isSettled ? 'Settled' : 'Owed'}
                    </Badge>
                  </div>
                )
              })
            )}
          </div>
        </Card>
      </div>

      <ExpenseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
