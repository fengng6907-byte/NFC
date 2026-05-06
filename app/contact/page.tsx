import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { Mail, Phone, MapPin, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — TapFlow',
  description: 'Get in touch with the TapFlow team. Sales enquiries, enterprise plans, or product questions.',
}

const infoItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'fengng6907@gmail.com',
    href: 'mailto:fengng6907@gmail.com',
  },
  {
    icon: Phone,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
  {
    icon: MapPin,
    label: 'Availability',
    value: 'Mon – Fri, 9am – 6pm EST',
    href: null,
  },
]

const faqs = [
  { q: 'How long does delivery take?', a: 'Premium metal cards ship within 3 business days worldwide.' },
  { q: 'Can I update my profile anytime?', a: 'Yes — changes go live instantly without needing a new card.' },
  { q: 'Does it work on all phones?', a: 'TapFlow works on all NFC-enabled iPhones and Android phones. No app required.' },
  { q: 'Can I use TapFlow for my whole team?', a: "Absolutely. Our Business plan covers up to 10 members, and we offer Enterprise plans for larger orgs." },
]

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-silver-lightest">
      <Nav />

      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(185,28,28,0.03)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/50 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-6">
            Get in Touch
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-charcoal mb-5 tracking-tight">
            Let's Talk Business
          </h1>
          <p className="text-lg text-charcoal-light max-w-lg mx-auto">
            Whether you're a solo professional or running a 500-person sales team — we'd love to help.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Left sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact info card */}
              <div className="rounded-3xl p-8 raised" style={{ background: 'linear-gradient(145deg, #F5F5F5 0%, #EBEBEB 100%)' }}>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center shadow-md">
                    <Zap className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm">TapFlow Support</div>
                    <div className="text-xs text-silver-700">Response guaranteed</div>
                  </div>
                </div>

                <div className="space-y-5">
                  {infoItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
                          <Icon className="w-4 h-4 text-silver-700" strokeWidth={1.75} />
                        </div>
                        <div>
                          <div className="text-xs text-silver-600 mb-0.5">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} className="text-sm font-medium text-charcoal hover:text-red-matte transition-colors">
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-sm font-medium text-charcoal">{item.value}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="my-7 border-t border-black/[0.07]" />

                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-charcoal-light">Currently accepting new clients</span>
                </div>
              </div>

              {/* FAQ */}
              <div className="rounded-3xl p-8 raised" style={{ background: 'linear-gradient(145deg, #F5F5F5 0%, #EBEBEB 100%)' }}>
                <div className="text-sm font-bold text-charcoal mb-6">Quick Answers</div>
                <div className="space-y-5">
                  {faqs.map((faq) => (
                    <div key={faq.q}>
                      <div className="text-sm font-semibold text-charcoal mb-1">{faq.q}</div>
                      <div className="text-xs text-charcoal-light leading-relaxed">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl p-8 lg:p-10 raised relative" style={{ background: 'linear-gradient(145deg, #F8F8F8 0%, #F0F0F0 100%)' }}>
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-red-matte/30 to-transparent" />

                <div className="mb-8">
                  <h2 className="text-2xl font-black text-charcoal mb-2">Send a Message</h2>
                  <p className="text-charcoal-light text-sm">Tell us about your team size, use case, or any questions you have.</p>
                </div>

                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
