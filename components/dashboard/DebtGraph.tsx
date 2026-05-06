'use client'
import { ArrowRight } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { CURRENT_USER, MOCK_USERS } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/balance'

const SIMPLIFIED_DEBTS = [
  { from: MOCK_USERS[1], to: MOCK_USERS[0], amount: 352.63 },
  { from: MOCK_USERS[3], to: MOCK_USERS[0], amount: 95.47 },
  { from: MOCK_USERS[0], to: MOCK_USERS[2], amount: 300.00 },
  { from: MOCK_USERS[4], to: MOCK_USERS[2], amount: 700.00 },
]

export function DebtGraph() {
  return (
    <div className="space-y-3">
      {SIMPLIFIED_DEBTS.map((debt, i) => {
        const isYourDebt = debt.from.id === CURRENT_USER.id
        const youAreReceiving = debt.to.id === CURRENT_USER.id

        return (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
            isYourDebt
              ? 'bg-rose-50 border-rose-100'
              : youAreReceiving
              ? 'bg-emerald-50 border-emerald-100'
              : 'bg-cream-50 border-cream-200'
          }`}>
            <Avatar name={debt.from.name} size="sm" />

            <div className="flex-1 min-w-0 flex items-center gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-navy-800 truncate">
                  {debt.from.id === CURRENT_USER.id ? 'You' : debt.from.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-gray-400">owes</p>
              </div>
              <ArrowRight size={12} className={`shrink-0 ${
                isYourDebt ? 'text-rose-400' : youAreReceiving ? 'text-emerald-400' : 'text-gray-300'
              }`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-navy-800 truncate">
                  {debt.to.id === CURRENT_USER.id ? 'You' : debt.to.name.split(' ')[0]}
                </p>
              </div>
            </div>

            <Avatar name={debt.to.name} size="sm" />

            <div className="text-right shrink-0">
              <div className={`text-sm font-bold ${
                isYourDebt ? 'text-rose-500' : youAreReceiving ? 'text-emerald-600' : 'text-navy-800'
              }`}>
                {formatCurrency(debt.amount)}
              </div>
              {(isYourDebt || youAreReceiving) && (
                <button className="text-[10px] text-gold-600 font-medium hover:text-gold-700 mt-0.5">
                  Settle
                </button>
              )}
            </div>
          </div>
        )
      })}

      <p className="text-center text-xs text-gray-400 pt-1">
        Simplified from 8 transactions to 4
      </p>
    </div>
  )
}
