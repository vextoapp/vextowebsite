import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category_id: string;
  featured_image_url: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  reading_time_minutes: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPostWithCategory extends BlogPost {
  category?: BlogCategory;
}

export function useBlogPosts(categorySlug?: string) {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(*)
          `)
          .eq('status', 'published')
          .not('published_at', 'is', null)
          .lte('published_at', new Date().toISOString())
          .order('published_at', { ascending: false });

        if (categorySlug) {
          const { data: category } = await supabase
            .from('blog_categories')
            .select('id')
            .eq('slug', categorySlug)
            .single();

          if (category) {
            query = query.eq('category_id', category.id);
          }
        }

        const { data, error } = await query;

        if (error) throw error;

        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [categorySlug]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPostWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(*)
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;

        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}

export function useBlogCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('blog_categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        setCategories(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
