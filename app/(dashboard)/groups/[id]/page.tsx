'use client'
import { useState } from 'react'
import { ArrowLeft, Plus, Settings, CheckCircle2, Users, Receipt, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { ExpenseModal } from '@/components/expenses/ExpenseModal'
import { MOCK_GROUPS, MOCK_EXPENSES, CURRENT_USER } from '@/lib/mock-data'
import { CATEGORY_META, GROUP_TYPE_META } from '@/types'
import { formatCurrency, simplifyDebts } from '@/lib/balance'

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'members'>('expenses')

  const group = MOCK_GROUPS.find(g => g.id === params.id) ?? MOCK_GROUPS[0]
  const groupExpenses = MOCK_EXPENSES.filter(e => e.groupId === group.id)
  const simplifiedDebts = simplifyDebts(groupExpenses, group.members.map(m => m.user))

  const yourBalance = group.yourBalance

  return (
    <>
      <Header
        title={group.name}
        subtitle={`${GROUP_TYPE_META[group.type].label} · ${group.members.length} members`}
        onAddExpense={() => setExpenseModalOpen(true)}
      />

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-6">
        {/* Back button */}
        <Link href="/groups" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-navy-800 transition-colors">
          <ArrowLeft size={16} />
          Back to groups
        </Link>

        {/* Group header card */}
        <Card padding="none" className="overflow-hidden">
          <div
            className="h-32 relative flex items-center px-6"
            style={{
              background: `linear-gradient(135deg, ${group.color}25 0%, ${group.color}10 100%)`,
            }}
          >
            <div className="text-6xl mr-4">{group.emoji}</div>
            <div>
              <h1 className="text-2xl font-black text-navy-800">{group.name}</h1>
              {group.description && <p className="text-sm text-gray-500 mt-0.5">{group.description}</p>}
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="gold">{GROUP_TYPE_META[group.type].label}</Badge>
                <Badge variant="gray">{group.currency}</Badge>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 divide-x divide-navy-800/6 border-t border-navy-800/6">
            {[
              { label: 'Total expenses', value: formatCurrency(group.totalExpenses), icon: Receipt },
              { label: 'Members', value: group.members.length, icon: Users },
              { label: 'Your balance', value: (yourBalance >= 0 ? '+' : '') + formatCurrency(yourBalance), icon: TrendingUp, colored: true, positive: yourBalance >= 0 },
            ].map(({ label, value, icon: Icon, colored, positive }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3">
                <Icon size={16} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className={`text-base font-bold ${colored ? (positive ? 'text-emerald-600' : 'text-rose-500') : 'text-navy-800'}`}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-1 bg-cream-200 rounded-xl p-1 w-fit">
          {(['expenses', 'balances', 'members'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white text-navy-800 shadow-card'
                  : 'text-gray-400 hover:text-navy-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab: Expenses */}
        {activeTab === 'expenses' && (
          <Card padding="none">
            <div className="px-5 py-4 border-b border-navy-800/6 flex items-center justify-between">
              <h2 className="font-semibold text-navy-800">Expenses ({groupExpenses.length})</h2>
              <Button variant="gold" size="sm" icon={<Plus size={14} />} onClick={() => setExpenseModalOpen(true)}>
                Add
              </Button>
            </div>
            <div className="divide-y divide-navy-800/4">
              {groupExpenses.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-5xl mb-3">💸</div>
                  <p className="text-navy-800 font-semibold mb-1">No expenses yet</p>
                  <p className="text-sm text-gray-400 mb-4">Add the first expense to get started</p>
                  <Button variant="gold" size="sm" onClick={() => setExpenseModalOpen(true)} icon={<Plus size={14} />}>
                    Add expense
                  </Button>
                </div>
              ) : (
                groupExpenses.map(expense => {
                  const meta = CATEGORY_META[expense.category]
                  const myShare = expense.shares.find(s => s.userId === CURRENT_USER.id)
                  const isPayer = expense.payerId === CURRENT_USER.id

                  return (
                    <div key={expense.id} className="flex items-center gap-4 px-5 py-4 hover:bg-cream-50 transition-all">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}25` }}
                      >
                        {meta.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-navy-800 truncate">{expense.title}</p>
                          {expense.aiCategory && (
                            <span className="text-[10px] badge-blue px-1.5 py-0 rounded font-medium shrink-0">AI</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {isPayer ? 'You paid' : `${expense.payer.name.split(' ')[0]} paid`} ·{' '}
                          {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <div className="mt-1.5 flex gap-1 flex-wrap">
                          {expense.shares.map(share => (
                            <div
                              key={share.userId}
                              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium ${
                                share.isPaid ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                              }`}
                            >
                              <span>{share.user.name.split(' ')[0]}</span>
                              {share.isPaid && <CheckCircle2 size={10} />}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-base font-bold text-navy-800">{formatCurrency(expense.amount)}</p>
                        {myShare && (
                          <p className={`text-xs font-medium ${
                            isPayer ? 'text-emerald-600' : myShare.isPaid ? 'text-gray-400' : 'text-rose-500'
                          }`}>
                            {isPayer
                              ? `you get back ${formatCurrency(expense.amount - myShare.amount)}`
                              : myShare.isPaid
                              ? 'settled'
                              : `you owe ${formatCurrency(myShare.amount)}`
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </Card>
        )}

        {/* Tab: Balances */}
        {activeTab === 'balances' && (
          <div className="space-y-4">
            <Card padding="md">
              <h2 className="font-semibold text-navy-800 mb-4">Simplified Debts</h2>
              {simplifiedDebts.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-navy-800 font-semibold">All settled up!</p>
                  <p className="text-sm text-gray-400 mt-1">No outstanding debts in this group</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {simplifiedDebts.map((debt, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200">
                      <Avatar name={debt.fromUser.name} size="md" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-400">
                          <span className="font-semibold text-navy-800">{debt.fromUser.name.split(' ')[0]}</span>
                          {' '}owes{' '}
                          <span className="font-semibold text-navy-800">{debt.toUser.name.split(' ')[0]}</span>
                        </p>
                        <p className="text-xl font-black text-navy-800 mt-0.5">{formatCurrency(debt.amount)}</p>
                      </div>
                      <Avatar name={debt.toUser.name} size="md" />
                      {(debt.fromUserId === CURRENT_USER.id || debt.toUserId === CURRENT_USER.id) && (
                        <Button variant="gold" size="sm">
                          {debt.fromUserId === CURRENT_USER.id ? 'Pay' : 'Request'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Tab: Members */}
        {activeTab === 'members' && (
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy-800">Members ({group.members.length})</h2>
              <Button variant="secondary" size="sm" icon={<Plus size={14} />}>Invite</Button>
            </div>
            <div className="space-y-2">
              {group.members.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cream-50 transition-all">
                  <Avatar name={member.user.name} size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy-800">{member.user.name}</p>
                    <p className="text-xs text-gray-400">{member.user.email}</p>
                  </div>
                  <Badge variant={member.role === 'ADMIN' ? 'gold' : 'gray'} size="sm">
                    {member.role}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <ExpenseModal
        open={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        groupId={group.id}
      />
    </>
  )
}
