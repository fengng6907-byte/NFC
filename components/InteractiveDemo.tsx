'use client'

import { useState, useEffect, useRef } from 'react'
import { Smartphone, User, CheckCircle, BarChart2, ArrowRight, Wifi } from 'lucide-react'

const steps = [
  { id: 0, title: 'Tap Your Card',          desc: 'Hold TapFlow near any phone',               icon: Smartphone,  color: 'bg-charcoal',    visual: 'tap' },
  { id: 1, title: 'Profile Opens Instantly', desc: 'Full profile loads in under 1 second',      icon: User,        color: 'bg-silver-700',  visual: 'profile' },
  { id: 2, title: 'Lead Auto-Captured',      desc: 'Contact logged, lead pushed to CRM',        icon: CheckCircle, color: 'bg-emerald-700', visual: 'lead' },
  { id: 3, title: 'Dashboard Updated',       desc: 'Analytics refreshed in real-time',          icon: BarChart2,   color: 'bg-red-matte',   visual: 'dashboard' },
]

function TapVisual() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="w-28 h-52 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-xl raised"
          style={{ background: 'linear-gradient(145deg, #2A2A2A, #1A1A1A)' }}>
          <div className="relative z-10 text-center">
            <Wifi className="w-8 h-8 text-silver-400 mx-auto mb-2 animate-pulse" strokeWidth={1.5} />
            <div className="text-silver-600 text-xs">NFC Ready</div>
          </div>
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-10 rounded-lg shadow-md animate-bounce raised"
          style={{ background: 'linear-gradient(135deg, #2C2C2C, #1A1A1A)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border border-red-matte/60 rounded-full" />
          </div>
        </div>
        {[60, 100, 140].map((sz, i) => (
          <div key={i} className="absolute border border-red-matte/20 rounded-full"
            style={{ width: sz, height: sz, top: `calc(50% - ${sz/2}px)`, left: `calc(50% - ${sz/2}px)`,
              animation: `ping ${i * 0.4 + 1.2}s cubic-bezier(0,0,0.2,1) infinite` }} />
        ))}
      </div>
      <p className="text-sm text-charcoal-light font-medium">Bring your card close…</p>
    </div>
  )
}

function ProfileVisual() {
  return (
    <div className="w-44 rounded-3xl overflow-hidden shadow-xl raised bg-white">
      <div className="h-14 relative" style={{ background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-matte/50 to-transparent" />
      </div>
      <div className="px-3 pb-4 -mt-6">
        <div className="w-12 h-12 rounded-full border-4 border-white bg-silver-300 mb-2 flex items-center justify-center text-lg shadow-sm">👔</div>
        <div className="font-bold text-charcoal text-sm">Alex Johnson</div>
        <div className="text-xs text-silver-700 mb-3">VP Sales · Acme Corp</div>
        {['📧 alex@acme.com', '📱 +1 555 0192', '🌐 linkedin.com/in/alex'].map(item => (
          <div key={item} className="text-[10px] text-charcoal-light bg-silver-200 rounded-lg px-2 py-1.5 mb-1">{item}</div>
        ))}
        <button className="w-full mt-2 py-1.5 bg-red-matte text-white text-[11px] font-bold rounded-xl">Save Contact</button>
      </div>
    </div>
  )
}

function LeadVisual() {
  return (
    <div className="space-y-3 w-52">
      <div className="rounded-2xl p-4 raised bg-white">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700">Lead Captured!</span>
        </div>
        {[['Name','Sarah Chen'],['Company','TechStart Inc'],['Role','CEO'],['Time','Just now']].map(([k,v]) => (
          <div key={k} className="flex justify-between text-xs mb-1">
            <span className="text-silver-700">{k}</span>
            <span className="font-semibold text-charcoal">{v}</span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-3 raised bg-white/80">
        <div className="text-xs font-bold text-charcoal mb-1">Auto-added to CRM</div>
        <div className="text-xs text-silver-700">Sent to Salesforce · Team notified</div>
      </div>
    </div>
  )
}

function DashboardVisual() {
  const bars = [65, 80, 55, 92, 70, 88, 95]
  return (
    <div className="w-52 rounded-2xl overflow-hidden shadow-xl raised bg-white">
      <div className="px-3 py-2 flex items-center gap-1.5" style={{ background: '#1A1A1A' }}>
        {['bg-red-500','bg-amber-400','bg-emerald-500'].map(c => <div key={c} className={`w-2 h-2 ${c} rounded-full`} />)}
        <span className="text-white/40 text-[10px] ml-1">Dashboard</span>
      </div>
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[['247','Taps','+12%'],['89','Leads','+31%']].map(([val,lbl,d]) => (
            <div key={lbl} className="rounded-xl p-2 etched" style={{ background: '#E8E8E8' }}>
              <div className="text-lg font-bold text-charcoal">{val}</div>
              <div className="text-[10px] text-silver-700">{lbl}</div>
              <div className="text-[10px] text-red-matte font-bold">{d}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[10px] text-silver-700 mb-2">Taps This Week</div>
          <div className="flex items-end gap-1 h-14">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-charcoal to-charcoal-soft rounded-t-sm"
                style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const VisualMap: Record<string, React.FC> = {
  tap: TapVisual, profile: ProfileVisual, lead: LeadVisual, dashboard: DashboardVisual,
}

export default function InteractiveDemo() {
  const [active, setActive]   = useState(0)
  const [auto, setAuto]       = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!auto) return
    timerRef.current = setTimeout(() => setActive(s => (s + 1) % steps.length), 2500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, auto])

  const ActiveVisual = VisualMap[steps[active].visual]

  return (
    <section id="demo" className="py-28 bg-silver-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/50 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-5">
            Live Product Demo
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-4 tracking-tight">See TapFlow in Action</h2>
          <p className="text-lg text-charcoal-light max-w-xl mx-auto">
            Watch how a single tap turns into a tracked business opportunity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Step list */}
          <div className="space-y-2">
            {steps.map((s, i) => {
              const Icon = s.icon
              const isActive = active === i
              return (
                <button key={s.id} onClick={() => { setAuto(false); setActive(i) }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-black/[0.08] shadow-md'
                      : 'bg-white/40 border-black/[0.05] hover:border-black/[0.09] hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0 transition-transform ${isActive ? 'scale-110 shadow-md' : ''}`}>
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-silver-600">Step {i + 1}</span>
                        {isActive && <span className="text-[10px] font-bold text-red-matte bg-red-matte/8 px-2 py-0.5 rounded-full">Active</span>}
                      </div>
                      <div className="font-bold text-charcoal text-sm">{s.title}</div>
                      <div className="text-xs text-silver-700">{s.desc}</div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-colors ${isActive ? 'text-red-matte' : 'text-silver-500'}`} strokeWidth={1.75} />
                  </div>
                  {isActive && auto && (
                    <div className="mt-3 h-0.5 bg-silver-300 rounded-full overflow-hidden">
                      <div className="h-full bg-red-matte rounded-full" style={{ animation: 'progress 2.5s linear forwards' }} />
                    </div>
                  )}
                </button>
              )
            })}
            <button onClick={() => { setActive(0); setAuto(true) }}
              className="w-full py-3 text-xs font-semibold text-silver-700 hover:text-red-matte transition-colors">
              ↺ Replay Demo
            </button>
          </div>

          {/* Visual */}
          <div className="flex items-center justify-center min-h-[380px] rounded-3xl p-8 raised bg-white/60">
            <ActiveVisual />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes progress { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  )
}
