import { NextRequest } from 'next/server'
import { ok, err, serverErr, requireAuth, validationErr } from '@/lib/utils/api'
import { getUserExpenses, getGroupExpenses, createExpense } from '@/lib/services/expenses'
import { createExpenseSchema } from '@/lib/validators'

export async function GET(req: NextRequest) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const { searchParams } = new URL(req.url)
    const groupId = searchParams.get('groupId')
    const limit   = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100)
    const offset  = parseInt(searchParams.get('offset') ?? '0')

    const expenses = groupId
      ? await getGroupExpenses(supabase, groupId, limit, offset)
      : await getUserExpenses(supabase, user.id, limit)

    return ok(expenses)
  } catch (e) {
    return serverErr(e)
  }
}

export async function POST(req: NextRequest) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const body = await req.json()
    const parsed = createExpenseSchema.safeParse(body)
    if (!parsed.success) return validationErr(parsed.error)

    // Ensure payer is the authenticated user (or admin can set any payer)
    if (parsed.data.payerId !== user.id) {
      const { data: member } = await supabase
        .from('group_members')
        .select('role')
        .eq('group_id', parsed.data.groupId)
        .eq('user_id', user.id)
        .single() as any

      if (!member || (member as any).role !== 'ADMIN') {
        return err('You can only add expenses paid by yourself', 403)
      }
    }

    const expense = await createExpense(supabase, parsed.data as any)
    return ok(expense, 201)
  } catch (e) {
    return serverErr(e)
  }
}
