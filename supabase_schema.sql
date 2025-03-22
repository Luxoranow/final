-- This file is for reference and can be used to set up the Supabase database schema for subscriptions

-- Update the profiles table with subscription-related columns
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'Free',
ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMPTZ;

-- Add an index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON public.profiles(subscription_status);

-- Add RLS policies to secure the subscription data
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read/update only their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create a secure webhook handler table for Stripe events
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  object TEXT NOT NULL,
  created TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ
);

-- Add index for webhook events
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_type ON stripe_webhook_events(type);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_processed ON stripe_webhook_events(processed);

-- Triggers and functions for updating user subscription status
CREATE OR REPLACE FUNCTION handle_subscription_updated()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the profile when subscription data changes
  IF NEW.subscription_status <> OLD.subscription_status THEN
    -- Add any additional business logic here
    -- For example, granting or revoking access to premium features
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the profiles table
DROP TRIGGER IF EXISTS on_subscription_status_change ON public.profiles;
CREATE TRIGGER on_subscription_status_change
  AFTER UPDATE OF subscription_status ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_subscription_updated(); 