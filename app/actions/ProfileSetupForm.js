"use client";

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';

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
];

// Only avatars that exist in /public/images as avaX.png
const availableAvatars = [1, 2, 3];

export default function ProfileSetupForm({ setProfileData }) {
  const [state, formAction] = useFormState(setProfileData, { error: null, success: false });
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [avatar, setAvatar] = useState(availableAvatars[0]);

  useEffect(() => {
    // Initialize with a random combo when the form first loads
    randomizeWord1();
    randomizeWord2();
  }, []);

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
        <label htmlFor="word1" className="font-medium">
          Display Name
        </label>

        <div className="flex items-center gap-2">
          <input
            id="word1"
            name="word1"
            type="text"
            value={word1}
            onChange={(e) => setWord1(e.target.value)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 bg-black/20 text-white"
            placeholder="first word (e.g. booze)"
          />
          <button
            type="button"
            onClick={randomizeWord1}
            className="rounded bg-gray-700 px-3 py-2 text-sm text-white hover:bg-gray-600"
          >
            Random
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="word2"
            name="word2"
            type="text"
            value={word2}
            onChange={(e) => setWord2(e.target.value)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 bg-black/20 text-white"
            placeholder="second word (e.g. master)"
          />
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
            {availableAvatars.map((value) => (
              <option key={value} value={value}>
                Avatar {value}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <Image
              src={`/images/ava${avatar}.png`}
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
