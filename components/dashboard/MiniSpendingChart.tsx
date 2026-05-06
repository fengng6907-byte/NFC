'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'

interface DataPoint {
  month: string
  total: number
  settled: number
  outstanding: number
}

interface Props {
  data: DataPoint[]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-card border border-navy-800/8 px-3 py-2.5 text-xs">
      <p className="font-semibold text-navy-800 mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="text-gray-400 capitalize">{p.name}:</span>
          <span className="font-medium text-navy-800">${p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function MiniSpendingChart({ data }: Props) {
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={16} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,27,42,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245,184,0,0.04)', radius: 8 }} />
          <Bar dataKey="settled" name="Settled" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="outstanding" name="Outstanding" fill="#F5B800" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
