'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { CreateGroupInput } from '@/lib/validators'

const GROUPS_KEY = ['groups'] as const

async function fetchGroups() {
  const res = await fetch('/api/groups')
  if (!res.ok) throw new Error('Failed to fetch groups')
  const { data } = await res.json()
  return data
}

async function fetchGroup(id: string) {
  const res = await fetch(`/api/groups/${id}`)
  if (!res.ok) throw new Error('Failed to fetch group')
  const { data } = await res.json()
  return data
}

export function useGroups() {
  return useQuery({
    queryKey: GROUPS_KEY,
    queryFn:  fetchGroups,
  })
}

export function useGroup(id: string) {
  return useQuery({
    queryKey: [...GROUPS_KEY, id],
    queryFn:  () => fetchGroup(id),
    enabled:  !!id,
  })
}

export function useCreateGroup() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateGroupInput) => {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(input),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to create group')
      return json.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: GROUPS_KEY })
      toast.success('Group created!', { description: 'Invite your friends to join.' })
    },
    onError: (e: Error) => toast.error(e.message),
  })
}

export function useAddMember(groupId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to add member')
      return json.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [...GROUPS_KEY, groupId] })
      toast.success('Member added!')
    },
    onError: (e: Error) => toast.error(e.message),
  })
}
