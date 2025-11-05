/*
  # Create FAQ and Blog System Tables

  ## New Tables
  
  ### `faq_items`
  - `id` (uuid, primary key) - Unique identifier for each FAQ item
  - `question` (text) - The FAQ question
  - `answer` (text) - The detailed answer
  - `category` (text) - Category for organizing FAQs (e.g., "General", "Privacy", "Technical")
  - `display_order` (integer) - Order in which FAQs should appear
  - `is_visible` (boolean) - Whether the FAQ is published
  - `search_keywords` (text array) - Additional keywords for search functionality
  - `created_at` (timestamptz) - When the FAQ was created
  - `updated_at` (timestamptz) - When the FAQ was last updated

  ### `blog_categories`
  - `id` (uuid, primary key) - Unique identifier for each category
  - `name` (text) - Category name
  - `slug` (text, unique) - URL-friendly category identifier
  - `description` (text) - Category description
  - `display_order` (integer) - Order for displaying categories
  - `created_at` (timestamptz) - When the category was created

  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each post
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly post identifier
  - `excerpt` (text) - Short summary/preview of the post
  - `content` (text) - Full blog post content (supports markdown)
  - `author` (text) - Author name
  - `category_id` (uuid, foreign key) - Reference to blog_categories
  - `featured_image_url` (text) - URL to featured image
  - `tags` (text array) - Array of tags for categorization
  - `status` (text) - Post status: 'draft', 'published', 'archived'
  - `published_at` (timestamptz) - When the post was published
  - `reading_time_minutes` (integer) - Estimated reading time
  - `view_count` (integer) - Number of views
  - `created_at` (timestamptz) - When the post was created
  - `updated_at` (timestamptz) - When the post was last updated

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access to published content
  - No write access for anonymous users (content managed separately)

  ## Indexes
  - Add indexes on frequently queried columns for performance
*/

-- Create FAQ items table
CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  display_order integer NOT NULL DEFAULT 0,
  is_visible boolean DEFAULT true,
  search_keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'Vexto Team',
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  featured_image_url text DEFAULT '',
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  reading_time_minutes integer DEFAULT 5,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);
CREATE INDEX IF NOT EXISTS idx_faq_items_visible ON faq_items(is_visible);
CREATE INDEX IF NOT EXISTS idx_faq_items_display_order ON faq_items(display_order);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);

-- Enable Row Level Security
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published content

-- FAQ items: anyone can read visible FAQs
CREATE POLICY "Anyone can view visible FAQ items"
  ON faq_items FOR SELECT
  USING (is_visible = true);

-- Blog categories: anyone can read all categories
CREATE POLICY "Anyone can view blog categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Blog posts: anyone can read published posts
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
