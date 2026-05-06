import { Smartphone, UserCheck, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Tap Your Card',
    desc: 'Hold your TapFlow card near any smartphone. Your full professional profile appears in under a second — no app, no QR scan, no friction.',
    detail: 'Works via NFC on every modern iPhone (iOS 13+) and Android. Setup takes 5 minutes.',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Capture the Lead',
    desc: 'Your contact saves your info — and TapFlow logs them as a lead and syncs to your CRM automatically. Zero manual data entry.',
    detail: 'Integrates with Salesforce, HubSpot, Notion, and any CRM via webhook.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Track & Convert',
    desc: 'Open your dashboard to see every tap, lead, and conversion in real time. Profile revisit alerts tell you who to follow up with first.',
    detail: 'Full analytics: tap volume, revenue attribution, team leaderboards, weekly digests.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-silver-lightest">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/50 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-5">
            Simple by Design
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-4 tracking-tight">
            Three Steps. Zero Friction.
          </h2>
          <p className="text-lg text-charcoal-light max-w-xl mx-auto">
            TapFlow turns every in-person interaction into a data point — without adding a single step to your workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative rounded-3xl p-8 group hover:shadow-xl hover:scale-[1.01] transition-all duration-300 raised"
                style={{ background: 'linear-gradient(145deg, #F5F5F5 0%, #EBEBEB 100%)' }}
              >
                {/* Large ghost number */}
                <div className="text-8xl font-black text-black/[0.03] absolute top-4 right-5 select-none leading-none">{step.number}</div>

                {/* Icon block — dark square with brushed metal treatment */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform"
                  style={{
                    background: i === 0
                      ? '#B91C1C'
                      : i === 1
                      ? 'linear-gradient(145deg, #2A2A2A, #1A1A1A)'
                      : '#B91C1C',
                    boxShadow: i % 2 === 0
                      ? '0 8px 24px rgba(185,28,28,0.35)'
                      : '0 8px 24px rgba(0,0,0,0.25)',
                  }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>

                <div className="text-[10px] font-black text-silver-600 uppercase tracking-widest mb-2">Step {step.number}</div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{step.title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed mb-4">{step.desc}</p>

                <div className="flex items-start gap-2 rounded-xl p-3"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <svg className="w-3 h-3 text-silver-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[11px] text-silver-700 leading-relaxed">{step.detail}</span>
                </div>

                {/* Desktop connector */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-silver-400" />
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-14">
          <Link href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 btn-red font-bold rounded-full text-sm transition-all duration-200 hover:shadow-2xl group"
          >
            Start Free — Card Ships in 3 Days
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-xs text-silver-700 mt-3">No credit card required.</p>
        </div>
      </div>
    </section>
  )
}
