import { createServerClient } from '@supabase/ssr';
import { unstable_cache } from 'next/cache';

export const getWeeklyLeaderboard = unstable_cache(
  async () => {
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
    revalidate: 3600,
    tags: ['leaderboard-three-day'],
  }
);