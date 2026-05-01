import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only warn in development, don't throw in production builds
if ((!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') && import.meta.env.DEV) {
  console.warn('Using placeholder Supabase configuration. Please set proper environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey)