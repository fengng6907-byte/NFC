import { NextRequest } from 'next/server'
import { ok, err, serverErr, requireAuth, validationErr } from '@/lib/utils/api'
import { getUserSettlements, createSettlement, completeSettlement, cancelSettlement } from '@/lib/services/settlements'
import { createSettlementSchema } from '@/lib/validators'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const settlements = await getUserSettlements(supabase, user.id)
    return ok(settlements)
  } catch (e) {
    return serverErr(e)
  }
}

export async function POST(req: NextRequest) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const body = await req.json()
    const parsed = createSettlementSchema.safeParse(body)
    if (!parsed.success) return validationErr(parsed.error)

    if (parsed.data.receiverId === user.id) {
      return err('Cannot settle with yourself', 400)
    }

    const settlement = await createSettlement(supabase, {
      senderId:    user.id,
      receiverId:  parsed.data.receiverId,
      amount:      parsed.data.amount,
      currency:    parsed.data.currency,
      method:      parsed.data.method,
      notes:       parsed.data.notes,
      groupId:     parsed.data.groupId,
    })

    return ok(settlement, 201)
  } catch (e) {
    return serverErr(e)
  }
}

const patchSchema = z.object({
  id:     z.string().uuid(),
  action: z.enum(['complete', 'cancel']),
})

export async function PATCH(req: NextRequest) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const body = await req.json()
    const parsed = patchSchema.safeParse(body)
    if (!parsed.success) return validationErr(parsed.error)

    const result = parsed.data.action === 'complete'
      ? await completeSettlement(supabase, parsed.data.id, user.id)
      : await cancelSettlement(supabase, parsed.data.id, user.id)

    return ok(result)
  } catch (e) {
    return serverErr(e)
  }
}
