"use client";

import { useState, useEffect, useActionState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setProfileData } from '@/app/actions/setProfileData';
import { toast } from 'react-toastify';

const adjectives = [
  'booze',
  'time',
  'shadow',
  'storm',
  'lucky',
  'silent',
  'wild',
  'cosmic',
  'neon',
  'midnight',
  'time',
];

const nouns = [
  'master',
  'killer',
  'rider',
  'wizard',
  'ninja',
  'pirate',
  'panther',
  'ghost',
  'sniper',
  'wanderer',
  'lady',
];

// Avatar IDs and their display labels for the dropdown
const avatarOptions = [
  { id: 1, label: '1 blue headband guy' },
  { id: 2, label: '2 pink buzzcut guy' },
  { id: 3, label: '3 bald glasses v-neck' },
  { id: 4, label: '4 six-pack beanie guy' },
  { id: 5, label: '5 pink buzzcut gal' },
  { id: 6, label: '6 sunglasses beared guy' },
  { id: 7, label: '7 dress n glasses gal' },
  { id: 8, label: '8 heart-eyed redhead gal' },
  { id: 9, label: '9 green beard n boob' },
  { id: 10, label: '10 stuble and bra beanie' },
  { id: 11, label: '11 eyelash bald guy' },
  { id: 12, label: '12 bun hair n glasses gal' },
  { id: 13, label: '13 awkward beanie guy' },
  { id: 14, label: '14 really ugly gal' },
  { id: 15, label: '15 blue bob n tie gal' },
  { id: 16, label: '16 meditating beanie gal' },
  { id: 17, label: '17 yellow buzcut stuble guy' },
  { id: 18, label: '18 orange buzzcut bra gal' },
  { id: 19, label: '19 really ugly gal 2' },
  { id: 20, label: '20 total naked guy' },
];

const availableAvatars = avatarOptions.map((opt) => opt.id);

export default function Profile() {
  const [state, formAction] = useActionState(setProfileData, { error: null, success: false });
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [avatar, setAvatar] = useState(availableAvatars[0]);
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize with a random combo when the form first loads
    randomizeWord1();
    randomizeWord2();
  }, []);

  useEffect(() => {
    if (state?.success && !state.error && !hasRedirected) {
      setHasRedirected(true);
      toast.success('profile saved!');
      router.push('/profile');
    }
  }, [state, hasRedirected, router]);

  function randomizeWord1() {
    const random = adjectives[Math.floor(Math.random() * adjectives.length)];
    setWord1(random);
  }

  function randomizeWord2() {
    const random = nouns[Math.floor(Math.random() * nouns.length)];
    setWord2(random);
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <span className="font-medium">
          Display Name
        </span>

        {/* Hidden inputs that actually submit to the server */}
        <input type="hidden" name="word1" value={word1} />
        <input type="hidden" name="word2" value={word2} />

        <div className="flex items-center gap-2">
          <div className="flex-1 rounded border border-gray-300 px-3 py-2 bg-black/20 text-white">
            {word1}
          </div>
          <button
            type="button"
            onClick={randomizeWord1}
            className="rounded bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
          >
            Random
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 rounded border border-gray-300 px-3 py-2 bg-black/20 text-white">
            {word2}
          </div>
          <button
            type="button"
            onClick={randomizeWord2}
            className="rounded bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
          >
            Random
          </button>
        </div>

        <p className="text-sm text-gray-400">
          Your final username will look like: <span className="font-semibold">{word1 || 'first'} {word2 || 'second'}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="avatar" className="font-medium">
          Avatar
        </label>

        <div className="flex items-center gap-4">
          <select
            id="avatar"
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(Number(e.target.value))}
            className="rounded border border-gray-300 bg-black/20 px-3 py-2 text-white"
          >
            {avatarOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <Image
              src={`/images/ava${avatar}.svg`}
              alt={`Avatar ${avatar}`}
              width={60}
              height={60}
              className="rounded-full border border-gray-500"
            />
          </div>
        </div>

        <p className="text-sm text-gray-400">Scroll the dropdown to see more avatar options.</p>
      </div>

      {state?.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}
      {state?.success && !state.error && (
        <p className="text-sm text-green-400">Profile saved!</p>
      )}

      <button
        type="submit"
        className="mt-2 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
      >
        Save Profile
      </button>
    </form>
  );
}