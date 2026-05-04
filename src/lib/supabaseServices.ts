import { supabase } from './supabase';
import type { Donor, Donation, SiteContent, VolunteerApplication, ContactSubmission } from './supabase';

/**
 * Authentication Services
 */
export const authService = {
  /**
   * Signs up a new user
   */
  async signUp(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Signs in an existing user
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Signs out the current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Gets the current user session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Gets the current user
   */
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
};

/**
 * Database Services
 */
export const dbService = {
  /**
   * Fetches site content for a specific page/section
   */
  async getSiteContent(page: string, section?: string) {
    let query = supabase.from('site_content').select('*').eq('page', page);
    if (section) {
      query = query.eq('section', section);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as SiteContent[];
  },

  /**
   * Submits a volunteer application
   */
  async submitVolunteerApplication(application: Omit<VolunteerApplication, 'id' | 'status' | 'created_at'>) {
    const { data, error } = await supabase
      .from('volunteer_applications')
      .insert([{ ...application, status: 'pending' }])
      .select()
      .single();
    if (error) throw error;
    return data as VolunteerApplication;
  },

  /**
   * Submits a contact form
   */
  async submitContactForm(submission: Omit<ContactSubmission, 'id' | 'status' | 'created_at'>) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{ ...submission, status: 'new' }])
      .select()
      .single();
    if (error) throw error;
    return data as ContactSubmission;
  },

  /**
   * Gets donor donations (requires auth)
   */
  async getDonorDonations(donorId: string) {
    const { data, error } = await supabase
      .from('donations')
      .select('*, donor:donors(*)')
      .eq('donor_id', donorId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Donation[];
  },
};

/**
 * Real-time Subscription Services
 */
export const realTimeService = {
  /**
   * Subscribes to site content changes
   */
  subscribeToContentChanges(callback: (payload: any) => void) {
    return supabase
      .channel('site_content_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_content' },
        (payload) => callback(payload)
      )
      .subscribe();
  },

  /**
   * Subscribes to donation status updates for a specific donor
   */
  subscribeToDonations(donorId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`donor_donations_${donorId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'donations',
          filter: `donor_id=eq.${donorId}`,
        },
        (payload) => callback(payload)
      )
      .subscribe();
  },
};
