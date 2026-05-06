'use client'
import { Header } from '@/components/layout/Header'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { MOCK_MONTHLY_SPENDING, MOCK_CATEGORY_SPENDING, MOCK_EXPENSES } from '@/lib/mock-data'
import { CATEGORY_META } from '@/types'
import { formatCurrency } from '@/lib/balance'

const COLORS = ['#F5B800', '#8B5CF6', '#10B981', '#3B82F6', '#EC4899', '#F97316']

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-card border border-navy-800/8 px-3 py-2.5 text-xs">
      <p className="font-semibold text-navy-800 mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.fill ?? p.stroke }} />
          <span className="text-gray-400">{p.name}:</span>
          <span className="font-medium text-navy-800">${p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const totalSpent = MOCK_MONTHLY_SPENDING.reduce((s, m) => s + m.total, 0)
  const totalSettled = MOCK_MONTHLY_SPENDING.reduce((s, m) => s + m.settled, 0)
  const settleRate = Math.round((totalSettled / totalSpent) * 100)

  return (
    <>
      <Header title="Analytics" subtitle="Your spending insights and trends" />

      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-6">

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total tracked', value: formatCurrency(totalSpent), badge: '6 months', color: 'text-navy-800' },
            { label: 'Total settled', value: formatCurrency(totalSettled), badge: `${settleRate}% rate`, color: 'text-emerald-600' },
            { label: 'Outstanding', value: formatCurrency(totalSpent - totalSettled), badge: 'needs attention', color: 'text-rose-500' },
            { label: 'Avg per month', value: formatCurrency(totalSpent / 6), badge: 'avg', color: 'text-navy-800' },
          ].map(({ label, value, badge, color }) => (
            <Card key={label} padding="md">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-gray-400">{label}</p>
                <Badge variant="gray" size="sm">{badge}</Badge>
              </div>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
            </Card>
          ))}
        </div>

        {/* Area chart: Spending over time */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-navy-800">Spending Trend</h2>
              <p className="text-xs text-gray-400 mt-0.5">Total vs settled over 6 months</p>
            </div>
            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-navy-700" /><span className="text-gray-400">Total</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-emerald-500" /><span className="text-gray-400">Settled</span></div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_MONTHLY_SPENDING}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D1B2A" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#0D1B2A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSettled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,27,42,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="total" name="Total" stroke="#0D1B2A" strokeWidth={2} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="settled" name="Settled" stroke="#10B981" strokeWidth={2} fill="url(#colorSettled)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category breakdown */}
          <Card padding="md">
            <h2 className="font-semibold text-navy-800 mb-4">By Category</h2>
            <div className="flex items-center gap-6">
              <div className="w-40 h-40 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_CATEGORY_SPENDING}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={68}
                      paddingAngle={3}
                    >
                      {MOCK_CATEGORY_SPENDING.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => [`$${v}`, 'Amount']}
                      contentStyle={{ borderRadius: 12, fontSize: 11, border: '1px solid rgba(13,27,42,0.08)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2.5">
                {MOCK_CATEGORY_SPENDING.map((item, i) => {
                  const meta = CATEGORY_META[item.category as keyof typeof CATEGORY_META]
                  return (
                    <div key={item.category} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-sm text-gray-500 flex-1">{meta?.label ?? item.category}</span>
                      <span className="text-sm font-bold text-navy-800">{formatCurrency(item.amount)}</span>
                      <span className="text-xs text-gray-400 w-10 text-right">{item.percent}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Bar chart: Outstanding by month */}
          <Card padding="md">
            <h2 className="font-semibold text-navy-800 mb-4">Outstanding by Month</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_MONTHLY_SPENDING} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,27,42,0.04)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245,184,0,0.04)', radius: 8 }} />
                  <Bar dataKey="outstanding" name="Outstanding" fill="#F5B800" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Top expenses */}
        <Card padding="md">
          <h2 className="font-semibold text-navy-800 mb-4">Top Expenses</h2>
          <div className="space-y-3">
            {MOCK_EXPENSES.slice(0, 5).sort((a, b) => b.amount - a.amount).map((expense, i) => {
              const meta = CATEGORY_META[expense.category]
              const maxAmount = Math.max(...MOCK_EXPENSES.map(e => e.amount))
              const pct = (expense.amount / maxAmount) * 100

              return (
                <div key={expense.id} className="flex items-center gap-3">
                  <span className="text-xs text-gray-300 w-4 font-mono">#{i + 1}</span>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{ background: `${meta.color}15` }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-navy-800 truncate">{expense.title}</p>
                      <p className="text-sm font-bold text-navy-800 shrink-0 ml-2">{formatCurrency(expense.amount)}</p>
                    </div>
                    <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: meta.color }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </>
  )
}
