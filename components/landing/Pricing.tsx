const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for small groups and casual use.',
    features: [
      'Up to 3 groups',
      'Up to 10 members per group',
      'Unlimited expenses',
      'Equal & percentage splits',
      'Basic analytics',
      'Email notifications',
    ],
    cta: 'Get started free',
    ctaHref: '/register',
    highlight: false,
  },
  {
    name: 'Gold',
    price: '$6',
    period: 'per month',
    description: 'For power users who split seriously.',
    features: [
      'Unlimited groups',
      'Unlimited members',
      'AI auto-categorization',
      'All split methods',
      'Advanced analytics & charts',
      'QR & NFC quick-add',
      'Receipt photo uploads',
      'Smart reminders',
      'CSV/PDF export',
      'Priority support',
    ],
    cta: 'Start Gold — 14 days free',
    ctaHref: '/register?plan=gold',
    highlight: true,
  },
  {
    name: 'Business',
    price: '$14',
    period: 'per user/month',
    description: 'For teams and organizations.',
    features: [
      'Everything in Gold',
      'Business expense categories',
      'Invoice & receipt management',
      'Team admin controls',
      'API access',
      'Audit logs',
      'SSO / SAML',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    ctaHref: '/contact',
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-4 bg-navy-900">
      {/* Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-lg text-white/40">No hidden fees. No debt shame. Cancel anytime.</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 sm:p-8 rounded-3xl flex flex-col ${
                plan.highlight
                  ? 'bg-gold-gradient text-navy-800 shadow-gold-lg scale-[1.03]'
                  : 'bg-white/5 border border-white/8 text-white'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-navy-800 text-gold-400 text-xs font-bold rounded-full border border-gold-500/30">
                  MOST POPULAR
                </div>
              )}

              <div>
                <p className={`font-bold text-sm mb-1 ${plan.highlight ? 'text-navy-700' : 'text-white/50'}`}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-navy-600' : 'text-white/40'}`}>/{plan.period}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-navy-700' : 'text-white/40'}`}>{plan.description}</p>
              </div>

              <ul className="flex-1 space-y-2.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <span className={`text-sm ${plan.highlight ? 'text-navy-700' : 'text-gold-500'}`}>✓</span>
                    <span className={plan.highlight ? 'text-navy-800' : 'text-white/70'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`block text-center px-6 py-3 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                  plan.highlight
                    ? 'bg-navy-800 text-white hover:bg-navy-700 shadow-navy'
                    : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Monetization note */}
        <p className="text-center text-white/20 text-xs mt-8">
          Future plans: Fintech API integrations, instant bank transfers, business expense reports, and white-label solutions.
        </p>
      </div>
    </section>
  )
}
