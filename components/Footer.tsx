import { Zap } from 'lucide-react'
import Link from 'next/link'

const links = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Interactive Demo', href: '/#demo' },
    { label: 'Analytics', href: '/#features' },
  ],
  Company: [
    { label: 'About', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms of Service', href: '/contact' },
    { label: 'Cookie Policy', href: '/contact' },
  ],
  Integrations: [
    { label: 'Salesforce', href: '/pricing' },
    { label: 'HubSpot', href: '/pricing' },
    { label: 'Slack', href: '/pricing' },
    { label: 'Zapier', href: '/pricing' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-matte rounded-lg flex items-center justify-center shadow-md">
                <Zap className="w-4 h-4 text-white" strokeWidth={1.75} />
              </div>
              <span className="text-base font-bold text-white tracking-tight">TapFlow</span>
            </Link>
            <p className="text-silver-600 text-sm leading-relaxed max-w-[200px]">
              The digital identity and lead generation platform for modern professionals.
            </p>
            <div className="flex gap-2 mt-6">
              {['𝕏', 'in', 'f'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-silver-600 hover:text-white transition-colors text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs font-bold text-silver-700 uppercase tracking-widest mb-4">{category}</div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-silver-600 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs text-silver-800">© 2025 TapFlow, Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-silver-800">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
