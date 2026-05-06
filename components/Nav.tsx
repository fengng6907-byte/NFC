'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Menu, X, Home, Tag, Mail } from 'lucide-react'

const links = [
  { label: 'Home',    href: '/',        icon: Home },
  { label: 'Pricing', href: '/pricing', icon: Tag  },
  { label: 'Contact', href: '/contact', icon: Mail },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-silver shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-red-matte rounded-lg blur opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative w-8 h-8 bg-red-matte rounded-lg flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <span className="text-[15px] font-bold tracking-tight text-charcoal">TapFlow</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'text-charcoal-light hover:bg-black/[0.05] hover:text-charcoal'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                {label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/pricing"
            className="btn-red px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg"
          >
            Get Your Card
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-charcoal-light hover:bg-black/[0.06] transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          background: 'rgba(240,240,240,0.95)',
          backdropFilter: 'blur(28px)',
          borderBottom: '1px solid rgba(180,180,180,0.4)',
        }}
      >
        <div className="px-6 py-4 space-y-1">
          {links.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:bg-black/[0.05] transition-colors"
            >
              <Icon className="w-4 h-4 text-silver-700" strokeWidth={1.5} />
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-black/[0.06]">
            <Link
              href="/pricing"
              className="block w-full text-center px-4 py-3 btn-red text-sm font-semibold rounded-full transition-all"
            >
              Get Your Card
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
