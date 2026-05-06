import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, SettlementWithUsers } from '@/types/database'

type DB = SupabaseClient<Database>

export async function getUserSettlements(
  db: DB,
  userId: string
): Promise<SettlementWithUsers[]> {
  const { data, error } = await (db as any)
    .from('settlements')
    .select(`
      *,
      sender:profiles!settlements_sender_id_fkey (id, name, avatar_url, email),
      receiver:profiles!settlements_receiver_id_fkey (id, name, avatar_url, email)
    `)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as SettlementWithUsers[]
}

export async function createSettlement(
  db: DB,
  input: {
    senderId: string
    receiverId: string
    amount: number
    currency?: string
    method?: string
    notes?: string
    groupId?: string
  }
) {
  const { data, error } = await (db as any)
    .from('settlements')
    .insert({
      sender_id:   input.senderId,
      receiver_id: input.receiverId,
      amount:      input.amount,
      currency:    input.currency ?? 'USD',
      method:      (input.method ?? 'CASH') as any,
      notes:       input.notes ?? null,
      group_id:    input.groupId ?? null,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function completeSettlement(db: DB, settlementId: string, userId: string) {
  const anyDb = db as any

  // Only receiver can confirm payment received
  const { data: settlement } = await anyDb
    .from('settlements')
    .select('receiver_id')
    .eq('id', settlementId)
    .single()

  if (!settlement || settlement.receiver_id !== userId) {
    throw new Error('Only the receiver can confirm this settlement')
  }

  const { data, error } = await anyDb
    .from('settlements')
    .update({ status: 'COMPLETED', settled_at: new Date().toISOString() })
    .eq('id', settlementId)
    .select()
    .single()

  if (error) throw new Error(error.message)

  // Update receiver streak & total_settled
  await (db as any).rpc('increment_streak', { p_user_id: userId }).catch(() => {})

  return data
}

export async function cancelSettlement(db: DB, settlementId: string, userId: string) {
  const { error } = await (db as any)
    .from('settlements')
    .update({ status: 'CANCELLED' })
    .eq('id', settlementId)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)

  if (error) throw new Error(error.message)
}
