'use client'
import { useState } from 'react'
import { CheckCircle2, ArrowRight, QrCode } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { CURRENT_USER } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/balance'

const DEBTS_OWED_TO_ME = [
  { user: { id: 'user-2', name: 'Jamie Rivera', email: 'jamie@example.com', points: 280, streakDays: 3, totalSettled: 890 }, amount: 352.63, groupName: 'Tokyo Trip' },
  { user: { id: 'user-4', name: 'Morgan Lee', email: 'morgan@example.com', points: 120, streakDays: 1, totalSettled: 340 }, amount: 95.47, groupName: 'Friday Night Crew' },
]

const DEBTS_I_OWE = [
  { user: { id: 'user-3', name: 'Sam Patel', email: 'sam@example.com', points: 620, streakDays: 14, totalSettled: 2100 }, amount: 300.00, groupName: 'Tokyo Trip' },
]

export default function SettlePage() {
  const [settled, setSettled] = useState<string[]>([])
  const [loading, setLoading] = useState<string | null>(null)

  const handleSettle = async (userId: string) => {
    setLoading(userId)
    await new Promise(r => setTimeout(r, 1000))
    setSettled(prev => [...prev, userId])
    setLoading(null)
  }

  const totalOwedToMe = DEBTS_OWED_TO_ME.filter(d => !settled.includes(d.user.id)).reduce((s, d) => s + d.amount, 0)
  const totalIOwe = DEBTS_I_OWE.filter(d => !settled.includes(d.user.id)).reduce((s, d) => s + d.amount, 0)

  return (
    <>
      <Header title="Settle Up" subtitle="Clear your debts and maintain your streak" />

      <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto space-y-6">

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <Card padding="md" className="bg-emerald-50 border-emerald-100">
            <p className="text-xs text-emerald-600 font-medium mb-1">You're owed</p>
            <p className="text-2xl font-black text-emerald-700">{formatCurrency(totalOwedToMe)}</p>
            <p className="text-xs text-emerald-500 mt-0.5">{DEBTS_OWED_TO_ME.filter(d => !settled.includes(d.user.id)).length} people</p>
          </Card>
          <Card padding="md" className="bg-rose-50 border-rose-100">
            <p className="text-xs text-rose-500 font-medium mb-1">You owe</p>
            <p className="text-2xl font-black text-rose-600">{formatCurrency(totalIOwe)}</p>
            <p className="text-xs text-rose-400 mt-0.5">{DEBTS_I_OWE.filter(d => !settled.includes(d.user.id)).length} people</p>
          </Card>
        </div>

        {/* Streak reminder */}
        <Card navy padding="md">
          <div className="flex items-center gap-4">
            <div className="text-4xl duck-bob">🦆</div>
            <div>
              <p className="text-white font-bold">Keep your {CURRENT_USER.streakDays}-day streak!</p>
              <p className="text-white/50 text-sm mt-0.5">Settle at least one debt today to continue your Golden Duck streak.</p>
            </div>
            <Badge variant="gold" className="shrink-0">{CURRENT_USER.streakDays} days</Badge>
          </div>
        </Card>

        {/* Debts owed to you */}
        <Card padding="none">
          <div className="px-5 py-3.5 border-b border-navy-800/6">
            <h2 className="font-semibold text-navy-800 text-sm">Owed to you</h2>
          </div>
          <div className="divide-y divide-navy-800/4">
            {DEBTS_OWED_TO_ME.map(debt => {
              const isSettled = settled.includes(debt.user.id)
              return (
                <div key={debt.user.id} className={`flex items-center gap-4 px-5 py-4 transition-all ${isSettled ? 'opacity-50' : ''}`}>
                  <Avatar name={debt.user.name} size="md" />
                  <div className="flex-1">
                    <p className="font-semibold text-navy-800 text-sm">{debt.user.name}</p>
                    <p className="text-xs text-gray-400">{debt.groupName}</p>
                  </div>
                  <p className="font-black text-emerald-600 text-lg">{formatCurrency(debt.amount)}</p>
                  {isSettled ? (
                    <Badge variant="green" dot>Settled</Badge>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSettle(debt.user.id)}
                      loading={loading === debt.user.id}
                    >
                      Remind
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* Debts you owe */}
        <Card padding="none">
          <div className="px-5 py-3.5 border-b border-navy-800/6">
            <h2 className="font-semibold text-navy-800 text-sm">You owe</h2>
          </div>
          <div className="divide-y divide-navy-800/4">
            {DEBTS_I_OWE.map(debt => {
              const isSettled = settled.includes(debt.user.id)
              return (
                <div key={debt.user.id} className={`flex items-center gap-4 px-5 py-4 transition-all ${isSettled ? 'opacity-50' : ''}`}>
                  <Avatar name={debt.user.name} size="md" />
                  <div className="flex-1">
                    <p className="font-semibold text-navy-800 text-sm">{debt.user.name}</p>
                    <p className="text-xs text-gray-400">{debt.groupName}</p>
                  </div>
                  <p className="font-black text-rose-500 text-lg">{formatCurrency(debt.amount)}</p>
                  {isSettled ? (
                    <Badge variant="green" dot>
                      <CheckCircle2 size={12} />
                      Done
                    </Badge>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<QrCode size={13} />}
                      >
                        QR
                      </Button>
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => handleSettle(debt.user.id)}
                        loading={loading === debt.user.id}
                      >
                        Mark paid
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        {/* All clear state */}
        {settled.length === DEBTS_OWED_TO_ME.length + DEBTS_I_OWE.length && (
          <Card padding="lg" className="text-center bg-gold-50 border-gold-200">
            <div className="text-6xl mb-3 duck-bob">🦆</div>
            <h2 className="text-2xl font-black text-navy-800 mb-1">All settled up!</h2>
            <p className="text-gray-500 mb-4">You've cleared all your debts. Golden Duck status maintained!</p>
            <Badge variant="gold">Streak maintained 🔥</Badge>
          </Card>
        )}
      </div>
    </>
  )
}
