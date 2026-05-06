'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    badge: null,
    desc: 'Try TapFlow and experience the future of digital networking.',
    cta: 'Get Started Free',
    features: ['1 NFC card', 'Digital profile page', 'Basic contact sharing', 'Up to 50 taps/month', '7-day analytics', 'Email support'],
    locked: ['Lead capture', 'CRM sync', 'Team management', 'Revenue tracking'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: 10, annual: 8 },
    badge: 'Most Popular',
    desc: 'For professionals serious about turning every meeting into a lead.',
    cta: 'Start Pro Free',
    features: ['1 premium metal card', 'Unlimited taps', 'Full lead capture', 'Analytics dashboard', 'CRM integrations', 'Custom profile domain', 'Email + SMS notifications', 'Priority support', '90-day history'],
    locked: ['Team management', 'White-label'],
    highlighted: true,
  },
  {
    name: 'Business',
    price: { monthly: 30, annual: 24 },
    badge: 'For Teams',
    desc: 'For sales teams who want to track and scale performance across the org.',
    cta: 'Start Business Trial',
    features: ['Up to 10 members', 'Everything in Pro', 'Team analytics', 'Admin controls', 'White-label branding', 'Salesforce / HubSpot sync', 'Revenue attribution', 'Dedicated CSM', 'Unlimited history'],
    locked: [],
    highlighted: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-16 bg-silver-lightest">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full gap-1 raised" style={{ background: 'rgba(255,255,255,0.8)' }}>
            <button onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-charcoal text-white shadow-md' : 'text-charcoal-light hover:text-charcoal'}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-charcoal text-white shadow-md' : 'text-charcoal-light hover:text-charcoal'}`}>
              Annual
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-200 ${
                plan.highlighted ? 'scale-105' : ''
              } raised`}
              style={{
                background: plan.highlighted
                  ? 'linear-gradient(145deg, #1A1A1A, #2A2A2A)'
                  : 'linear-gradient(145deg, #F5F5F5 0%, #EBEBEB 100%)',
                border: plan.highlighted ? '1px solid rgba(185,28,28,0.4)' : undefined,
                boxShadow: plan.highlighted ? '0 20px 60px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.08) inset' : undefined,
              }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 btn-red text-xs font-bold rounded-full shadow-lg">
                    {plan.highlighted && <Zap className="w-3 h-3" strokeWidth={2} />}
                    {plan.badge}
                  </div>
                </div>
              )}

              {plan.highlighted && (
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-matte/60 to-transparent" />
              )}

              <div className="mb-6">
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlighted ? 'text-silver-600' : 'text-silver-700'}`}>{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <div className={`text-5xl font-black ${plan.highlighted ? 'text-white' : 'text-charcoal'}`}>${annual ? plan.price.annual : plan.price.monthly}</div>
                  {plan.price.monthly > 0 && <div className={`text-sm mb-2 ${plan.highlighted ? 'text-silver-600' : 'text-silver-700'}`}>/month</div>}
                </div>
                {annual && plan.price.monthly > 0 && (
                  <div className="text-xs text-emerald-600 font-semibold mb-2">
                    Billed ${plan.price.annual * 12}/year · Save ${(plan.price.monthly - plan.price.annual) * 12}/yr
                  </div>
                )}
                <p className={`text-sm leading-relaxed ${plan.highlighted ? 'text-silver-500' : 'text-charcoal-light'}`}>{plan.desc}</p>
              </div>

              <Link
                href="/contact"
                className={`block w-full text-center py-3 rounded-2xl font-semibold text-sm transition-all duration-200 mb-8 ${
                  plan.highlighted
                    ? 'btn-red'
                    : 'border border-black/[0.12] text-charcoal hover:border-red-matte/40 hover:bg-red-matte/[0.04] bg-white/60'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-red-matte' : 'bg-charcoal'}`}>
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-silver-400' : 'text-charcoal-light'}`}>{f}</span>
                  </div>
                ))}
                {plan.locked.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 opacity-30">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'border border-silver-700' : 'border border-silver-400 bg-silver-200'}`}>
                      <div className="w-1.5 h-px bg-current" />
                    </div>
                    <span className={`text-sm line-through ${plan.highlighted ? 'text-silver-600' : 'text-silver-700'}`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise row */}
        <div className="mt-6 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-5 raised"
          style={{ background: 'linear-gradient(145deg, #F5F5F5, #EBEBEB)' }}>
          <div>
            <div className="font-bold text-charcoal mb-1">Enterprise</div>
            <p className="text-sm text-charcoal-light">Custom NFC programs, white-label, volume pricing, SLAs, and dedicated support.</p>
          </div>
          <Link href="/contact" className="flex-shrink-0 px-5 py-2.5 border border-black/[0.12] text-charcoal text-sm font-semibold rounded-xl hover:border-red-matte/40 hover:bg-red-matte/[0.05] transition-all bg-white/60">
            Talk to Sales
          </Link>
        </div>

      </div>
    </section>
  )
}
