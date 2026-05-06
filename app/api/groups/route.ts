import { NextRequest } from 'next/server'
import { ok, err, serverErr, requireAuth, validationErr } from '@/lib/utils/api'
import { getUserGroups, createGroup, addGroupMember } from '@/lib/services/groups'
import { createGroupSchema } from '@/lib/validators'

export async function GET() {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const groups = await getUserGroups(supabase, user.id)
    return ok(groups)
  } catch (e) {
    return serverErr(e)
  }
}

export async function POST(req: NextRequest) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const body = await req.json()
    const parsed = createGroupSchema.safeParse(body)
    if (!parsed.success) return validationErr(parsed.error)

    const { memberEmails = [], ...groupData } = parsed.data
    const group = await createGroup(supabase, user.id, groupData) as any

    // Invite members by email
    const inviteResults = await Promise.allSettled(
      memberEmails.map(email => addGroupMember(supabase, group.id, email))
    )

    const failed = inviteResults
      .filter(r => r.status === 'rejected')
      .map((r, i) => ({ email: memberEmails[i], reason: (r as PromiseRejectedResult).reason?.message }))

    return ok({ group, failedInvites: failed }, 201)
  } catch (e) {
    return serverErr(e)
  }
}
