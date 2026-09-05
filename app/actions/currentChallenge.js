import { createClient } from '@/app/(auth)/utils/supabase/server';

export async function currentChallenge(){


    const supabase = await createClient();
    const { data: challenge, error: challengeError } = await supabase
        .from('Challenges')
        .select('*')
        .eq('isActive', true)
        .single()
    
        if(challengeError)
            return { success: false, challengeError};
        
        else 
            return{success:true, challenge};
}

export async function currentRegister() {
    

    const supabase = await createClient();
    const { data: challenge, error: challengeError } = await supabase
        .from('Challenges')
        .select('*')
        .eq('isReg', true)
        .single()
    
        if(challengeError)
            return { success: false, challengeError};
        
        else 
            return{success:true, challenge};
    
}