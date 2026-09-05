'use server';

import { createClient } from '@/app/(auth)/utils/supabase/server';

export async function RegisterChallengerForUser(previousState, formData) {
    const supabase = await createClient();
    const challengeId = Number(formData.get('challengeId'));

    const { data: { user }, error: userError} = await supabase.auth.getUser();

    if (userError || !user) {
        return {
            success: false,
            error: 'Not authenticated'
        };
    }

    const {
        data: profile,
        error: profileError
    } = await supabase
        .from('profiles')
        .select('challenges')
        .eq('id', user.id)
        .single();

    if (profileError) {
        return {
            success: false,
            error: profileError.message
        };
    }

    const challenges = (profile.challenges || []).map(Number);

    if (challenges.includes(challengeId)) {
        return {
            success: false,
            error: 'Already registered for this challenge'
        };
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            challenges: [...challenges, challengeId]
        })
        .eq('id', user.id);

    if (error) {
        return {
            success: false,
            error: error.message
        };
    }

    return {
        success: true,
        error: null
    };
}