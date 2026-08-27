'use client';

import { toast } from 'react-toastify';
import { useState, useTransition } from 'react';
import { SubmitEntry } from '@/app/actions/submitEntry.js';
import { useUser } from '@/app/context/UserContext';
import { PromptCompact } from '@/app/ui/Prompt';
import { useTranslations, useLocale } from 'next-intl';

export default function SpotifyPreview() {
  const locale = useLocale();
  const t = useTranslations('Submit');

  const [url, setUrl] = useState('');
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(null);
  const [trackId, settrackId] = useState(null);
  const [isPending, startTransition] = useTransition();

  const profile = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    
    const trackId = url.split('/track/')[1]?.split('?')[0];
    if (!trackId || trackId.length !== 22) {
        setError('Invalid Spotify track URL');
        setLoading(false);
        return;
    }

    setLoading(true);
    setError(null);
    setTrack(null);

    try {
        const response = await fetch('/api/spotify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error || 'Something went wrong');
            return;
        }

        setTrack(data);
        
        if (data.date) {
            const extractedYear = data.date.split('-')[0];
            setYear(extractedYear);
        }
        settrackId(trackId)

    } catch (err) {
        setError('Network error, check your connection.');
    } finally {
        setLoading(false);
    }
};
  const handleSaveToDatabase = () => {
    if (!track) return;

    startTransition(async () => {
      const result = await SubmitEntry({
        title: track.title,
        artist: track.artist,
        track_Id: trackId,
        year: year || null,
        genres: null,
        duration: null,
        user_id: profile.id,
        cover_art: track.image || null,
      });

      if (result.success) {
        toast.success('Song saved successfully!');
        setTrack(null);
        setUrl('');
        setYear(null);
      } else {
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
            className={`bg-primary-light p-3 text-primary-dark col-span-3 rounded-lg text-small textbox-shadow ${locale === 'fa' ? 'font-yekan' : ''
              }`}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('submitPlaceHolder')}
          />

          <button
            className={`button col-span-2 ${locale === 'fa' ? 'font-yekan pt-1!' : '' } ${ loading ? 'bg-[#484c43]! cursor-not-allowed! border-none! text-white/50!' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Loading...'
              : t('submitPreviewButton')}
          </button>

        </div>
      </form>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {track && (
        <>
          <div className="grid grid-cols-2 my-14 submitShade">

            {track.image && (
              <div className="col-1 flex justify-end">
                <img
                  src={track.image}
                  alt={`${track.title} by ${track.artist}`}
                  width="128"
                  height="128"
                />
              </div>
            )}

            <div className={`col-2 flex justify-end flex-col ${locale === 'fa' ? 'pr-5' : 'pl-5'}`}>
              <h2 className="text-header">{track.title}</h2>
              <p className="text-body font-light"> By {track.artist}</p>

              {track.date && (
                <p className="text-small text-primary-accent opacity-80">
                  {year}
                </p>
              )}
            </div>

          </div>

          <div className="text-center">
            <p
              className={`leading-tight mb-5 ${locale === 'fa' ? 'font-yekan' : ''
                }`}
            >
              {t('RUSureMessage')}
            </p>

            <button
              onClick={handleSaveToDatabase}
              disabled={isPending}
              className={`button w-full ${isPending
                ? 'opacity-50'
                : 'bg-primary-accent'
                } ${locale === 'fa' ? 'font-yekan pt-1!' : ''
                }`}
            >
              {isPending
                ? t('submitPendingButton')
                : t('submitSubmitButton')}
            </button>
          </div>
        </>
      )}
    </>
  );
}