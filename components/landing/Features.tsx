const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-Powered Categorization',
    description: 'Our AI reads your expense title and instantly categorizes it — food, transport, accommodation, and more. No manual tagging needed.',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: '📊',
    title: 'Visual Debt Graphs',
    description: 'See who owes who with beautiful interactive charts. Understand your spending patterns at a glance with stunning analytics.',
    color: 'from-gold-500/20 to-amber-500/10',
    border: 'border-gold-500/20',
  },
  {
    icon: '⚡',
    title: 'Smart Split Engine',
    description: 'Equal, percentage, exact amount, or custom shares — our engine handles any split scenario and minimizes the number of transactions.',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: '📱',
    title: 'QR & NFC Quick-Add',
    description: 'At the restaurant? Generate a QR code for your group to instantly join and split the bill. One tap to add expenses on-the-go.',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: '🏆',
    title: 'Gamification & Badges',
    description: "Earn badges for settling debts on time, maintaining streaks, and reaching milestones. The Golden Duck awaits the most diligent settlers.",
    color: 'from-rose-500/20 to-pink-500/10',
    border: 'border-rose-500/20',
  },
  {
    icon: '🔔',
    title: 'Smart Reminders',
    description: 'Intelligent nudges based on your behavior — not annoying spam. Get reminded when debts have been outstanding too long.',
    color: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500/20',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-4">
            <span className="text-sm text-gold-400 font-medium">Everything you need</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Built different.<br />
            <span className="text-gold-gradient bg-clip-text bg-gold-gradient [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Designed for real life.
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Every feature is crafted to eliminate the awkwardness of shared money. From quick splits to final settlements.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`relative p-6 rounded-3xl bg-gradient-to-br ${feature.color} border ${feature.border} backdrop-blur-sm group hover:scale-[1.02] transition-all duration-200`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
