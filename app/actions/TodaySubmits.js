import { createServerClient } from '@supabase/ssr';
import { unstable_cache } from 'next/cache';

const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
        cookies: {
            getAll() { return []; },
            setAll() { },
        },
    }
  );

async function fetchTodaySongs() {
  const { data, error } = await supabase
    .from('todays_songs')
    .select('*');

  if (error) {
    console.error('[TodaySubmits]', error);
    throw error;
  }

  return data;
}

const getTodaySongsCached = unstable_cache(
  fetchTodaySongs,
  ['today-submits'],
  { revalidate: 900 }
);

export default async function TodaySubmits() {
  return await getTodaySongsCached();
}
