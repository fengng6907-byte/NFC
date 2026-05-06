import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'
import Comparison from '@/components/Comparison'
import ROICalculator from '@/components/ROICalculator'
import FinalCTA from '@/components/FinalCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — TapFlow',
  description: "Simple, transparent pricing for TapFlow. Start free. Upgrade when you're ready.",
}

export default function PricingPage() {
  return (
    <main className="overflow-x-hidden bg-silver-lightest">
      <Nav />

      {/* Page header */}
      <section className="pt-36 pb-16 bg-silver-lightest text-center relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(185,28,28,0.04)' }} />
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/50 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-6">
            Pricing
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-charcoal mb-5 tracking-tight">
            Invest Less Than a Coffee.
            <br />
            <span className="text-red-matte">Get Year-Round Leads.</span>
          </h1>
          <p className="text-lg text-charcoal-light max-w-lg mx-auto">
            Start free. Ship your card in 3 days. Upgrade when the ROI speaks for itself.
          </p>
        </div>
      </section>

      <Pricing />
      <ROICalculator />
      <Comparison />
      <FinalCTA />
      <Footer />
    </main>
  )
}
