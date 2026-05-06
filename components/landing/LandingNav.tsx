'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-900/95 backdrop-blur-xl border-b border-white/8 shadow-navy' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gold-gradient rounded-xl flex items-center justify-center shadow-gold text-xl">
            🦆
          </div>
          <span className="font-bold text-white text-lg">Gold Dutchy</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {['Features', 'How it works', 'Pricing'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-white/60 hover:text-white transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/70 hover:text-white font-medium transition-colors">
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-gold-gradient text-navy-800 rounded-xl text-sm font-semibold shadow-gold hover:shadow-gold-lg transition-all hover:-translate-y-0.5"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-xl border-t border-white/8 px-4 py-4 space-y-3">
          {['Features', 'How it works', 'Pricing'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-sm text-white/70 hover:text-white py-2 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-white/8">
            <Link href="/login" className="text-sm text-center text-white/70 py-2 font-medium">Sign in</Link>
            <Link href="/register" className="px-4 py-2.5 bg-gold-gradient text-navy-800 rounded-xl text-sm font-semibold text-center">
              Get started free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
