import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, GroupWithMembers } from '@/types/database'

type DB = SupabaseClient<Database>

export async function getUserGroups(db: DB, userId: string): Promise<GroupWithMembers[]> {
  const { data, error } = await db
    .from('groups')
    .select(`
      *,
      group_members (
        *,
        profiles (id, name, email, avatar_url)
      )
    `)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as GroupWithMembers[]
}

export async function getGroup(db: DB, groupId: string): Promise<GroupWithMembers | null> {
  const { data, error } = await db
    .from('groups')
    .select(`
      *,
      group_members (
        *,
        profiles (id, name, email, avatar_url, points, streak_days)
      )
    `)
    .eq('id', groupId)
    .single()

  if (error) return null
  return data as unknown as GroupWithMembers
}

export async function createGroup(
  db: DB,
  userId: string,
  input: { name: string; description?: string; emoji: string; type: string; color: string; currency: string }
) {
  const anyDb = db as any
  const { data: group, error: groupErr } = await anyDb
    .from('groups')
    .insert({
      name: input.name,
      description: input.description ?? null,
      emoji: input.emoji,
      type: input.type as any,
      color: input.color,
      currency: input.currency,
      created_by: userId,
    })
    .select()
    .single()

  if (groupErr) throw new Error(groupErr.message)

  // Add creator as admin
  const { error: memberErr } = await anyDb
    .from('group_members')
    .insert({ group_id: group.id, user_id: userId, role: 'ADMIN' })

  if (memberErr) throw new Error(memberErr.message)

  return group
}

export async function addGroupMember(
  db: DB,
  groupId: string,
  email: string
) {
  // Look up profile by email
  const { data: profile, error: profileErr } = await (db as any)
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

  if (profileErr || !profile) throw new Error(`No user found with email: ${email}`)

  const { error } = await (db as any)
    .from('group_members')
    .insert({ group_id: groupId, user_id: profile.id, role: 'MEMBER' })

  if (error) {
    if (error.code === '23505') throw new Error('User is already a member')
    throw new Error(error.message)
  }

  return profile
}

export async function archiveGroup(db: DB, groupId: string) {
  const { error } = await (db as any)
    .from('groups')
    .update({ is_archived: true })
    .eq('id', groupId)

  if (error) throw new Error(error.message)
}
