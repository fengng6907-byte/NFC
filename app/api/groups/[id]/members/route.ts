import { NextRequest } from 'next/server'
import { ok, err, serverErr, requireAuth } from '@/lib/utils/api'
import { addGroupMember } from '@/lib/services/groups'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return err('Invalid email', 422)

    const profile = await addGroupMember(supabase, params.id, parsed.data.email)
    return ok(profile, 201)
  } catch (e) {
    return serverErr(e)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { user, supabase, unauthorized } = await requireAuth()
  if (unauthorized || !user) return err('Unauthorized', 401)

  try {
    const { userId } = await req.json()
    if (!userId) return err('userId is required', 400)

    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', params.id)
      .eq('user_id', userId)

    if (error) return err(error.message, 400)
    return ok({ removed: true })
  } catch (e) {
    return serverErr(e)
  }
}
