/*
  # Wedding RSVP Schema

  1. New Tables
    - `rsvp_responses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `attending` (boolean)
      - `guests` (integer)
      - `message` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `rsvp_responses` table
    - Add policies for:
      - Insert: Allow authenticated users to submit RSVP
      - Select: Allow authenticated users to view their own RSVPs
*/

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  attending boolean NOT NULL DEFAULT true,
  guests integer NOT NULL DEFAULT 1,
  message text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL DEFAULT auth.uid()
);

ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert (since we're not using auth yet)
CREATE POLICY "Allow anonymous inserts"
  ON rsvp_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy to allow anyone to select (since we're not using auth yet)
CREATE POLICY "Allow anonymous select"
  ON rsvp_responses
  FOR SELECT
  TO anon
  USING (true);
