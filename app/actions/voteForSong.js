'use server';
import { createClient } from '@/app/(auth)/utils/supabase/server';
import { revalidateTag } from 'next/cache';

export async function voteForSong(songId) {
    const supabase = await createClient();
    console.log("Voting for song ID:", songId);
    console.log("Song ID type:", typeof songId);
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        console.error('User error:', userError);
        return { success: false, error: 'Not authenticated' };
    }
    
    console.log("Current user ID:", user.id);
    
    // Get the current song to check its votee array
    const { data: song, error: fetchError } = await supabase
        .from('Songs')
        .select('id, votee, user_id')
        .eq('id', songId)
        .single();

        console.log("IM THE DATA"+ song);

    if (fetchError) {
        console.error('Error fetching song:', fetchError);
        console.error('Error code:', fetchError.code);
        console.error('Error message:', fetchError.message);
        console.error('Error details:', fetchError.details);
        console.error('Song ID received:', songId);
        console.error('Song ID type:', typeof songId);
        return { success: false, error: `Database error: ${fetchError.message}` };
    }
    
    if (!song) {
        console.error('No song found for ID:', songId);
        // Try to verify the ID format - maybe it's a string vs UUID issue
        console.error('Attempting to find any songs to verify connection...');
        const { data: testSongs } = await supabase
            .from('Songs')
            .select('id')
            .limit(1);
        console.error('Test query result:', testSongs);
        return { success: false, error: 'Song not found. Please refresh the page and try again.' };
    }
    
    console.log("Found song:", song);
    
    // Check if user is the submitter
    if (song.user_id === user.id) {
        return { success: false, error: 'Cannot vote for your own submission' };
    }
    
    // Check if already voted
    const currentVotee = song.votee || [];
    if (currentVotee.includes(user.id)) {
        return { success: false, error: 'Already voted for this song' };
    }
    
    // Add user ID to votee array
    const updatedVotee = [...currentVotee, user.id];
    
    const { error: updateError } = await supabase
        .from('Songs')
        .update({ votee: updatedVotee })
        .eq('id', songId);
    
    if (updateError) {
        console.error('Error updating vote:', updateError);
        return { success: false, error: 'Failed to vote' };
    }
    
    // Revalidate the cache
    revalidateTag('today-submits');
    
    return { success: true };
}

