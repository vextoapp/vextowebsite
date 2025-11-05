import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_visible: boolean;
  search_keywords: string[];
  created_at: string;
  updated_at: string;
}

export function useFAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const { data, error } = await supabase
          .from('faq_items')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        setFaqs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
}
