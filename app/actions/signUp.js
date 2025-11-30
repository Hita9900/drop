'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../(auth)/utils/supabase/server.js'

export async function signup(formData) {
  const supabase = await createClient()
  
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)
  console.log("data: ",data);


  if (error) {
    console.log("error: ",error.message);
  }
  console.log('done: '+ data);
  revalidatePath('/', 'layout')

}