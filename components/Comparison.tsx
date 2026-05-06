import { Check, X, Minus } from 'lucide-react'

const features = [
  { label: 'Share contact instantly', paper: false, qr: 'partial', tapflow: true },
  { label: 'Works without internet', paper: true, qr: false, tapflow: true },
  { label: 'No app needed', paper: true, qr: 'partial', tapflow: true },
  { label: 'Auto lead capture', paper: false, qr: false, tapflow: true },
  { label: 'CRM sync', paper: false, qr: false, tapflow: true },
  { label: 'Analytics & tracking', paper: false, qr: false, tapflow: true },
  { label: 'Revenue attribution', paper: false, qr: false, tapflow: true },
  { label: 'Update info instantly', paper: false, qr: 'partial', tapflow: true },
  { label: 'Team management', paper: false, qr: false, tapflow: true },
  { label: 'Professional impression', paper: 'partial', qr: 'partial', tapflow: true },
]

function Cell({ value, highlight = false }: { value: boolean | string; highlight?: boolean }) {
  if (value === true) return (
    <div className="flex justify-center">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${highlight ? 'bg-charcoal' : 'bg-charcoal/10 border border-charcoal/20'}`}>
        <Check className={`w-3.5 h-3.5 stroke-[2.5] ${highlight ? 'text-white' : 'text-charcoal'}`} />
      </div>
    </div>
  )
  if (value === false) return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-silver-300 border border-silver-400">
        <X className="w-3.5 h-3.5 text-silver-600" />
      </div>
    </div>
  )
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 bg-amber-100 border border-amber-300 rounded-full flex items-center justify-center">
        <Minus className="w-3.5 h-3.5 text-amber-600" />
      </div>
    </div>
  )
}

export default function Comparison() {
  return (
    <section className="py-20 bg-silver-200">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/50 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-5">
            Why TapFlow Wins
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-charcoal mb-4 tracking-tight">Not All Cards Are Equal</h2>
          <p className="text-charcoal-light">Paper cards are dead. QR codes are halfway there. TapFlow is the complete solution.</p>
        </div>

        <div className="rounded-2xl overflow-hidden raised" style={{ background: 'linear-gradient(145deg, #F5F5F5, #EBEBEB)' }}>
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-black/[0.06]" style={{ background: 'rgba(255,255,255,0.5)' }}>
            <div className="p-4 text-xs font-bold text-silver-700 uppercase tracking-wider">Capability</div>
            {[
              { label: 'Paper Card', sub: 'Old school' },
              { label: 'QR Code', sub: 'Halfway there' },
              { label: 'TapFlow', sub: 'Complete', highlight: true },
            ].map((col) => (
              <div key={col.label} className={`p-4 text-center relative`}
                style={col.highlight ? { background: 'rgba(185,28,28,0.06)', borderLeft: '1px solid rgba(185,28,28,0.15)' } : {}}>
                {col.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-matte/50 to-transparent" />
                )}
                <div className={`font-bold text-sm ${col.highlight ? 'text-red-matte' : 'text-silver-700'}`}>{col.label}</div>
                <div className={`text-xs mt-0.5 ${col.highlight ? 'text-red-matte/50' : 'text-silver-500'}`}>{col.sub}</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className="grid grid-cols-4 hover:bg-black/[0.02] transition-colors"
              style={{ borderBottom: i < features.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
            >
              <div className="p-4 text-sm text-charcoal-light flex items-center">{feature.label}</div>
              <div className="p-4 flex items-center"><Cell value={feature.paper} /></div>
              <div className="p-4 flex items-center"><Cell value={feature.qr} /></div>
              <div className="p-4 flex items-center" style={{ background: 'rgba(185,28,28,0.04)', borderLeft: '1px solid rgba(185,28,28,0.08)' }}>
                <Cell value={feature.tapflow} highlight />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-5 text-xs text-silver-700">
          {[
            { icon: <Check className="w-3 h-3 text-charcoal" />, label: 'Supported', bg: 'bg-charcoal/10 border-charcoal/20' },
            { icon: <Minus className="w-3 h-3 text-amber-600" />, label: 'Partial', bg: 'bg-amber-100 border-amber-300' },
            { icon: <X className="w-3 h-3 text-silver-600" />, label: 'Not supported', bg: 'bg-silver-300 border-silver-400' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${item.bg}`}>{item.icon}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
