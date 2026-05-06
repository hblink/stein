import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabase = () => {
  if (supabaseClient) {
    return supabaseClient
  }
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client during build when env vars aren't available
    supabaseClient = createClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key',
      {
        global: {
          headers: {},
        },
      }
    )
    return supabaseClient
  }
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

// Legacy export for backwards compatibility
export const supabase = getSupabase()