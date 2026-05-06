import type { SplitMethod } from '@/types'

// ─── Expense Split Calculator ─────────────────────────────────────────────────

export interface SplitParticipant {
  userId: string
  name: string
  amount?: number
  percent?: number
  shares?: number
  locked?: boolean
}

export interface SplitResult {
  userId: string
  amount: number
  percent: number
}

/**
 * Calculate how to split an expense among participants.
 */
export function calculateSplit(
  total: number,
  participants: SplitParticipant[],
  method: SplitMethod
): SplitResult[] {
  if (participants.length === 0) return []

  switch (method) {
    case 'EQUAL':
      return splitEqual(total, participants)
    case 'PERCENTAGE':
      return splitByPercentage(total, participants)
    case 'EXACT':
      return splitByExact(total, participants)
    case 'SHARES':
      return splitByShares(total, participants)
    default:
      return splitEqual(total, participants)
  }
}

function splitEqual(total: number, participants: SplitParticipant[]): SplitResult[] {
  const n = participants.length
  const base = Math.floor((total / n) * 100) / 100
  const remainder = Math.round((total - base * n) * 100) / 100

  return participants.map((p, i) => ({
    userId: p.userId,
    amount: i === 0 ? Math.round((base + remainder) * 100) / 100 : base,
    percent: Math.round((100 / n) * 100) / 100,
  }))
}

function splitByPercentage(total: number, participants: SplitParticipant[]): SplitResult[] {
  const totalPercent = participants.reduce((sum, p) => sum + (p.percent ?? 0), 0)

  if (Math.abs(totalPercent - 100) > 0.01) {
    // Auto-distribute remaining percent equally
    const unassigned = participants.filter(p => !p.percent || p.percent === 0)
    const remaining = 100 - participants.reduce((sum, p) => sum + (p.percent ?? 0), 0)
    const eachPercent = unassigned.length > 0 ? remaining / unassigned.length : 0

    return participants.map(p => {
      const percent = p.percent ?? eachPercent
      return {
        userId: p.userId,
        amount: Math.round((total * percent / 100) * 100) / 100,
        percent,
      }
    })
  }

  return participants.map(p => ({
    userId: p.userId,
    amount: Math.round((total * (p.percent ?? 0) / 100) * 100) / 100,
    percent: p.percent ?? 0,
  }))
}

function splitByExact(total: number, participants: SplitParticipant[]): SplitResult[] {
  const assigned = participants.reduce((sum, p) => sum + (p.amount ?? 0), 0)
  const remaining = total - assigned
  const unassigned = participants.filter(p => !p.amount || p.amount === 0)

  return participants.map(p => {
    const amount = p.amount && p.amount > 0
      ? p.amount
      : unassigned.length > 0 ? remaining / unassigned.length : 0

    return {
      userId: p.userId,
      amount: Math.round(amount * 100) / 100,
      percent: Math.round((amount / total) * 10000) / 100,
    }
  })
}

function splitByShares(total: number, participants: SplitParticipant[]): SplitResult[] {
  const totalShares = participants.reduce((sum, p) => sum + (p.shares ?? 1), 0)

  return participants.map(p => {
    const shares = p.shares ?? 1
    const amount = (total * shares) / totalShares
    return {
      userId: p.userId,
      amount: Math.round(amount * 100) / 100,
      percent: Math.round((shares / totalShares) * 10000) / 100,
    }
  })
}

/**
 * Validate a split to ensure amounts sum to total.
 */
export function validateSplit(
  total: number,
  results: SplitResult[],
  tolerance = 0.02
): { valid: boolean; diff: number } {
  const sum = results.reduce((acc, r) => acc + r.amount, 0)
  const diff = Math.abs(sum - total)
  return { valid: diff <= tolerance, diff: Math.round(diff * 100) / 100 }
}

/**
 * Auto-adjust split to ensure it sums to exact total (fix rounding).
 */
export function normalizeSplit(total: number, results: SplitResult[]): SplitResult[] {
  const sum = results.reduce((acc, r) => acc + r.amount, 0)
  const diff = Math.round((total - sum) * 100) / 100

  if (Math.abs(diff) < 0.001) return results

  // Add rounding diff to largest share
  const maxIdx = results.reduce((max, r, i) => r.amount > results[max].amount ? i : max, 0)
  return results.map((r, i) =>
    i === maxIdx
      ? { ...r, amount: Math.round((r.amount + diff) * 100) / 100 }
      : r
  )
}

/**
 * AI-powered expense categorization based on title keywords.
 * In production, this would call an actual AI API.
 */
export function aiCategorize(title: string): { category: string; confidence: number } {
  const lower = title.toLowerCase()

  const rules: { keywords: string[]; category: string }[] = [
    { keywords: ['restaurant', 'cafe', 'pizza', 'burger', 'food', 'lunch', 'dinner', 'breakfast', 'coffee', 'sushi', 'thai', 'chinese', 'indian', 'taco', 'bar', 'pub', 'drinks', 'beer', 'wine'], category: 'FOOD' },
    { keywords: ['uber', 'lyft', 'taxi', 'bus', 'train', 'metro', 'subway', 'gas', 'petrol', 'fuel', 'parking', 'toll', 'car', 'ride', 'transport'], category: 'TRANSPORT' },
    { keywords: ['hotel', 'airbnb', 'hostel', 'motel', 'accommodation', 'rent', 'stay', 'room', 'apartment', 'bnb'], category: 'ACCOMMODATION' },
    { keywords: ['movie', 'cinema', 'concert', 'show', 'ticket', 'event', 'game', 'party', 'club', 'netflix', 'spotify', 'entertainment'], category: 'ENTERTAINMENT' },
    { keywords: ['amazon', 'shopping', 'store', 'mall', 'clothes', 'shoes', 'market', 'grocery', 'supermarket', 'walmart', 'target'], category: 'SHOPPING' },
    { keywords: ['electric', 'electricity', 'water', 'internet', 'wifi', 'phone', 'utility', 'bill', 'subscription'], category: 'UTILITIES' },
    { keywords: ['doctor', 'hospital', 'pharmacy', 'medicine', 'health', 'medical', 'dentist', 'gym', 'fitness'], category: 'HEALTH' },
    { keywords: ['flight', 'airline', 'airport', 'travel', 'trip', 'vacation', 'holiday', 'tour'], category: 'TRAVEL' },
    { keywords: ['sport', 'football', 'basketball', 'tennis', 'golf', 'ski', 'surf', 'swim', 'run', 'yoga'], category: 'SPORTS' },
    { keywords: ['course', 'book', 'class', 'school', 'university', 'tuition', 'education', 'workshop', 'training'], category: 'EDUCATION' },
  ]

  for (const rule of rules) {
    const matched = rule.keywords.some(kw => lower.includes(kw))
    if (matched) {
      const matchCount = rule.keywords.filter(kw => lower.includes(kw)).length
      const confidence = Math.min(0.95, 0.7 + matchCount * 0.08)
      return { category: rule.category, confidence }
    }
  }

  return { category: 'OTHER', confidence: 0.4 }
}
