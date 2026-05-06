const STEPS = [
  {
    number: '01',
    emoji: '👥',
    title: 'Create a group',
    description: "Name your group, choose a type (Trip, Home, Friends, Business), and invite members by email or QR code. They're in within seconds.",
  },
  {
    number: '02',
    emoji: '💸',
    title: 'Add expenses',
    description: 'Add any expense with title, amount, and who paid. Our AI auto-categorizes it. Choose equal split, percentages, or custom amounts.',
  },
  {
    number: '03',
    emoji: '📊',
    title: 'Track balances',
    description: 'Gold Dutchy calculates who owes who in real-time. Our smart algorithm minimizes the number of transactions needed to settle everything.',
  },
  {
    number: '04',
    emoji: '✅',
    title: 'Settle up',
    description: 'Mark debts as paid when you settle. Get your Golden Duck badge for on-time settlements. Your streak builds with every settled expense.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 bg-[#080F18]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
            <span className="text-sm text-white/60 font-medium">Simple as 1-2-3-4</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            How Gold Dutchy works
          </h2>
          <p className="mt-4 text-lg text-white/40 max-w-xl mx-auto">
            From first expense to final settlement in four easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold-500/30 to-transparent z-10" />
              )}

              <div className="relative p-6 rounded-3xl bg-white/4 border border-white/6 hover:bg-white/6 hover:border-white/10 transition-all group">
                {/* Step number */}
                <div className="text-xs font-bold text-gold-500/50 font-mono mb-3">{step.number}</div>

                {/* Emoji */}
                <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {step.emoji}
                </div>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual split demo */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white/4 border border-white/8">
          <div className="text-center mb-8">
            <p className="text-white/50 text-sm font-medium mb-1">Smart split example</p>
            <h3 className="text-white font-bold text-xl">$210 dinner → split 4 ways</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Input */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/8">
              <p className="text-white/40 text-xs mb-3 font-medium uppercase tracking-wider">Expense</p>
              <div className="text-3xl mb-3">🍜</div>
              <p className="text-white font-bold">Ramen Dinner</p>
              <p className="text-gold-400 text-2xl font-black mt-1">$210.00</p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs badge-gold px-2 py-0.5 rounded-lg font-medium">Equal split</span>
                <span className="text-xs text-white/40">4 people</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center text-gold-500 text-2xl font-bold">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-white/30 text-xs">Instant calculation</p>
              </div>
            </div>

            {/* Output */}
            <div className="space-y-2">
              {[
                { name: 'Alex', amount: '$52.50', status: 'paid', color: 'text-emerald-400' },
                { name: 'Jamie', amount: '$52.50', status: 'owes', color: 'text-rose-400' },
                { name: 'Sam',   amount: '$52.50', status: 'owes', color: 'text-rose-400' },
                { name: 'Morgan', amount: '$52.50', status: 'owes', color: 'text-rose-400' },
              ].map(person => (
                <div key={person.name} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/6">
                  <span className="text-white text-sm font-medium">{person.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${person.color}`}>{person.amount}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${person.status === 'paid' ? 'badge-green' : 'badge-red'}`}>
                      {person.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
