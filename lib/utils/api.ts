import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export type ApiSuccess<T> = { data: T; error: null }
export type ApiError      = { data: null; error: string; details?: unknown }
export type ApiResult<T>  = ApiSuccess<T> | ApiError

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ data, error: null } satisfies ApiSuccess<T>, { status })
}

export function err(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ data: null, error: message, details } satisfies ApiError, { status })
}

export function validationErr(error: ZodError) {
  return err('Validation failed', 422, error.flatten().fieldErrors)
}

export function serverErr(e: unknown) {
  const message = e instanceof Error ? e.message : 'Internal server error'
  console.error('[API Error]', e)
  return err(message, 500)
}

/** Get the authenticated user from a request, returns null if unauthenticated. */
export async function getAuthUser() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return { user: null, supabase }
  return { user, supabase }
}

/** Require auth — returns 401 response if not authenticated. */
export async function requireAuth() {
  const { user, supabase } = await getAuthUser()
  return { user, supabase, unauthorized: !user }
}
