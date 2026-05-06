import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ExpenseWithDetails, Profile } from '@/types/database'

type DB = SupabaseClient<Database>

export interface DebtSummary {
  fromUserId: string
  toUserId: string
  fromUser: Profile
  toUser: Profile
  amount: number
}

export interface UserBalance {
  userId: string
  user: Profile
  owedToYou: number   // others owe you
  youOwe: number      // you owe others
  net: number         // positive = you're owed overall
}

/**
 * Simplified debt minimization via greedy net-balance algorithm.
 * Reduces N*(N-1) possible transactions to minimum required.
 */
export function simplifyDebts(
  expenses: ExpenseWithDetails[],
  users: Profile[]
): DebtSummary[] {
  const userMap = new Map(users.map(u => [u.id, u]))
  const net = new Map<string, number>()
  for (const u of users) net.set(u.id, 0)

  for (const expense of expenses) {
    if (expense.is_settled) continue
    for (const split of expense.expense_splits) {
      if (split.is_paid || split.user_id === expense.payer_id) continue
      net.set(expense.payer_id, (net.get(expense.payer_id) ?? 0) + split.amount)
      net.set(split.user_id, (net.get(split.user_id) ?? 0) - split.amount)
    }
  }

  const creditors: { userId: string; amount: number }[] = []
  const debtors:   { userId: string; amount: number }[] = []

  for (const [userId, balance] of Array.from(net.entries())) {
    if (balance > 0.01)  creditors.push({ userId, amount: balance })
    else if (balance < -0.01) debtors.push({ userId, amount: Math.abs(balance) })
  }

  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)

  const debts: DebtSummary[] = []
  let ci = 0, di = 0

  while (ci < creditors.length && di < debtors.length) {
    const c = creditors[ci]
    const d = debtors[di]
    const amount = Math.round(Math.min(c.amount, d.amount) * 100) / 100

    if (amount > 0.01) {
      debts.push({
        fromUserId: d.userId,
        toUserId:   c.userId,
        fromUser:   userMap.get(d.userId)!,
        toUser:     userMap.get(c.userId)!,
        amount,
      })
    }

    c.amount -= amount
    d.amount -= amount
    if (c.amount < 0.01) ci++
    if (d.amount < 0.01) di++
  }

  return debts
}

export function getUserBalance(
  expenses: ExpenseWithDetails[],
  currentUserId: string,
  users: Profile[]
): UserBalance {
  let owedToYou = 0
  let youOwe    = 0

  for (const expense of expenses) {
    if (expense.is_settled) continue

    if (expense.payer_id === currentUserId) {
      for (const split of expense.expense_splits) {
        if (!split.is_paid && split.user_id !== currentUserId) {
          owedToYou += split.amount
        }
      }
    } else {
      const mySplit = expense.expense_splits.find(s => s.user_id === currentUserId)
      if (mySplit && !mySplit.is_paid) {
        youOwe += mySplit.amount
      }
    }
  }

  const currentUser = users.find(u => u.id === currentUserId)

  return {
    userId: currentUserId,
    user: currentUser!,
    owedToYou: Math.round(owedToYou * 100) / 100,
    youOwe:    Math.round(youOwe    * 100) / 100,
    net:       Math.round((owedToYou - youOwe) * 100) / 100,
  }
}

export async function getDashboardBalance(db: DB, userId: string) {
  // Fetch all user's expenses via splits
  const { data: splits, error } = await db
    .from('expense_splits')
    .select(`
      amount,
      is_paid,
      user_id,
      expenses!inner (
        id,
        payer_id,
        is_settled,
        group_id
      )
    `)
    .eq('is_paid', false)

  if (error) throw new Error(error.message)

  let owedToYou = 0
  let youOwe    = 0

  for (const split of (splits ?? []) as any[]) {
    const expense = split.expenses
    if (expense.is_settled) continue

    if (expense.payer_id === userId && split.user_id !== userId) {
      owedToYou += split.amount
    } else if (split.user_id === userId && expense.payer_id !== userId) {
      youOwe += split.amount
    }
  }

  return {
    owedToYou: Math.round(owedToYou * 100) / 100,
    youOwe:    Math.round(youOwe    * 100) / 100,
    net:       Math.round((owedToYou - youOwe) * 100) / 100,
  }
}
