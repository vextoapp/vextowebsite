import { useEffect, useState } from 'react';
import { supabase, App } from '../lib/supabase';

export function useApps() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const { data, error } = await supabase
          .from('apps')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        setApps(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch apps');
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  return { apps, loading, error };
}
