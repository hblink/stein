import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (supabaseClient) {
    return supabaseClient
  }
  // During build/SSR or when env vars aren't available,
  // we don't want to throw errors
  if (typeof window === 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    // Return a minimal mock client that won't throw
    supabaseClient = {
      from: (_table: string) => ({
        select: () => ({ execute: async () => ({ data: [], error: null }) }),
        insert: () => ({ execute: async () => ({ data: [], error: null }) }),
        update: () => ({ execute: async () => ({ data: [], error: null }) }),
        delete: () => ({ execute: async () => ({ data: [], error: null }) }),
        eq: () => ({ execute: async () => ({ data: [], error: null }) }),
        order: () => ({ execute: async () => ({ data: [], error: null }) }),
      }),
    } as any
    return supabaseClient
  }
  // Missing URL/key at runtime - create with placeholder
  if (!supabaseUrl || !supabaseAnonKey) {
    supabaseClient = createClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    )
    return supabaseClient
  }
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

// Legacy export - only used in browser context
export const supabase = typeof window !== 'undefined' ? getSupabase() : ({} as any)