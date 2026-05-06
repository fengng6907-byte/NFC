'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, TrendingUp } from 'lucide-react'

const stages = [
  { label: 'Tap Card',       icon: '📲', active: 'border-red-matte/50 text-red-matte bg-red-matte/5' },
  { label: 'Profile Opens',  icon: '👤', active: 'border-charcoal/30 text-charcoal bg-charcoal/5' },
  { label: 'Lead Captured',  icon: '✅', active: 'border-emerald-600/40 text-emerald-700 bg-emerald-50' },
  { label: 'In Dashboard',   icon: '📊', active: 'border-charcoal/30 text-charcoal bg-charcoal/5' },
]

const stats = [
  { value: '2.4M+', label: 'Contacts Shared' },
  { value: '847K',  label: 'Leads Captured' },
  { value: '$34M+', label: 'Revenue Tracked' },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [stage, setStage]     = useState(0)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setStage(s => (s + 1) % 4), 1900)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-silver-lightest pt-16">

      {/* Brushed-metal panel — top right */}
      <div className="absolute -top-20 -right-20 w-[560px] h-[560px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #E8E8E8 0%, #D0D0D0 50%, #C0C0C0 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: '70px 70px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ───────────────────────────────── */}
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-matte/25 bg-red-matte/[0.06] text-xs font-semibold text-red-matte mb-7 tracking-wide">
              <span className="w-1.5 h-1.5 bg-red-matte rounded-full animate-pulse" />
              Premium NFC · The Tapt Alternative
            </div>

            <h1 className="text-5xl lg:text-[62px] xl:text-[68px] font-black text-charcoal leading-[1.04] tracking-tight mb-6">
              Every Tap Is a
              <br />
              <span className="text-red-matte">Trackable Deal</span>
            </h1>

            <p className="text-lg text-charcoal-light leading-relaxed mb-10 max-w-[440px]">
              One NFC tap shares your profile, captures the lead, and logs it to your dashboard — in under 3 seconds. No app. No friction.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 btn-red font-semibold rounded-full text-sm transition-all duration-200 hover:shadow-xl group"
              >
                Get Your Card Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href="#demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-charcoal font-semibold rounded-full text-sm border border-black/[0.12] hover:border-black/25 hover:bg-black/[0.04] transition-all duration-200"
              >
                See Live Demo
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-8 border-t border-black/[0.07]">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-charcoal">{s.value}</div>
                  <div className="text-xs text-silver-700 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Card visual ───────────────────────── */}
          <div className={`transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative flex items-center justify-center">

              {/* Glow halo */}
              <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #D0D0D0 0%, #B8B8B8 100%)' }} />

              <div className="relative z-10 animate-float">

                {/* NFC Card — brushed metal */}
                <div className="w-72 h-44 rounded-2xl relative overflow-hidden mx-auto mb-6 shadow-xl"
                  style={{
                    background: 'linear-gradient(145deg, #2E2E2E 0%, #1A1A1A 40%, #252525 70%, #1E1E1E 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Brushed lines on dark card */}
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)' }} />

                  {/* Red top accent */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-matte/70 to-transparent" />

                  {/* NFC rings */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12">
                    {[0, 3, 6].map(i => (
                      <div key={i} className="absolute rounded-full border border-white/[0.15]" style={{ inset: `${i * 4}px` }} />
                    ))}
                    <div className="absolute inset-[18px] bg-red-matte/25 rounded-full" />
                  </div>

                  <div className="absolute left-6 bottom-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 bg-red-matte rounded-md flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white/50 text-[10px] font-bold tracking-widest">TAPFLOW</span>
                    </div>
                    <div className="text-white font-bold text-lg tracking-tight">Alex Johnson</div>
                    <div className="text-white/40 text-xs">VP of Sales · Acme Corp</div>
                  </div>
                </div>

                {/* Flow stages */}
                <div className="flex items-center justify-center gap-1 flex-wrap">
                  {stages.map((s, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-500 ${
                        stage === i ? `${s.active} scale-105 shadow-sm` : 'border-black/[0.07] text-silver-700 bg-white/40'
                      }`}>
                        <span>{s.icon}</span>
                        <span>{s.label}</span>
                      </div>
                      {i < stages.length - 1 && (
                        <div className={`w-3 h-px transition-colors ${stage > i ? 'bg-red-matte' : 'bg-black/10'}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Floating analytics card */}
                <div className="absolute -top-8 -right-12 raised bg-white/90 rounded-2xl p-3 w-44 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-semibold text-charcoal">This Week</span>
                  </div>
                  <div className="text-xl font-bold text-charcoal">+47 leads</div>
                  <div className="text-xs text-emerald-600 mt-0.5">↑ 23% vs last week</div>
                  <div className="mt-2 h-1 bg-silver-300 rounded-full overflow-hidden">
                    <div className="h-full bg-red-matte rounded-full w-3/4" />
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -bottom-6 -left-10 raised bg-white/90 rounded-2xl p-3 w-44 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center text-sm">✅</div>
                    <div>
                      <div className="text-xs font-semibold text-charcoal">New Lead</div>
                      <div className="text-xs text-silver-700">Sarah Chen · CEO</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-silver-600">
        <span className="text-[10px] font-semibold tracking-widest uppercase">Explore</span>
        <div className="w-4 h-7 border border-black/15 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-red-matte rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
