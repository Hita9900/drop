import TodaySubmits from "../actions/TodaySubmits";
import Image from 'next/image';
import { createClient } from '../(auth)/utils/supabase/server';
import VoteButton from '../ui/VoteButton';

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
        <div className="p-4">
            {/* Voted Songs List */}
            {votedSongs.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Voted Songs</h2>
                    {votedSongs.map((song) => (
                        <div key={song.id} className="py-2 flex items-center opacity-80">
                            <Image 
                                src={song.cover_art} 
                                width={50} 
                                height={50} 
                                alt={song.title + " by " + song.artist} 
                                className="mr-3"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{song.title}</p>
                                <p className="text-sm text-gray-600">by {song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Not Voted Songs List */}
            {notVotedSongs.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Available to Vote</h2>
                    {notVotedSongs.map((song) => (
                        <div key={song.id} className="py-2 flex items-center">
                            <Image 
                                src={song.cover_art} 
                                width={50} 
                                height={50} 
                                alt={song.title + " by " + song.artist} 
                                className="mr-3"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{song.title}</p>
                                <p className="text-sm text-gray-600">by {song.artist}</p>
                            </div>
                            <VoteButton songId={song.id} />
                        </div>
                    ))}
                </div>
            )}
            
            {votedSongs.length === 0 && notVotedSongs.length === 0 && (
                <div className="p-4">No songs available to vote on (excluding your own submissions).</div>
            )}
        </div>
    );
}