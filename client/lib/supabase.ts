import { createClient } from "@supabase/supabase-js";

// Use NEXT_PUBLIC_ variables as fallback since that's what's in the .env file
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing Supabase URL. Please set VITE_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in your environment variables.",
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing Supabase Anon Key. Please set VITE_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
