'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Target, DollarSign, MapPin, Clock } from 'lucide-react'

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const tapData    = [24, 38, 29, 52, 44, 31, 47]
const leadData   = [8,  14, 10, 22, 18, 11, 19]

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [cur, setCur] = useState(0)
  useEffect(() => {
    let v = 0; const step = target / 60
    const iv = setInterval(() => {
      v += step
      if (v >= target) { setCur(target); clearInterval(iv) } else setCur(Math.floor(v))
    }, 20)
    return () => clearInterval(iv)
  }, [target])
  return <span>{prefix}{cur.toLocaleString()}{suffix}</span>
}

const metrics = [
  { label: 'Total Taps',        value: 2847,  delta: '+23%', icon: Users,       suffix: '' },
  { label: 'Leads Generated',   value: 847,   delta: '+31%', icon: Target,      suffix: '' },
  { label: 'Conversion Rate',   value: 29,    delta: '+8%',  icon: TrendingUp,  suffix: '%' },
  { label: 'Revenue Tracked',   value: 34200, delta: '+$8K', icon: DollarSign,  prefix: '$' },
]

const recentLeads = [
  { name: 'Sarah Chen',   company: 'TechStart',       role: 'CEO',      time: '2m ago',  status: 'Hot' },
  { name: 'Michael Ross', company: 'Pearson Ventures', role: 'Partner',  time: '15m ago', status: 'Warm' },
  { name: 'Priya Sharma', company: 'ScaleAI',          role: 'VP Sales', time: '1h ago',  status: 'Warm' },
  { name: 'Chris Park',   company: 'Sequoia',          role: 'Analyst',  time: '3h ago',  status: 'Cold' },
]

const statusStyles: Record<string, string> = {
  Hot:  'bg-red-100 text-red-700 border border-red-200',
  Warm: 'bg-amber-100 text-amber-700 border border-amber-200',
  Cold: 'bg-blue-100 text-blue-700 border border-blue-200',
}

export default function AnalyticsDashboard() {
  const maxTap = Math.max(...tapData)

  return (
    <section className="py-28 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-matte/30 bg-red-matte/[0.08] text-[11px] font-bold text-red-matte uppercase tracking-widest mb-5">
            Real-Time Analytics
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Your Performance, At a Glance
          </h2>
          <p className="text-lg text-silver-600 max-w-xl mx-auto">
            Know exactly who tapped, when they converted, and how much revenue your network generates.
          </p>
        </div>

        {/* Dashboard frame */}
        <div className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Toolbar */}
          <div className="px-6 py-3 flex items-center justify-between"
            style={{ background: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {['bg-red-500','bg-amber-400','bg-emerald-500'].map(c => <div key={c} className={`w-2.5 h-2.5 ${c} rounded-full`} />)}
              </div>
              <span className="text-silver-700 text-xs ml-1">TapFlow Analytics — Q2 2025</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(16,185,129,0.08)' }}>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {metrics.map(m => {
                const Icon = m.icon
                return (
                  <div key={m.label} className="rounded-2xl p-4"
                    style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <Icon className="w-3.5 h-3.5 text-silver-600" strokeWidth={1.75} />
                      </div>
                      <span className="text-xs font-bold text-red-matte">{m.delta}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      <AnimatedNumber target={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </div>
                    <div className="text-[11px] text-silver-700 mt-1">{m.label}</div>
                  </div>
                )
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Bar chart */}
              <div className="lg:col-span-2 rounded-2xl p-5"
                style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-white text-sm font-semibold">Taps & Leads</div>
                    <div className="text-silver-700 text-xs">This week</div>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    {[['bg-silver-500','Taps'],['bg-red-matte','Leads']].map(([c,l]) => (
                      <div key={l} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-sm ${c}`} />
                        <span className="text-silver-600">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-2 h-28">
                  {weekLabels.map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-0.5" style={{ height: '100px' }}>
                        <div className="flex-1 rounded-t-sm"
                          style={{ height: `${(tapData[i] / maxTap) * 100}%`, background: 'linear-gradient(to top, #3A3A3A, #555)' }} />
                        <div className="flex-1 bg-red-matte rounded-t-sm"
                          style={{ height: `${(leadData[i] / maxTap) * 100}%` }} />
                      </div>
                      <div className="text-silver-700 text-[10px]">{day}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent leads */}
              <div className="rounded-2xl p-5"
                style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white text-sm font-semibold">Recent Leads</div>
                  <button className="text-red-matte text-xs hover:text-red-bright transition-colors">View all</button>
                </div>
                <div className="space-y-3">
                  {recentLeads.map(lead => (
                    <div key={lead.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-charcoal-soft flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                        {lead.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-semibold truncate">{lead.name}</div>
                        <div className="text-silver-700 text-[10px] truncate">{lead.company} · {lead.role}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${statusStyles[lead.status]}`}>{lead.status}</span>
                        <span className="text-silver-800 text-[10px]">{lead.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insight row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Top Event', value: 'SaaStr Annual', icon: MapPin,     note: '94 taps' },
                { label: 'Peak Time', value: '2–4 PM',        icon: Clock,      note: 'Weekdays' },
                { label: 'Best Day',  value: 'Thursday',      icon: TrendingUp, note: '52 avg taps' },
              ].map(item => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-2xl p-4 flex items-center gap-3"
                    style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <Icon className="w-4 h-4 text-silver-600" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-silver-700 text-[10px]">{item.label}</div>
                      <div className="text-white text-sm font-bold">{item.value}</div>
                      <div className="text-silver-800 text-[10px]">{item.note}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
