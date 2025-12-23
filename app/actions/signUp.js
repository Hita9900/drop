'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../(auth)/utils/supabase/server.js'
import { redirect } from 'next/navigation.js'

export async function signup(prevState,formData) {
  const email = formData.get('email')
  const password = formData.get('password')

    // Basic validation
    if (!email || !email.includes('@') || email.length < 5) {
      return { message: 'Invalid email format' }
    }
    if (!password || password.length < 6) {
      return { message: 'Password must be at least 6 characters' }
    }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    console.log("error: ",error);
    return { message: error.message || 'Signup failed'} 
  }
  
  revalidatePath('/', 'layout')
  return { message: 'Check your email to Complete Sign Up' }

}