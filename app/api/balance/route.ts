import { NextRequest } from 'next/server'
import { ok, err, serverErr, requireAuth } from '@/lib/utils/api'
import { getDashboardBalance, simplifyDebts, getUserBalance } from '@/lib/services/balance'
import { getGroupExpenses } from '@/lib/services/expenses'
import { getGroup } from '@/lib/services/groups'

export async function GET(req: NextRequest) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const { searchParams } = new URL(req.url)
    const groupId = searchParams.get('groupId')

    if (groupId) {
      const [group, expenses] = await Promise.all([
        getGroup(supabase, groupId),
        getGroupExpenses(supabase, groupId, 200),
      ])

      if (!group) return err('Group not found', 404)

      const members = group.group_members.map(gm => gm.profiles)
      const debts   = simplifyDebts(expenses as any, members as any)
      const myBalance = getUserBalance(expenses as any, user.id, members as any)

      return ok({ debts, myBalance, memberCount: members.length })
    }

    // Dashboard-level balance
    const balance = await getDashboardBalance(supabase, user.id)
    return ok(balance)
  } catch (e) {
    return serverErr(e)
  }
}
