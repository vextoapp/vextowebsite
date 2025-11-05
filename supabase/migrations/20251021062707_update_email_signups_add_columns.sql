/*
  # Update email_signups table with additional columns

  1. Changes
    - Add `subscribed` (boolean) column - tracks if user is actively subscribed
    - Add `updated_at` (timestamptz) column - tracks last update time
    
  2. Indexes
    - Add index on subscribed status for filtering active subscribers
    
  3. Notes
    - Adding columns with default values to existing table
    - All existing rows will get default values
*/

-- Add subscribed column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'email_signups' AND column_name = 'subscribed'
  ) THEN
    ALTER TABLE email_signups ADD COLUMN subscribed boolean DEFAULT true;
  END IF;
END $$;

-- Add updated_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'email_signups' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE email_signups ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Add index for filtering active subscribers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_email_signups_subscribed'
  ) THEN
    CREATE INDEX idx_email_signups_subscribed ON email_signups(subscribed) WHERE subscribed = true;
  END IF;
END $$;