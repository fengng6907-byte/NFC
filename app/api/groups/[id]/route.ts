import { NextRequest } from 'next/server'
import { ok, err, serverErr, requireAuth, validationErr } from '@/lib/utils/api'
import { getGroup, archiveGroup } from '@/lib/services/groups'
import { updateGroupSchema } from '@/lib/validators'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const group = await getGroup(supabase, params.id)
    if (!group) return err('Group not found', 404)
    return ok(group)
  } catch (e) {
    return serverErr(e)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const body = await req.json()
    const parsed = updateGroupSchema.safeParse(body)
    if (!parsed.success) return validationErr(parsed.error)

    const db = supabase as any
    const { data, error } = await db
      .from('groups')
      .update(parsed.data)
      .eq('id', params.id)
      .select()
      .single()

    if (error) return err(error.message, 400)
    return ok(data)
  } catch (e) {
    return serverErr(e)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    await archiveGroup(supabase, params.id)
    return ok({ archived: true })
  } catch (e) {
    return serverErr(e)
  }
}
