import { createClient } from '@supabase/supabase-js';
import getTime from '@/app/actions/getTime';
import { unstable_cache } from 'next/cache';

async function getCachedSongs(today) {
    // Create a Supabase client for server-side public queries
    // Use service role key if available (bypasses RLS), otherwise use anon key
    // Service role key should be in .env.local as SUPABASE_SERVICE_ROLE_KEY
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey
    );

    const { data: songs, error } = await supabase
        .from('Songs')
        .select('id, title, artist, cover_art, votee, user_id')
        .eq('date', today);

    if (error) {
        console.error('Error fetching songs:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return null;
    }

    return songs;
}

export default async function TodaySubmits() {
    const today = getTime().tehranNow;
    
    // Cache the query results for 1 hour (3600 seconds)
    // Include date in cache key to ensure fresh data each day
    const songs = await unstable_cache(
        async () => getCachedSongs(today),
        ['today-submits', today],
        {
            revalidate: 1800,
            tags: ['today-submits']
        }
    )();
    
    return songs;

}