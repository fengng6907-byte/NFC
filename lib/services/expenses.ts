import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ExpenseWithDetails } from '@/types/database'
import { calculateSplit, aiCategorize } from '@/lib/split'

type DB = SupabaseClient<Database>

export interface CreateExpenseInput {
  groupId: string
  payerId: string
  title: string
  amount: number
  currency?: string
  category?: string
  splitMethod: 'EQUAL' | 'PERCENTAGE' | 'EXACT' | 'SHARES'
  date?: string
  notes?: string
  participantIds: string[]
  customSplits?: { userId: string; amount?: number; percent?: number; shares?: number }[]
  isRecurring?: boolean
  recurrence?: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY'
}

export async function getGroupExpenses(
  db: DB,
  groupId: string,
  limit = 50,
  offset = 0
): Promise<ExpenseWithDetails[]> {
  const { data, error } = await db
    .from('expenses')
    .select(`
      *,
      profiles!expenses_payer_id_fkey (id, name, avatar_url),
      expense_splits (
        *,
        profiles (id, name, avatar_url)
      )
    `)
    .eq('group_id', groupId)
    .order('date', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as ExpenseWithDetails[]
}

export async function getUserExpenses(
  db: DB,
  userId: string,
  limit = 50
): Promise<ExpenseWithDetails[]> {
  // Get all groups user belongs to
  const { data: memberships } = await db
    .from('group_members')
    .select('group_id')
    .eq('user_id', userId)

  if (!memberships?.length) return []
  const groupIds = (memberships as any[]).map(m => m.group_id)

  const { data, error } = await db
    .from('expenses')
    .select(`
      *,
      profiles!expenses_payer_id_fkey (id, name, avatar_url),
      expense_splits (
        *,
        profiles (id, name, avatar_url)
      )
    `)
    .in('group_id', groupIds)
    .order('date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as ExpenseWithDetails[]
}

export async function createExpense(db: DB, input: CreateExpenseInput) {
  // AI categorize if no category provided
  const aiResult = input.category ? null : aiCategorize(input.title)
  const resolvedCategory = (input.category ?? aiResult?.category ?? 'OTHER') as any

  // Calculate splits
  const splitResults = calculateSplit(
    input.amount,
    input.participantIds.map(id => ({ userId: id, name: id })),
    input.splitMethod
  )

  const anyDb = db as any

  // Insert expense
  const { data: expense, error: expErr } = await anyDb
    .from('expenses')
    .insert({
      group_id: input.groupId,
      payer_id: input.payerId,
      title: input.title,
      amount: input.amount,
      currency: input.currency ?? 'USD',
      category: resolvedCategory,
      split_method: input.splitMethod,
      notes: input.notes ?? null,
      date: input.date ?? new Date().toISOString(),
      is_recurring: input.isRecurring ?? false,
      recurrence: input.recurrence ?? null,
      ai_category: aiResult?.category ?? null,
      ai_confidence: aiResult?.confidence ?? null,
    })
    .select()
    .single()

  if (expErr) throw new Error(expErr.message)

  // Insert splits
  const splitsToInsert = splitResults.map(s => ({
    expense_id: expense.id,
    user_id: s.userId,
    amount: s.amount,
    percent: s.percent ?? null,
    shares: null,
  }))

  const { error: splitErr } = await anyDb
    .from('expense_splits')
    .insert(splitsToInsert)

  if (splitErr) throw new Error(splitErr.message)

  return expense
}

export async function markSplitPaid(db: DB, expenseId: string, userId: string) {
  const { error } = await (db as any)
    .from('expense_splits')
    .update({ is_paid: true, paid_at: new Date().toISOString() })
    .eq('expense_id', expenseId)
    .eq('user_id', userId)

  if (error) throw new Error(error.message)
}

export async function deleteExpense(db: DB, expenseId: string) {
  const { error } = await db.from('expenses').delete().eq('id', expenseId)
  if (error) throw new Error(error.message)
}
