'use client';

import { useState } from 'react';
import { formatDuration } from '../(auth)/utils/formatDuration.js';
import { useTransition } from 'react';
import { SubmitEntry } from '@/app/actions/submitEntry.js';
import { useUser } from '@/app/context/UserContext';



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
        alert('Track saved successfully!');
        setTrack(null);
        setUrl('');
      }
      else {
        alert('Error saving track: ' + result.error);
      }
    });
  };


  return (
    <div>
      <h1>Song Preview</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='bg-primary-light p-3 m-1 text-primary-dark'
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Spotify song link"
        />
        <button className='button' type="submit">Get Preview</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {track && (
        <div>
          <h2>{track.title}</h2>
          <p>Artist: {track.artist}</p>
          {track.genres && true ? <p>Genre: {track.genres.join(', ')}</p> : "Genre: No Genres Available"}
          <p>year: {track.year}</p>
          <p>Duratiuon: {formatDuration(track.duration_ms)}</p>
          {track.coverArt && <img src={track.coverArt} alt="Cover art" width="200" />}

          <div>
            <button
              onClick={handleSaveToDatabase}
              disabled={isPending}
              className={`button ${isPending ? 'opacity-50' : 'bg-primary-accent'}`}>
              {isPending ? 'Saving...' : 'Save to Database'}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}