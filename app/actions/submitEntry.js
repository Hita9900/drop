'use server';
import { getToday } from './getToday';
//import GetDailyPrompt from '@/app/api/getDailyPrompt.js';
import { createClient } from '@/app/(auth)/utils/supabase/server';

export async function SubmitEntry(track) {
    const today = await getToday();
    //"day" is not nullable for test puposes set sample data
    //const day = GetDailyPrompt().day 
    // and since i dont remember check if its index or index+1;
    const day = 35;
    const supabase = await  createClient();
    
// Check if this song was already submitted by any user this year (Tehran time)
    const currentYear = today.split('-')[0]; // Extract year from 'yyyy-MM-dd' format
    const yearStart = `${currentYear}-01-01`;
    const yearEnd = `${parseInt(currentYear) + 1}-01-01`; // Start of next year
    const { data: existingSongThisYear, error: songCheckError } = await supabase
        .from('Songs')
        .select('id')
        .eq('track_Id', track.track_Id)
        .gte('date', yearStart)
        .lt('date', yearEnd)
        .single();

    if (songCheckError && songCheckError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected when no entry exists
        console.error('Error checking for existing song this year:', songCheckError);
        return { success: false, error: 'Failed to check for existing song' };
    }

    if (existingSongThisYear) {
        return { success: false, error: 'ExistsThisYear' };
    }
    // Check if user already submitted an entry for today (Tehran time)
    const { data: existingEntry, error: checkError } = await supabase
        .from('Songs')
        .select('id')
        .eq('user_id', track.user_id)
        .eq('date', today)
        .single();

    if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected when no entry exists
        console.error('Error checking for existing entry:', checkError);
        return { success: false, error: 'Failed to check for existing entry' };
    }

    if (existingEntry) {
        return { success: false, error: 'AlreadySubmitted' };
    }
    

    const { data, error } = await supabase
    .from('Songs')
    .insert({
        title:  track.title,
        artist: track.artist,
        track_Id: track.track_Id,
        year: track.year || null,
        genres: track.genres || null,
        duration: track.duration,
        user_id: track.user_id,
        day: day,
        cover_art: track.cover_art})
    .select();

    if (error) {
        console.error('Supabase error:', error);
        return { success: false, error: error.message };}

    console.log('Track saved!');
    return { success: true, data };
}