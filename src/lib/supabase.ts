import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (...args) => {
      return fetch(...args).catch((err) => {
        console.error('Supabase fetch error:', err);
        throw err;
      });
    },
  },
  db: {
    schema: 'public',
  },
});

/**
 * Validates the Supabase connection by performing a simple query.
 * @returns Promise<boolean>
 */
export const validateConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('site_content').select('count', { count: 'exact', head: true });
    if (error) {
      console.error('Supabase connection validation failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Unexpected error during Supabase connection validation:', err);
    return false;
  }
};

// Database Types
export interface Donor {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  amount: number;
  currency: string;
  gateway: 'flutterwave' | 'paystack';
  status: 'pending' | 'successful' | 'failed';
  reference: string;
  transaction_id?: string;
  created_at: string;
  donor?: Donor;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
  type: 'text' | 'image' | 'button';
  created_at: string;
  updated_at: string;
}

export interface PaymentConfig {
  id: string;
  gateway: 'flutterwave' | 'paystack';
  public_key: string;
  secret_key: string;
  is_active: boolean;
  test_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface VolunteerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  state: string;
  area_of_interest: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  created_at: string;
}
