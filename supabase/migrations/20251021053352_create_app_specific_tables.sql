/*
  # Create App-Specific Tables for Micro-Apps

  1. New Tables
    - notes: Store voice-to-text notes with hashtags
    - focus_sessions: Track Pomodoro timer sessions
    - focus_user_stats: Track user XP, level, and streaks
    - focus_achievements: Store earned achievements
    - color_palettes: Store extracted color palettes

  2. Security
    - Enable RLS on all tables
    - Add policies for public access
*/

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  hashtags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS focus_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name text NOT NULL,
  session_type text NOT NULL CHECK (session_type IN ('work', 'short_break', 'long_break')),
  duration integer NOT NULL DEFAULT 25,
  completed boolean DEFAULT false,
  xp_earned integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS focus_user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_xp integer DEFAULT 0,
  level integer DEFAULT 1,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_session_date date,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS focus_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_name text NOT NULL,
  achievement_type text NOT NULL,
  badge_icon text DEFAULT '🏆',
  earned_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS color_palettes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  colors jsonb NOT NULL DEFAULT '[]'::jsonb,
  source text DEFAULT 'upload',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_palettes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read all notes"
  ON notes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert notes"
  ON notes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update notes"
  ON notes FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete notes"
  ON notes FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Public can read all focus sessions"
  ON focus_sessions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert focus sessions"
  ON focus_sessions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can read user stats"
  ON focus_user_stats FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert user stats"
  ON focus_user_stats FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update user stats"
  ON focus_user_stats FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read achievements"
  ON focus_achievements FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert achievements"
  ON focus_achievements FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can read color palettes"
  ON color_palettes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert color palettes"
  ON color_palettes FOR INSERT
  TO public
  WITH CHECK (true);
