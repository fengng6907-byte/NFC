import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

const trust = [
  { icon: Zap, label: 'Up in 5 minutes' },
  { icon: Shield, label: 'No credit card required' },
  { icon: Clock, label: 'Card ships in 3 days' },
]

export default function FinalCTA() {
  return (
    <section className="py-28 bg-charcoal relative overflow-hidden">
      {/* Subtle red ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full blur-3xl" style={{ background: 'rgba(185,28,28,0.07)' }} />
      </div>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-matte/30 bg-red-matte/[0.08] text-[11px] font-bold text-red-matte uppercase tracking-widest mb-8">
          <div className="w-1.5 h-1.5 bg-red-matte rounded-full animate-pulse" />
          12,000+ professionals already using TapFlow
        </div>

        <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.02] tracking-tight mb-6">
          Stop Losing Contacts.
          <br />
          <span className="text-red-matte">Start Converting Them.</span>
        </h2>

        <p className="text-xl text-silver-600 max-w-xl mx-auto mb-12 leading-relaxed">
          Every meeting is a revenue opportunity. TapFlow makes sure you never let one slip through the cracks again.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 btn-red font-bold rounded-full text-base transition-all duration-200 hover:shadow-2xl group"
          >
            Get Your Card Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full text-base border border-white/[0.15] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-200"
          >
            Talk to Sales
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {trust.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-2 text-silver-600 text-sm">
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
