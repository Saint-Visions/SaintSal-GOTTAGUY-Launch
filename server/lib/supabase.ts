import { createClient } from "@supabase/supabase-js";

let _supabaseAdmin: any = null;

export const getSupabaseAdmin = () => {
  if (!_supabaseAdmin) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn(
        "Missing Supabase environment variables. Please configure .env file.",
      );
      // Return a mock object for development
      return {
        auth: { getUser: () => ({ data: { user: null }, error: null }) },
        from: () => ({
          select: () => ({ data: [], error: null }),
          insert: () => ({ data: null, error: null }),
          update: () => ({ data: null, error: null }),
          delete: () => ({ data: null, error: null }),
        }),
      };
    }

    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }
  return _supabaseAdmin;
};

export const supabaseAdmin = getSupabaseAdmin;
