'use client'
import Link from 'next/link'

const STAT_ITEMS = [
  { value: '$2.4M+', label: 'Expenses tracked' },
  { value: '18K+',   label: 'Active users' },
  { value: '99.9%',  label: 'Uptime' },
  { value: '4.9★',   label: 'App rating' },
]

const AVATARS = ['alex', 'jamie', 'sam', 'morgan', 'riley']

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Pill badge */}
      <div className="relative mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
        <span className="text-sm text-gold-400 font-medium">Now with AI-powered categorization</span>
      </div>

      {/* Headline */}
      <h1 className="relative text-center text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl leading-[1.05]">
        <span className="text-white">Split bills.</span>
        <br />
        <span className="text-gold-gradient bg-clip-text bg-gold-gradient [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
          Stay golden.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="relative mt-6 text-center text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed">
        Gold Dutchy makes shared expenses effortless. Track group costs, split fairly, and settle debts instantly — with AI insights and beautiful analytics.
      </p>

      {/* CTA buttons */}
      <div className="relative mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/register"
          className="px-8 py-4 bg-gold-gradient text-navy-800 font-bold rounded-2xl text-base shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-1 hover:scale-105"
        >
          Start splitting free 🦆
        </Link>
        <Link
          href="/dashboard"
          className="px-8 py-4 bg-white/8 text-white font-semibold rounded-2xl text-base border border-white/15 hover:bg-white/12 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
        >
          View demo dashboard →
        </Link>
      </div>

      {/* Social proof avatars */}
      <div className="relative mt-8 flex items-center gap-3">
        <div className="flex -space-x-2.5">
          {AVATARS.map((seed, i) => (
            <div key={seed} className="w-9 h-9 rounded-full border-2 border-navy-800 overflow-hidden" style={{ zIndex: AVATARS.length - i }}>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-white/50">
          <span className="text-white font-semibold">18,000+</span> people splitting smarter
        </p>
      </div>

      {/* Hero app mockup */}
      <div className="relative mt-16 w-full max-w-5xl">
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-1 shadow-navy-lg">
          {/* Browser chrome */}
          <div className="bg-navy-800/80 rounded-2xl overflow-hidden">
            {/* Browser bar */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 bg-white/5 rounded-lg px-3 py-1 text-xs text-white/30 font-mono">
                app.golddutchy.com/dashboard
              </div>
            </div>

            {/* App screenshot preview */}
            <div className="p-4 grid grid-cols-3 gap-3">
              {/* Balance card */}
              <div className="col-span-3 sm:col-span-1 bg-gold-gradient rounded-2xl p-4">
                <p className="text-navy-800/60 text-xs font-medium">Net Balance</p>
                <p className="text-navy-800 text-3xl font-black mt-1">$84.33</p>
                <p className="text-navy-800/70 text-xs mt-1">↑ You're owed money</p>
                <div className="mt-3 flex gap-2">
                  <div className="bg-navy-800/10 rounded-lg px-2 py-1 text-[10px] text-navy-800 font-medium">$284 owed to you</div>
                  <div className="bg-navy-800/10 rounded-lg px-2 py-1 text-[10px] text-navy-800 font-medium">$199 you owe</div>
                </div>
              </div>

              {/* Group cards */}
              {[
                { emoji: '✈️', name: 'Tokyo Trip', amount: '-$127', color: 'bg-amber-500/20 border-amber-500/20' },
                { emoji: '🏠', name: 'Apartment', amount: '+$84', color: 'bg-violet-500/20 border-violet-500/20' },
              ].map(g => (
                <div key={g.name} className={`hidden sm:block col-span-1 ${g.color} border rounded-2xl p-4`}>
                  <div className="text-2xl mb-2">{g.emoji}</div>
                  <p className="text-white/70 text-xs">{g.name}</p>
                  <p className="text-white font-bold text-lg mt-0.5">{g.amount}</p>
                </div>
              ))}

              {/* Recent expenses table */}
              <div className="col-span-3 bg-white/5 rounded-2xl p-4">
                <p className="text-white/50 text-xs font-medium mb-3">Recent Expenses</p>
                <div className="space-y-2.5">
                  {[
                    { emoji: '🍜', title: 'Shinjuku Ramen', who: 'Jamie paid', amount: '$210.50', you: '-$52.63', cat: 'FOOD' },
                    { emoji: '🏨', title: 'Shibuya Hotel', who: 'Sam paid', amount: '$1,200', you: '-$300', cat: 'STAY' },
                    { emoji: '🚕', title: 'Narita Taxi', who: 'You paid', amount: '$120', you: '+$90', cat: 'TAXI' },
                  ].map((e, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-base shrink-0">{e.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{e.title}</p>
                        <p className="text-white/40 text-[10px]">{e.who} · {e.amount}</p>
                      </div>
                      <span className={`text-xs font-bold ${e.you.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{e.you}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating stat badges */}
        <div className="absolute -top-4 -left-4 hidden lg:flex bg-white rounded-2xl shadow-card px-4 py-3 items-center gap-3 animate-float">
          <div className="w-8 h-8 bg-emerald-500/15 rounded-xl flex items-center justify-center text-emerald-500">✓</div>
          <div>
            <p className="text-navy-800 font-bold text-sm">$340 settled</p>
            <p className="text-gray-400 text-xs">Just now</p>
          </div>
        </div>

        <div className="absolute -bottom-4 -right-4 hidden lg:flex bg-white rounded-2xl shadow-card px-4 py-3 items-center gap-3" style={{ animation: 'float 4s ease-in-out infinite 1s' }}>
          <div className="text-2xl">🦆</div>
          <div>
            <p className="text-navy-800 font-bold text-sm">7-day streak!</p>
            <p className="text-gray-400 text-xs">Golden Duck badge</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative mt-16 w-full max-w-4xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STAT_ITEMS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="text-sm text-white/40 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
