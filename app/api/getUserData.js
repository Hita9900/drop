import { createClient } from '../(auth)/utils/supabase/server'

export default async function getUserData() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();
if (!user) redirect('/');


  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  return profile;
}