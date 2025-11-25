import { createClient } from '../utils/supabase/server'
import Image from 'next/image'

export default async function ProfileData() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session } } = await supabase.auth.getSession();
if (!session) redirect('/');


  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()


  const avatarUrl = "/images/ava" + profile?.avatar + ".png";

  return (
    <div>
      <Image
        src={avatarUrl || '/images/icon.png'}
        alt="Profile Avatar"
        width={40}
        height={40}
        className="avatar-image"
      />
      <p>username: {profile?.display_username}</p>
      <p>secret username: {profile?.secret_username}</p>
    </div>
  )
}