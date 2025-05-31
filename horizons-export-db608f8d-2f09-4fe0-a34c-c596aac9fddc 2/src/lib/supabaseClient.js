
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rfaqmpykvjmlgmrsttpa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmYXFtcHlrdmptbGdtcnN0dHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTY2ODIsImV4cCI6MjA2NDEzMjY4Mn0.mTgEfF0C0I1jI7diM07BciK9gOV3_EjFnOe55VWIHgE';

if (!supabaseUrl) {
  console.error("Supabase URL is not defined. Please check your environment variables.");
}
if (!supabaseAnonKey) {
  console.error("Supabase Anon Key is not defined. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
