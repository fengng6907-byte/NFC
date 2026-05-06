'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CreateExpenseInput } from '@/lib/validators'

export const expenseKeys = {
  all:       ['expenses'] as const,
  byGroup:   (id: string) => ['expenses', 'group', id] as const,
  byUser:    ()           => ['expenses', 'user'] as const,
}

async function fetchExpenses(groupId?: string) {
  const url = groupId ? `/api/expenses?groupId=${groupId}` : '/api/expenses'
  const res  = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch expenses')
  const { data } = await res.json()
  return data
}

export function useExpenses(groupId?: string) {
  return useQuery({
    queryKey: groupId ? expenseKeys.byGroup(groupId) : expenseKeys.byUser(),
    queryFn:  () => fetchExpenses(groupId),
  })
}

export function useCreateExpense() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateExpenseInput) => {
      const res = await fetch('/api/expenses', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(input),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to add expense')
      return json.data
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: expenseKeys.byGroup(vars.groupId) })
      qc.invalidateQueries({ queryKey: expenseKeys.byUser() })
      qc.invalidateQueries({ queryKey: ['balance'] })
      toast.success('Expense added!', { description: 'Splits calculated automatically.' })
    },
    onError: (e: Error) => toast.error(e.message),
  })
}

export function useBalance(groupId?: string) {
  return useQuery({
    queryKey: ['balance', groupId],
    queryFn:  async () => {
      const url = groupId ? `/api/balance?groupId=${groupId}` : '/api/balance'
      const res  = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch balance')
      const { data } = await res.json()
      return data
    },
    staleTime: 30_000,
  })
}

export function useSettlements() {
  return useQuery({
    queryKey: ['settlements'],
    queryFn:  async () => {
      const res  = await fetch('/api/settlements')
      if (!res.ok) throw new Error('Failed to fetch settlements')
      const { data } = await res.json()
      return data
    },
  })
}

export function useCreateSettlement() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      receiverId: string; amount: number; currency?: string;
      method?: string; notes?: string; groupId?: string;
    }) => {
      const res = await fetch('/api/settlements', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(input),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to create settlement')
      return json.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['settlements'] })
      qc.invalidateQueries({ queryKey: ['balance'] })
      toast.success('Settlement recorded!', { description: 'Your balance has been updated.' })
    },
    onError: (e: Error) => toast.error(e.message),
  })
}

export function useCompleteSettlement() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/settlements', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id, action: 'complete' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to complete settlement')
      return json.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['settlements'] })
      qc.invalidateQueries({ queryKey: ['balance'] })
      toast.success('🦆 Settlement confirmed!', { description: 'Streak maintained!' })
    },
    onError: (e: Error) => toast.error(e.message),
  })
}
