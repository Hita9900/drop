import { createServerClient } from '@supabase/ssr';
import { unstable_cache } from 'next/cache';

export const getWeeklyLeaderboard = unstable_cache(
  async () => {
    //anonymous Supabase client for public queries (no cookie)
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
    const { data: threeDayUsers } = await supabase.rpc('three_day_leaderboard_func');
    return threeDayUsers ?? [];
  },
  ['leaderboard-three-day'],
  {
    //refreshes the leaderboard every hour
    revalidate: 3600,
    tags: ['leaderboard-three-day'],
  }
);