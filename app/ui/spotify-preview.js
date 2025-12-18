'use client';

import { toast } from 'react-toastify'
import { useState } from 'react';
import { formatDuration } from '../(auth)/utils/formatDuration.js';
import { useTransition } from 'react';
import { SubmitEntry } from '@/app/actions/submitEntry.js';
import { useUser } from '@/app/context/UserContext';
import { PromptCompact } from '@/app/ui/Prompt';
import {useTranslations} from 'next-intl';
import { useLocale } from 'next-intl';




export default function SpotifyPreview() {
  const locale = useLocale();
  const t = useTranslations('Submit');
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
            className={`bg-primary-light p-3 text-primary-dark col-span-3 rounded-lg text-small textbox-shadow ${ locale ==='fa'? 'font-yekan':''}`}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('submitPlaceHolder')}
          />
          <button className={`button col-span-2 ${locale === 'fa'? 'font-yekan pt-1!':''}`} type="submit">{t('submitPreviewButton')}</button>
        </div>
      </form>


      {error && <p style={{ color: 'red' }}>{error}</p>}
      {track && (<>
        <div className='grid grid-cols-2 my-14 submitShade'>
          {track.coverArt && <div className="col-1 flex justify-end "><img src={track.coverArt} alt={track.title + " by " + track.artist} width="128" height="128" /></div>}
          <div className={`col-2 flex justify-end flex-col ${locale === 'fa'? 'pr-5': 'pl-5'}`}>
            <h2 className='text-header'>{track.title}</h2>
            <p className='text-body font-light'>By {track.artist}</p>
            <p className='text-small text-primary-accent opacity-80'>{track.year}</p>
          </div>
        </div>
    <div className='text-center'>
      <p className={`leading-tight mb-5 ${ locale ==='fa'? 'font-yekan':''}`}>{t('RUSureMessage')}</p>
      <button
        onClick={handleSaveToDatabase}
        disabled={isPending}
        className={`button w-full ${isPending ? 'opacity-50' : 'bg-primary-accent'} ${locale === 'fa'? 'font-yekan pt-1!':''}`}>
        {isPending ? t('submitPendingButton') : t('submitSubmitButton')}
      </button>
    </div></>


      )}
    </>
  );
}