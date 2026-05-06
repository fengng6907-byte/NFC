const TESTIMONIALS = [
  {
    name: 'Priya S.',
    role: 'Used for a 3-week Europe trip',
    avatar: 'priya',
    quote: "Gold Dutchy saved our friendship. We tracked 200+ expenses across 8 countries without a single argument. The AI categorization is magic.",
    rating: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Shared apartment in NYC',
    avatar: 'marcus',
    quote: "Finally replaced that chaotic spreadsheet. Our roommate group uses it daily for rent, groceries, utilities. The balance graph makes it crystal clear.",
    rating: 5,
  },
  {
    name: 'Aiko K.',
    role: 'Startup team',
    avatar: 'aiko',
    quote: "We expense everything through Gold Dutchy now. The business group type is perfect. QR code expense sharing at team lunches is a game changer.",
    rating: 5,
  },
  {
    name: 'Leo B.',
    role: 'Weekend getaways',
    avatar: 'leo',
    quote: "The Golden Duck gamification got our whole friend group actually excited to settle debts. 7-day streak and counting! The design is stunning too.",
    rating: 5,
  },
  {
    name: 'Zoe H.',
    role: 'Festival & event organizer',
    avatar: 'zoe',
    quote: "Managing event costs for 20+ people used to be a nightmare. Now I generate a QR code, everyone joins the group, and balances update live.",
    rating: 5,
  },
  {
    name: 'Daniel R.',
    role: 'Frequent traveler',
    avatar: 'daniel',
    quote: "Multi-currency support and the simplified debt algorithm means I only need to make 2 payments instead of 12 after every trip. Brilliant engineering.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#080F18] to-navy-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Loved by groups<br />
            <span className="text-gold-gradient bg-clip-text bg-gold-gradient [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              everywhere
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/40">From roommates to road-trippers — Gold Dutchy keeps peace.</p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-3xl bg-white/4 border border-white/6 hover:bg-white/6 hover:border-white/10 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold-500 text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
