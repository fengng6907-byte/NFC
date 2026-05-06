import { Zap, Target, BarChart2, Users } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Sharing',
    sub: 'Tap → Contact Saved',
    desc: 'One tap delivers your full professional profile — name, title, email, social links, calendar — to any phone in under a second. No app required.',
    outcomes: ['Works on any iPhone or Android', "No app needed on receiver's phone", 'Customisable in under 5 minutes'],
    metric: { value: '< 1s', label: 'to share your full profile' },
  },
  {
    icon: Target,
    title: 'Lead Capture',
    sub: 'Every Tap = A Live Lead',
    desc: 'TapFlow auto-logs who tapped your card — name, company, timestamp, location — and pushes the lead to your CRM the instant it happens.',
    outcomes: ['Auto-capture name + email', 'CRM sync: Salesforce, HubSpot', 'Slack + email tap alerts'],
    metric: { value: '100%', label: 'leads captured, none lost' },
  },
  {
    icon: BarChart2,
    title: 'Analytics',
    sub: 'Track. Measure. Optimise.',
    desc: 'Know exactly how many people tapped, which events drove leads, which profiles were revisited, and how contacts are converting into revenue.',
    outcomes: ['Tap heatmaps by time + location', 'Profile revisit alerts (= warm signals)', 'Revenue attribution per contact'],
    metric: { value: '47%', label: 'avg lift in lead conversion' },
  },
  {
    icon: Users,
    title: 'Team Management',
    sub: 'Deploy Across Your Org',
    desc: 'Roll TapFlow out to your entire sales team in minutes. Manage cards, enforce brand consistency, and see every rep\'s performance from one dashboard.',
    outcomes: ['Centralised card management', 'Role-based permissions', 'Team leaderboards + benchmarks'],
    metric: { value: '10×', label: 'faster team onboarding' },
  },
]

export default function Features() {
  return (
    <section id="features" className="py-28 bg-silver-lightest">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal text-[11px] font-bold text-white uppercase tracking-widest mb-5">
            Core Capabilities
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal mb-4 tracking-tight">
            Built Around Results,
            <br />Not Features
          </h2>
          <p className="text-lg text-charcoal-light max-w-xl mx-auto">
            Every capability maps directly to pipeline, revenue, or time saved. No bloat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-3xl p-8 group hover:shadow-lg transition-all duration-300 raised"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(145deg, #F5F5F5 0%, #EBEBEB 100%)'
                    : 'linear-gradient(145deg, #EDEDED 0%, #E2E2E2 100%)',
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    {/* Icon — charcoal square */}
                    <div className="w-11 h-11 rounded-xl bg-charcoal flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </div>
                    <div className="text-[10px] font-bold text-silver-700 uppercase tracking-widest mb-1">{f.sub}</div>
                    <h3 className="text-xl font-bold text-charcoal">{f.title}</h3>
                  </div>
                  {/* Metric */}
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-3xl font-black text-red-matte">{f.metric.value}</div>
                    <div className="text-[11px] text-silver-700 max-w-[90px] leading-tight">{f.metric.label}</div>
                  </div>
                </div>

                <p className="text-charcoal-light text-sm leading-relaxed mb-5">{f.desc}</p>

                <ul className="space-y-2">
                  {f.outcomes.map(o => (
                    <li key={o} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs text-charcoal-light font-medium">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
