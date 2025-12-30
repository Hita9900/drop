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



async function fetchToday() {
  const { data, error } = await supabase
    .rpc('get_tehran_today'); 

  if (error) throw error;
  console.log('date: ' ,data)
  return data; // 'yyyy-mm-dd'
}

export const getToday = unstable_cache(
  fetchToday,
  ['tehran-today'],
  { revalidate: 900 }
);
