'use client'

import { useState } from 'react'
import { Play, Pause, Zap, Wifi, ArrowRight } from 'lucide-react'
import Link from 'next/link'

/* ── Etched video container ──────────────────────────────────────── */
function EtchedVideo({ title, tag }: { title: string; tag: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group etched-deep"
      style={{ background: '#C8C8C8' }}
      onClick={() => setPlaying(!playing)}
    >
      {/* Brushed base */}
      <div className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 4px), linear-gradient(160deg, #BEBEBE 0%, #AAAAAA 40%, #B8B8B8 60%, #A5A5A5 100%)',
        }}
      />

      {/* Inner-glow bottom edge (light source from below) */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />

      {/* Scan-line overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 3px)' }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          playing
            ? 'bg-charcoal/80 scale-90'
            : 'bg-red-matte group-hover:scale-110 group-hover:shadow-2xl'
        }`}
          style={{ boxShadow: playing ? undefined : '0 6px 24px rgba(185,28,28,0.45)' }}
        >
          {playing
            ? <Pause className="w-5 h-5 text-white" />
            : <Play  className="w-5 h-5 text-white ml-0.5" />
          }
        </div>
      </div>

      {/* Caption overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="text-[10px] font-bold text-red-matte/80 uppercase tracking-widest mb-0.5">{tag}</div>
        <div className="text-sm font-semibold text-white">{title}</div>
      </div>

      {/* Duration badge */}
      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/30 rounded text-[10px] text-white/70 border border-white/10">
        {playing ? 'Playing…' : '2:34'}
      </div>
    </div>
  )
}

/* ── Physical card mockup ────────────────────────────────────────── */
function MetalCard() {
  return (
    <div className="relative w-full max-w-[340px]">
      <div className="absolute inset-0 blur-2xl opacity-20 rounded-2xl"
        style={{ background: 'linear-gradient(135deg, #C0C0C0, #909090)' }} />

      <div className="relative rounded-2xl p-7 shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #2C2C2C 0%, #1A1A1A 45%, #242424 70%, #1E1E1E 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Brushed lines */}
        <div className="absolute inset-0 rounded-2xl opacity-[0.05]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)' }} />

        {/* Red top edge */}
        <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-red-matte/60 to-transparent" />

        <div className="flex items-start justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-matte rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/40 text-[10px] font-black tracking-[0.2em]">TAPFLOW</span>
          </div>
          {/* NFC indicator */}
          <div className="relative w-10 h-10">
            {[0, 3, 6].map(i => (
              <div key={i} className="absolute rounded-full border border-white/[0.12]" style={{ inset: `${i}px` }} />
            ))}
            <div className="absolute inset-[16px] bg-red-matte/20 rounded-full" />
          </div>
        </div>

        <div>
          <div className="text-xl font-bold text-white tracking-tight">Alex Johnson</div>
          <div className="text-sm text-white/40 mt-0.5">VP of Sales · Acme Corp</div>
          <div className="mt-3 text-[11px] text-white/25 font-mono">tap.tapflow.io/alex</div>
        </div>

        <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* NFC Ready badge */}
      <div className="absolute -bottom-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-red-matte text-white text-[11px] font-bold rounded-xl shadow-lg"
        style={{ boxShadow: '0 4px 14px rgba(185,28,28,0.4)' }}>
        <Wifi className="w-3 h-3" />
        NFC Ready
      </div>
    </div>
  )
}

/* ── Profile mockup (what recipient sees) ────────────────────────── */
function ProfileMockup() {
  return (
    <div className="w-44 rounded-3xl overflow-hidden shadow-xl raised bg-white/95">
      <div className="h-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-matte/60 to-transparent" />
      </div>
      <div className="px-3 pb-4 -mt-6">
        <div className="w-12 h-12 rounded-full border-4 border-white bg-silver-300 mb-2 flex items-center justify-center text-lg shadow-sm">👔</div>
        <div className="font-bold text-charcoal text-sm leading-tight">Alex Johnson</div>
        <div className="text-[11px] text-silver-700 mb-3">VP Sales · Acme Corp</div>
        {['📧 alex@acme.com', '📱 +1 555 0192'].map(item => (
          <div key={item} className="text-[10px] text-charcoal-light bg-silver-200 rounded-lg px-2 py-1.5 mb-1">{item}</div>
        ))}
        <button className="w-full mt-2 py-1.5 bg-red-matte text-white text-[11px] font-bold rounded-xl">
          Save Contact
        </button>
      </div>
    </div>
  )
}

export default function ProductShowcase() {
  return (
    <section className="py-28 bg-silver-lightest">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.09] bg-white/60 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-5">
            The Product
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-4 tracking-tight">
            One Card. Total Intelligence.
          </h2>
          <p className="text-lg text-charcoal-light max-w-xl mx-auto leading-relaxed">
            A single tap replaces every lead form, paper card, and forgotten follow-up you've ever lost.
          </p>
        </div>

        {/* Card + Profile */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex justify-center lg:justify-end">
            <MetalCard />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-[11px] font-semibold text-silver-800 mb-5 uppercase tracking-wider">
              What Your Contact Sees
            </div>
            <div className="flex items-start gap-8">
              <ProfileMockup />
              <div className="pt-2 space-y-5">
                {[
                  { n: '01', title: 'Instant Profile',  desc: 'Full page loads in under 1 second.' },
                  { n: '02', title: 'One-Tap Save',     desc: 'Saves to native contacts — zero friction.' },
                  { n: '03', title: 'Auto Lead Log',    desc: 'Captured in your dashboard instantly.' },
                ].map(item => (
                  <div key={item.n} className="flex gap-3">
                    <span className="text-[11px] font-black text-red-matte mt-0.5">{item.n}</span>
                    <div>
                      <div className="text-sm font-bold text-charcoal">{item.title}</div>
                      <div className="text-xs text-silver-700 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Etched video containers */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-[11px] font-bold text-red-matte uppercase tracking-widest mb-2">Watch It Work</div>
              <h3 className="text-2xl font-bold text-charcoal">Product in Action</h3>
            </div>
            <Link href="/pricing"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-charcoal-light hover:text-charcoal transition-colors group"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <EtchedVideo title="30-Second Tap Demo"     tag="Core Product" />
            <EtchedVideo title="Dashboard Walkthrough"  tag="Analytics"   />
            <EtchedVideo title="Team Setup in 5 Min"    tag="For Teams"   />
          </div>
        </div>

      </div>
    </section>
  )
}
