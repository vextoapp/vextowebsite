import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  status: 'active' | 'beta' | 'coming_soon' | 'new';
  features: string[];
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  event_type: 'page_view' | 'app_launch' | 'cta_click' | 'email_signup';
  app_id?: string;
  metadata?: Record<string, unknown>;
}

export interface EmailSignup {
  email: string;
  source?: string;
}
