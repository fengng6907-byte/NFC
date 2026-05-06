'use client'

import { useState } from 'react'
import { TrendingUp, Home, Lightbulb, ChevronRight, ArrowRight, Clock, Share2, LineChart } from 'lucide-react'
import Link from 'next/link'

const segments = [
  {
    id: 'sales',
    label: 'Salespeople',
    icon: TrendingUp,
    headline: 'Close 3× More Deals — Without More Meetings',
    sub: "Traditional business cards have a 40% loss rate. TapFlow captures every handshake as a live lead in under 3 seconds, automatically routed to your CRM before you've left the room.",
    keyMetric: { value: '3 sec', label: 'lead capture speed — vs 3 days manual CRM entry' },
    before: ["40% of paper cards lost within 48 hrs", "Manual CRM entry: 5+ hrs/week wasted", "No signal on who's actually warm", "1 in 3 follow-ups never happen"],
    after:  ["Every tap → auto-logged CRM lead instantly", "Zero data entry — reclaim 5 hrs/week", "Profile revisit alerts = warm signal", "95% of meetings become trackable pipeline"],
    stats: [
      { value: '3×',    label: 'Deal close rate' },
      { value: '$12K',  label: 'Monthly revenue added' },
      { value: '3 sec', label: 'Lead capture speed' },
    ],
    quote: 'I closed 3 enterprise deals in my first month. TapFlow pays for itself in one conversation.',
    author: 'Marcus Webb · Enterprise AE, Salesforce',
    tapt: 'Tapt tracks taps. TapFlow tracks revenue.',
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    icon: Home,
    headline: 'Turn Every Open House Into a Lead Machine',
    sub: "An open house with 60 visitors should produce 60 leads. With paper sign-ins you capture 15 — and follow up with 5. TapFlow captures all 60, with instant property detail sharing that lands while they're still at the door.",
    keyMetric: { value: '5×', label: 'more leads captured per open house vs paper sign-ins' },
    before: ["Paper sign-ins go unread after the event", "Buyers leave without your contact saved", "No tracking of which listings drive interest", "Follow-up is slow and manually painful"],
    after:  ["Every tap = buyer lead in CRM within 2 sec", "Instant property spec sheet shared on tap", "See which listings generate repeat views", "Automated follow-up sequences fire instantly"],
    stats: [
      { value: '5×',   label: 'Leads per open house' },
      { value: '89%',  label: 'Follow-up rate achieved' },
      { value: '+3',   label: 'Listings won per quarter' },
    ],
    quote: 'I used to lose half my open house leads. Now every tap becomes a client in my pipeline.',
    author: 'Diana Park · Top 1% Realtor, Keller Williams',
    tapt: "Tapt shows your profile. TapFlow shares your listing — and captures the buyer.",
  },
  {
    id: 'founders',
    label: 'Founders',
    icon: Lightbulb,
    headline: 'Know Which Investors Are Warm Before You Follow Up',
    sub: "At a 200-person investor event you can't tell who's genuinely interested. TapFlow's profile revisit alerts tell you exactly which 5 investors opened your profile twice — so you follow up in the right order, every time.",
    keyMetric: { value: '42%', label: 'investor reply rate when following up warm vs cold (23%)' },
    before: ["No way to rank interest after Demo Day", "Business cards in a pile — no context", "Spray-and-pray follow-up burns bridges", "Can't track which intro source is working"],
    after:  ["Revisit alerts identify the warmest leads", "Every contact auto-tagged with event context", "Priority queue: follow warm signals first", "Attribution: know which event source converts"],
    stats: [
      { value: '42%',  label: 'Investor reply rate' },
      { value: '6 wk', label: 'Avg seed round close time' },
      { value: '10×',  label: 'Network growth speed' },
    ],
    quote: 'Closed our $1.2M seed in 6 weeks. 3 of 5 checks came from TapFlow-tracked warm intros.',
    author: 'Jordan Lee · Founder, Buildfast (YC S24)',
    tapt: "Tapt can't tell you who's warm. TapFlow can.",
  },
]

export default function ROISection() {
  const [active, setActive] = useState(segments[0])

  return (
    <section className="py-28 bg-silver-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/50 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-5">
            Proven ROI by Role
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-4 tracking-tight">
            Built for High-Performers
          </h2>
          <p className="text-lg text-charcoal-light max-w-xl mx-auto">
            Pick your role. See exact metrics. Understand why TapFlow beats paper cards — and Tapt.
          </p>
        </div>

        {/* Segment switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl gap-1 raised bg-white/60">
            {segments.map(seg => {
              const Icon = seg.icon
              const isActive = active.id === seg.id
              return (
                <button key={seg.id} onClick={() => setActive(seg)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-charcoal text-white shadow-md'
                      : 'text-charcoal-light hover:text-charcoal hover:bg-black/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                  {seg.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content panel */}
        <div className="rounded-3xl p-8 lg:p-12 raised bg-white/70 transition-all duration-300">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left */}
            <div>
              {/* Key metric callout */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(185,28,28,0.08), rgba(185,28,28,0.04))',
                  border: '1px solid rgba(185,28,28,0.2)',
                }}>
                <Clock className="w-4 h-4 text-red-matte" strokeWidth={1.75} />
                <div>
                  <span className="text-2xl font-black text-red-matte mr-2">{active.keyMetric.value}</span>
                  <span className="text-xs text-charcoal-light">{active.keyMetric.label}</span>
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-charcoal mb-4 leading-tight">{active.headline}</h3>
              <p className="text-charcoal-light leading-relaxed mb-8">{active.sub}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {active.stats.map(s => (
                  <div key={s.label} className="rounded-2xl p-4 text-center etched" style={{ background: '#E8E8E8' }}>
                    <div className="text-2xl font-black text-red-matte">{s.value}</div>
                    <div className="text-[11px] text-silver-700 mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="rounded-2xl p-5 raised bg-white/80">
                <div className="text-red-matte text-3xl font-serif mb-2 opacity-40">"</div>
                <p className="text-charcoal text-sm font-medium leading-relaxed mb-4 italic">{active.quote}</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center text-white text-xs font-bold">
                    {active.author[0]}
                  </div>
                  <span className="text-xs text-silver-700 font-medium">{active.author}</span>
                </div>
              </div>

              {/* vs Tapt callout */}
              <div className="mt-4 flex items-center gap-2.5 rounded-xl px-4 py-2.5"
                style={{ background: 'rgba(185,28,28,0.05)', border: '1px solid rgba(185,28,28,0.12)' }}>
                <LineChart className="w-3.5 h-3.5 text-red-matte flex-shrink-0" strokeWidth={1.75} />
                <span className="text-xs text-charcoal-light font-medium">{active.tapt}</span>
              </div>

              <Link href="/pricing"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 btn-red font-semibold rounded-full text-sm transition-all hover:shadow-xl group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Right: Before / After */}
            <div className="grid grid-cols-2 gap-4">
              {/* Before */}
              <div className="rounded-2xl p-5 etched" style={{ background: '#E0E0E0' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-silver-600 rounded-full" />
                  <span className="text-[11px] font-bold text-silver-700 uppercase tracking-wider">Without TapFlow</span>
                </div>
                <ul className="space-y-3">
                  {active.before.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-silver-600 mt-0.5 text-xs flex-shrink-0">✗</span>
                      <span className="text-xs text-silver-800 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-2xl p-5 raised bg-white/80">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-red-matte rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold text-red-matte uppercase tracking-wider">With TapFlow</span>
                </div>
                <ul className="space-y-3">
                  {active.after.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-red-matte mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-charcoal leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
