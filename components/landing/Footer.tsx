import Link from 'next/link'

const LINKS = {
  Product: ['Features', 'Pricing', 'API', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
  Support: ['Help Center', 'Contact', 'Status', 'Community'],
}

export function Footer() {
  return (
    <footer className="bg-[#050B13] border-t border-white/5 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gold-gradient rounded-xl flex items-center justify-center text-xl shadow-gold">
                🦆
              </div>
              <span className="font-bold text-white text-base">Gold Dutchy</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              The intelligent expense-sharing platform that keeps groups happy and balances clear.
            </p>
            <div className="mt-4 flex gap-3">
              {['𝕏', '📘', '💼', '📸'].map((icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition-all border border-white/5">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-white font-semibold text-sm mb-3">{category}</p>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/35 text-sm hover:text-white/70 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © 2025 Gold Dutchy Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white/20 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
