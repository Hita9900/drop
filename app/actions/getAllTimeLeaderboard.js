import { createServerClient } from '@supabase/ssr';
import { unstable_cache } from 'next/cache';

export const getAllTimeLeaderboard = unstable_cache(
  async () => {
    // Create an anonymous Supabase client for public queries (no cookies needed)
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
    const { data: AllTimeUsers } = await supabase.rpc('all_time_leaderboard_func');
    return AllTimeUsers ?? [];
  },
  ['all-time-leaderboard'],
  {
    //refreshes the leaderboard every hour
    revalidate: 3600,
    tags: ['leaderboard-all-time'],
  }
);