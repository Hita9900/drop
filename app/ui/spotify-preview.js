'use client';

import { toast } from 'react-toastify'
import { useState } from 'react';
import { formatDuration } from '../(auth)/utils/formatDuration.js';
import { useTransition } from 'react';
import { SubmitEntry } from '@/app/actions/submitEntry.js';
import { useUser } from '@/app/context/UserContext';
import { PromptCompact } from '@/app/ui/Prompt';



export default function SpotifyPreview() {
  const [url, setUrl] = useState('');
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTrack(null);
    try {
      const res = await fetch(`/api/spotify-track?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setTrack(data);

      }
    } catch (err) {
      setError('Something went wrong');
    }

  };
  const profile = useUser();
  const handleSaveToDatabase = () => {
    if (!track) return;

    startTransition(async () => {
      const result = await SubmitEntry({
        title: track.title,
        artist: track.artist,
        track_Id: track.track_Id,
        year: track.year || null,
        genres: track.genres || null,
        duration: track.duration_ms,
        user_id: profile.id,
        cover_art: track.coverArt || null,
      });

      if (result.success) {
        toast.success('Song saved successfully!');
        setTrack(null);
        setUrl('');
      }
      else {
        toast.error('Error saving track: ' + result.error);
        }
    });
  };


  return (
    <>
      <PromptCompact />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-5 gap-2 sm:gap-2">

          <input
            className='bg-primary-light p-3 text-primary-dark col-span-3 rounded-lg text-small textbox-shadow'
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Spotify link"
          />
          <button className='button col-span-2' type="submit">Preview</button>
        </div>
      </form>


      {error && <p style={{ color: 'red' }}>{error}</p>}
      {track && (<>
        <div className='grid grid-cols-2 my-14 submitShade'>
          {track.coverArt && <div className="col-1 flex justify-end "><img src={track.coverArt} alt={track.title + " by " + track.artist} width="128" height="128" /></div>}
          <div className='col-2 flex justify-end flex-col pl-5'>
            <h2 className='text-header'>{track.title}</h2>
            <p className='text-body font-light'>By {track.artist}</p>
            <p className='text-small text-primary-accent opacity-80'>{track.year}</p>
          </div>
        </div>
    <div className='text-center'>
      <p className='leading-tight mb-5'>are you sure you want to submit this song?</p>
      <button
        onClick={handleSaveToDatabase}
        disabled={isPending}
        className={`button ${isPending ? 'opacity-50' : 'bg-primary-accent'}`+' w-full'}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </div></>


      )}
    </>
  );
}