'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { sendContactEmail, type FormState } from '@/app/contact/actions'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const roles = ['Salesperson', 'Real Estate Agent', 'Founder / Entrepreneur', 'Sales Manager', 'Marketing', 'Other']

const inputClass = `w-full px-4 py-3.5 rounded-xl text-charcoal text-sm placeholder-silver-500 outline-none transition-all duration-200 focus:border-red-matte/50 focus:ring-2 focus:ring-red-matte/10`

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 py-4 btn-red font-bold rounded-2xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Send Message
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
        </>
      )}
    </button>
  )
}

export default function ContactForm() {
  const [state, action] = useFormState<FormState, FormData>(sendContactEmail, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={action} className="space-y-4">

      {/* Name + Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-silver-700 uppercase tracking-wider mb-2">Full Name *</label>
          <input
            name="name"
            required
            placeholder="Alex Johnson"
            className={inputClass}
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-silver-700 uppercase tracking-wider mb-2">Work Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="alex@company.com"
            className={inputClass}
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)' }}
          />
        </div>
      </div>

      {/* Company + Role row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-silver-700 uppercase tracking-wider mb-2">Company</label>
          <input
            name="company"
            placeholder="Acme Corp"
            className={inputClass}
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)' }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-silver-700 uppercase tracking-wider mb-2">Your Role</label>
          <select
            name="role"
            className={inputClass + ' cursor-pointer'}
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)' }}
          >
            <option value="">Select role…</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-silver-700 uppercase tracking-wider mb-2">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your team, use case, or what you'd like to know…"
          className={inputClass + ' resize-none'}
          style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)' }}
        />
      </div>

      {/* Status messages */}
      {state && (
        <div
          className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
            state.success
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {state.success
            ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          }
          {state.message}
        </div>
      )}

      {/* Submit */}
      <SubmitButton />

      <p className="text-xs text-center text-silver-700">
        We respond within 24 hours · Or email us at{' '}
        <a href="mailto:fengng6907@gmail.com" className="text-charcoal-light hover:text-red-matte transition-colors">
          fengng6907@gmail.com
        </a>
      </p>
    </form>
  )
}
