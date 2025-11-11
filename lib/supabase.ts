import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

// For client components
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// For server-side operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Types
export type Show = {
  id: string;
  date: string;
  venue: string;
  city: string;
  state?: string;
  ticket_link?: string;
  created_at: string;
};

export type Photo = {
  id: string;
  url: string;
  caption?: string;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};