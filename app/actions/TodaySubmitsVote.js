import { createServerClient } from '@supabase/ssr';

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

export default async function TodaySubmitsVote() {
  const { data, error } = await supabase
    .from('todays_songs')
    .select('*');

  if (error) {
    console.error('[TodaySubmitsVote]', error);
    throw error;
  }

  return data;
}