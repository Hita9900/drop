'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/app/(auth)/utils/supabase/server';

export async function setProfileData(prevState, formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const rawWord1 = formData.get('word1');
  const rawWord2 = formData.get('word2');
  const word1 = rawWord1 ? rawWord1.toString().trim().toLowerCase() : '';
  const word2 = rawWord2 ? rawWord2.toString().trim().toLowerCase() : '';
  const avatarRaw = formData.get('avatar');
  const avatar = avatarRaw ? Number(avatarRaw) : null;

  if (!word1 || !word2) {
    return { error: 'Please enter both words for your username.', success: false };
  }

  const display_username = `${word1} ${word2}`;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      display_username,
      ...(avatar !== null && !Number.isNaN(avatar) ? { avatar } : {}),
    })
    .eq('id', user.id);

  if (updateError) {
    // If you add a UNIQUE constraint on display_username in Supabase,
    // a duplicate username will throw Postgres error code 23505 here.
    if (updateError.code === '23505') {
      return {
        error: 'That username is already taken. Try another combination.',
        success: false,
      };
    }

    console.error(updateError);
    return { error: 'Unable to save your profile right now. Please try again.', success: false };
  }

  // Revalidate profile-related routes and the main root so that
  // any layouts/pages reading profile data get fresh content.
  revalidatePath('/profile'); // profile page
  revalidatePath('/'); // main root layout/page

  return { error: null, success: true };
}


