/*
  # Create contact_submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Name of the person submitting the form
      - `email` (text) - Email address for follow-up communication
      - `message` (text) - The contact message content
      - `source` (text) - Source page where the form was submitted
      - `status` (text) - Processing status (new, read, replied, archived)
      - `created_at` (timestamptz) - Timestamp of submission
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy allowing anyone to insert submissions
    - Add policy for authenticated admins to read/update submissions
  
  3. Notes
    - Form submissions are stored for follow-up and support purposes
    - Status field helps track which submissions need attention
    - Public can only insert, not read others' submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  source text DEFAULT 'contact_page',
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (false);

CREATE POLICY "Service role can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);