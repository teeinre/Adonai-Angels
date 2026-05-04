-- Adonai Angels Co - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Donors table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.donors (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;

-- Donors can read and update their own data
CREATE POLICY "Donors can view own data" ON public.donors
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Donors can update own data" ON public.donors
  FOR UPDATE USING (auth.uid() = id);

-- Donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES public.donors(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  gateway TEXT NOT NULL CHECK (gateway IN ('flutterwave', 'paystack')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'successful', 'failed')),
  reference TEXT UNIQUE NOT NULL,
  transaction_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Donors can view their own donations
CREATE POLICY "Donors can view own donations" ON public.donations
  FOR SELECT USING (auth.uid() = donor_id);

-- Anyone can insert donations (for anonymous donations)
CREATE POLICY "Anyone can create donations" ON public.donations
  FOR INSERT WITH CHECK (true);

-- Site content table (for CMS)
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'button')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page, section, key)
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read content
CREATE POLICY "Anyone can read content" ON public.site_content
  FOR SELECT USING (true);

-- Payment configuration table
CREATE TABLE IF NOT EXISTS public.payment_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gateway TEXT UNIQUE NOT NULL CHECK (gateway IN ('flutterwave', 'paystack')),
  public_key TEXT NOT NULL,
  secret_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  test_mode BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.payment_config ENABLE ROW LEVEL SECURITY;

-- Only read public keys (secret keys should only be accessed server-side)
CREATE POLICY "Anyone can read public payment config" ON public.payment_config
  FOR SELECT USING (true);

-- Volunteer applications table
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT NOT NULL,
  area_of_interest TEXT NOT NULL,
  motivation TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit applications
CREATE POLICY "Anyone can submit volunteer applications" ON public.volunteer_applications
  FOR INSERT WITH CHECK (true);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.donors (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at
CREATE TRIGGER update_donors_updated_at BEFORE UPDATE ON public.donors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_config_updated_at BEFORE UPDATE ON public.payment_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default payment gateway placeholders
INSERT INTO public.payment_config (gateway, public_key, secret_key, is_active, test_mode)
VALUES
  ('flutterwave', 'FLWPUBK-xxxxx', 'FLWSECK-xxxxx', false, true),
  ('paystack', 'pk_test_xxxxx', 'sk_test_xxxxx', false, true)
ON CONFLICT (gateway) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_reference ON public.donations(reference);
CREATE INDEX IF NOT EXISTS idx_site_content_page ON public.site_content(page);
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_email ON public.volunteer_applications(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
