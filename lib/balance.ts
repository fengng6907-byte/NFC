import type { Expense, Debt, Balance, User } from '@/types'

// ─── Balance Calculation Engine ───────────────────────────────────────────────

/**
 * Calculate raw balances between users from a list of expenses.
 * Returns a map: userId -> net balance (positive = owed to you, negative = you owe)
 */
export function calculateRawBalances(
  expenses: Expense[],
  currentUserId: string
): Map<string, number> {
  const balances = new Map<string, number>()

  for (const expense of expenses) {
    if (expense.isSettled) continue

    for (const share of expense.shares) {
      if (share.isPaid) continue

      const payerId = expense.payerId
      const owerId = share.userId
      const amount = share.amount

      if (payerId === owerId) continue

      if (payerId === currentUserId) {
        // Current user paid: others owe them
        balances.set(owerId, (balances.get(owerId) ?? 0) + amount)
      } else if (owerId === currentUserId) {
        // Current user owes the payer
        balances.set(payerId, (balances.get(payerId) ?? 0) - amount)
      }
    }
  }

  return balances
}

/**
 * Calculate balances between ALL pairs of users in a group.
 * Returns a matrix: { fromUserId: { toUserId: amount } }
 */
export function calculateGroupBalanceMatrix(
  expenses: Expense[]
): Map<string, Map<string, number>> {
  const matrix = new Map<string, Map<string, number>>()

  for (const expense of expenses) {
    if (expense.isSettled) continue

    for (const share of expense.shares) {
      if (share.isPaid || share.userId === expense.payerId) continue

      const from = share.userId
      const to = expense.payerId
      const amount = share.amount

      if (!matrix.has(from)) matrix.set(from, new Map())
      if (!matrix.has(to)) matrix.set(to, new Map())

      const fromMap = matrix.get(from)!
      const toMap = matrix.get(to)!

      fromMap.set(to, (fromMap.get(to) ?? 0) + amount)

      // Net them out
      const reverse = toMap.get(from) ?? 0
      if (reverse > 0) {
        const net = fromMap.get(to)! - reverse
        if (net > 0) {
          fromMap.set(to, net)
          toMap.delete(from)
        } else if (net < 0) {
          fromMap.delete(to)
          toMap.set(from, Math.abs(net))
        } else {
          fromMap.delete(to)
          toMap.delete(from)
        }
      }
    }
  }

  return matrix
}

/**
 * Simplify debts using greedy algorithm (minimizes number of transactions).
 * Classic "settle all debts with minimum transactions" problem.
 */
export function simplifyDebts(
  expenses: Expense[],
  users: User[]
): Debt[] {
  const userMap = new Map(users.map(u => [u.id, u]))

  // Build net balance per user
  const net = new Map<string, number>()
  for (const user of users) net.set(user.id, 0)

  for (const expense of expenses) {
    if (expense.isSettled) continue

    for (const share of expense.shares) {
      if (share.isPaid || share.userId === expense.payerId) continue

      const payer = expense.payerId
      const ower = share.userId
      const amount = share.amount

      net.set(payer, (net.get(payer) ?? 0) + amount)
      net.set(ower, (net.get(ower) ?? 0) - amount)
    }
  }

  // Separate creditors and debtors
  const creditors: { userId: string; amount: number }[] = []
  const debtors: { userId: string; amount: number }[] = []

  for (const [userId, balance] of Array.from(net.entries())) {
    if (balance > 0.01) creditors.push({ userId, amount: balance })
    else if (balance < -0.01) debtors.push({ userId, amount: Math.abs(balance) })
  }

  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)

  const debts: Debt[] = []
  let ci = 0
  let di = 0

  while (ci < creditors.length && di < debtors.length) {
    const creditor = creditors[ci]
    const debtor = debtors[di]
    const amount = Math.min(creditor.amount, debtor.amount)

    if (amount > 0.01) {
      debts.push({
        fromUserId: debtor.userId,
        toUserId: creditor.userId,
        fromUser: userMap.get(debtor.userId)!,
        toUser: userMap.get(creditor.userId)!,
        amount: Math.round(amount * 100) / 100,
      })
    }

    creditor.amount -= amount
    debtor.amount -= amount

    if (creditor.amount < 0.01) ci++
    if (debtor.amount < 0.01) di++
  }

  return debts
}

/**
 * Get balance summary between two specific users across all shared groups.
 */
export function getBalanceBetweenUsers(
  expenses: Expense[],
  userAId: string,
  userBId: string
): number {
  let balance = 0

  for (const expense of expenses) {
    if (expense.isSettled) continue

    if (expense.payerId === userAId) {
      const share = expense.shares.find(s => s.userId === userBId)
      if (share && !share.isPaid) balance += share.amount
    } else if (expense.payerId === userBId) {
      const share = expense.shares.find(s => s.userId === userAId)
      if (share && !share.isPaid) balance -= share.amount
    }
  }

  return Math.round(balance * 100) / 100
}

/**
 * Calculate dashboard summary stats for a user.
 */
export function calculateDashboardStats(expenses: Expense[], currentUserId: string) {
  let totalOwed = 0    // Others owe you
  let totalOwing = 0   // You owe others

  for (const expense of expenses) {
    if (expense.isSettled) continue

    if (expense.payerId === currentUserId) {
      for (const share of expense.shares) {
        if (!share.isPaid && share.userId !== currentUserId) {
          totalOwed += share.amount
        }
      }
    } else {
      const myShare = expense.shares.find(s => s.userId === currentUserId)
      if (myShare && !myShare.isPaid) {
        totalOwing += myShare.amount
      }
    }
  }

  return {
    totalOwed: Math.round(totalOwed * 100) / 100,
    totalOwing: Math.round(totalOwing * 100) / 100,
    netBalance: Math.round((totalOwed - totalOwing) * 100) / 100,
  }
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))
}
