'use client'

import { useState, useMemo } from 'react'
import { DollarSign, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ROICalculator() {
  const [meetings, setMeetings] = useState(10)
  const [conversion, setConversion] = useState(15)
  const [dealValue, setDealValue] = useState(5000)

  const results = useMemo(() => {
    const totalMeetings = meetings * 52
    const currentLeads = totalMeetings * 0.4
    const tapflowLeads = totalMeetings * 0.95
    const currentRevenue = currentLeads * (conversion / 100) * dealValue
    const tapflowRevenue = tapflowLeads * (conversion / 100) * dealValue
    const missed = tapflowRevenue - currentRevenue
    return {
      missed: Math.round(missed),
      monthlyMissed: Math.round(missed / 12),
      tapflowRevenue: Math.round(tapflowRevenue),
      roi: Math.round((missed / 120) * 100),
      additionalLeads: Math.round(tapflowLeads - currentLeads),
    }
  }, [meetings, conversion, dealValue])

  const fmt = (n: number) =>
    n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`

  const SliderLabel = ({ label, val, color }: { label: string; val: string; color: string }) => (
    <div className="flex justify-between items-center mb-3">
      <label className="text-sm font-medium text-charcoal-light">{label}</label>
      <span className={`font-bold text-lg ${color}`}>{val}</span>
    </div>
  )

  return (
    <section className="py-20 bg-silver-lightest">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white/50 text-[11px] font-bold text-silver-800 uppercase tracking-widest mb-5">
            ROI Calculator
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-charcoal mb-4 tracking-tight">
            How Much Are You Leaving on the Table?
          </h2>
          <p className="text-charcoal-light max-w-xl mx-auto">Drag the sliders to see your exact revenue miss.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Inputs */}
          <div className="rounded-3xl p-8 space-y-8 raised" style={{ background: 'linear-gradient(145deg, #F5F5F5 0%, #EBEBEB 100%)' }}>
            <div className="text-sm font-bold text-charcoal">Your Numbers</div>

            {[
              { label: 'Meetings / week', val: String(meetings), color: 'text-red-matte', min: 1, max: 50, step: 1, value: meetings, onChange: setMeetings, accent: 'accent-red-700' },
              { label: 'Close rate', val: `${conversion}%`, color: 'text-amber-600', min: 1, max: 50, step: 1, value: conversion, onChange: setConversion, accent: 'accent-amber-500' },
            ].map((s) => (
              <div key={s.label}>
                <SliderLabel label={s.label} val={s.val} color={s.color} />
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                  onChange={(e) => s.onChange(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${s.accent}`}
                  style={{ background: 'rgba(0,0,0,0.1)' }} />
                <div className="flex justify-between text-xs text-silver-600 mt-1">
                  <span>{s.min}</span><span>{s.max}{s.label.includes('rate') ? '%' : ''}</span>
                </div>
              </div>
            ))}

            <div>
              <SliderLabel label="Avg deal value" val={fmt(dealValue)} color="text-emerald-700" />
              <input type="range" min={500} max={100000} step={500} value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-600"
                style={{ background: 'rgba(0,0,0,0.1)' }} />
              <div className="flex justify-between text-xs text-silver-600 mt-1"><span>$500</span><span>$100K</span></div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3">
            <div className="rounded-3xl p-7 raised" style={{ background: 'linear-gradient(135deg, rgba(185,28,28,0.08), rgba(185,28,28,0.04))', border: '1px solid rgba(185,28,28,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-matte" strokeWidth={1.75} />
                <span className="text-red-matte font-semibold text-sm">Revenue Missing / Year</span>
              </div>
              <div className="text-5xl font-black text-charcoal mb-1">{fmt(results.missed)}</div>
              <div className="text-red-matte/60 text-sm">{fmt(results.monthlyMissed)}/month in uncaptured leads</div>
            </div>

            <div className="rounded-3xl p-5 raised" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.04))', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-700" strokeWidth={1.75} />
                <span className="text-emerald-700 font-semibold text-sm">With TapFlow</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-2xl font-black text-charcoal">{fmt(results.tapflowRevenue)}</div>
                  <div className="text-emerald-700/70 text-xs">Potential yearly revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-charcoal">+{results.additionalLeads}</div>
                  <div className="text-emerald-700/70 text-xs">Additional leads/year</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-5 raised" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.07), rgba(79,70,229,0.03))', border: '1px solid rgba(79,70,229,0.18)' }}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-indigo-600" strokeWidth={1.75} />
                <span className="text-indigo-600 font-semibold text-sm">ROI on TapFlow Pro ($10/mo)</span>
              </div>
              <div className="text-4xl font-black text-charcoal">{results.roi.toLocaleString()}×</div>
              <div className="text-indigo-600/60 text-sm mt-1">Return on your investment</div>
            </div>

            <Link href="/contact"
              className="flex items-center justify-center gap-2 w-full py-4 btn-red font-bold rounded-2xl transition-colors group">
              Stop Leaving Money Behind
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
