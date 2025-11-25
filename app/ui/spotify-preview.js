'use client';

import { useState } from 'react';
import {formatDuration} from '../(auth)/utils/secToMin.js';

export default function SpotifyPreview() {
  const [url, setUrl] = useState('');
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);

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
          <p>Genre: {track.genres}</p>
          <p>year: {track.year}</p>
          <p>ksdfga:{formatDuration(track.duration_ms)}</p>
          {track.coverArt && <img src={track.coverArt} alt="Cover art" width="200" />}
        </div>
      )}
    </div>
  );
}