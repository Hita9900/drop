import TodaySubmits from "../actions/TodaySubmits";
import Image from 'next/image';
import { createClient } from '@/app/(auth)/utils/supabase/server';
import VoteButton from '../ui/VoteButton';
import TopMenu from "../ui/TopMenu";
import { Frown, InfoIcon } from "lucide-react";

export default async function votePage() {
    const songs = await TodaySubmits();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!songs || songs.length === 0) {
        return <div className="p-4">No songs submitted today.</div>;
    }
    
    if (!user) {
        return <div className="p-4">Please log in to vote.</div>;
    }
    
    // Filter out songs where current user is the submitter
    const filteredSongs = songs.filter(song => song.user_id !== user.id);
    
    // Split into voted and not voted
    const votedSongs = filteredSongs.filter(song => 
        song.votee && Array.isArray(song.votee) && song.votee.includes(user.id)
    );
    
    const notVotedSongs = filteredSongs.filter(song => 
        !song.votee || !Array.isArray(song.votee) || !song.votee.includes(user.id)
    );
    
    return (
        <>
        <TopMenu/>
        
        
        <div className="p-4">
            {/* Voted Songs List */}
            {votedSongs.length > 0 && (

                
                <div className="mb-10">
                    <h3 className='font-wildworld text-header pt-10'>VOTING</h3>
                    <p className="font-light text-small">more songs will be added throughout the day</p>
                    <div className="flex text-small mb-14 font-medium"><span className="mt-[4px]"><InfoIcon size={16} color="var(--color-primary-accent)"/></span><p>&nbsp;you can’t take back your votes!</p></div>

                    <h2 className="text-header mb-6">Your Votes Today</h2>
                    {votedSongs.map((song) => (
                        <div key={song.id} className="pb-4 flex items-center opacity-80">
                            <Image 
                                src={song.cover_art} 
                                width={50} 
                                height={50} 
                                alt={song.title + " by " + song.artist} 
                                className="mr-3"
                            />
                            <div className="flex-1">
                                <p className="text-body">{song.title}</p>
                                <p className="text-small opacity-60">{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Not Voted Songs List */}
            {notVotedSongs.length > 0 && (
                <div>
                        <h2 className="text-header mb-6">Available to vote</h2>
                    {notVotedSongs.map((song) => (
                        <div key={song.id} className="pb-4 flex items-center">
                            <Image 
                                src={song.cover_art} 
                                width={50} 
                                height={50} 
                                alt={song.title + " by " + song.artist} 
                                className="mr-3"
                            />
                            <div className="flex-1">
                                <p className="text-body">{song.title}</p>
                                <p className="text-small opacity-60">{song.artist}</p>
                            </div>
                            <VoteButton songId={song.id} />
                        </div>
                    ))}
                </div>
            )}
            
            {votedSongs.length === 0 && notVotedSongs.length === 0 && (
                <div className="p-4 pt-10"><Frown size={30}/><p className="pt-3">Nobody has submitted anything yet</p> <p className="text-small opacity-80">except you of course</p></div>
            )}
        </div>
        </>
    );
}