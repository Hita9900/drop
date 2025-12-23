"use client";

import { useState, useEffect, useActionState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setProfileData } from '@/app/actions/setProfileData';
import { toast } from 'react-toastify';
import { Dices } from 'lucide-react';

const adjectives = [
  'Booze',
  'Time',
  'Shadow',
  'Storm',
  'Lucky',
  'Silent',
  'Wild',
  'Cosmic',
  'Neon',
  'Midnight',
  'Dream',
];

const nouns = [
  'Master',
  'Killer',
  'Rider',
  'Wizard',
  'Ninja',
  'Pirate',
  'Catcher',
  'Ghost',
  'Sniper',
  'Wanderer',
  'Lady',
];

// Avatar IDs and their display labels for the dropdown
const avatarOptions = [
  { id: 1, label: 'blue headband guy' },
  { id: 2, label: 'pink buzzcut guy' },
  { id: 3, label: 'bald glasses v-neck' },
  { id: 4, label: 'six-pack beanie guy' },
  { id: 5, label: 'pink buzzcut gal' },
  { id: 6, label: 'sunglasses beared guy' },
  { id: 7, label: 'dress n glasses gal' },
  { id: 8, label: 'heart-eyed redhead gal' },
  { id: 9, label: 'green beard n boob' },
  { id: 10, label: 'stuble and bra beanie' },
  { id: 11, label: 'eyelash bald guy' },
  { id: 12, label: 'bun hair n glasses gal' },
  { id: 13, label: 'awkward beanie guy' },
  { id: 14, label: 'really ugly gal' },
  { id: 15, label: 'blue bob n tie gal' },
  { id: 16, label: 'meditating beanie gal' },
  { id: 17, label: 'yellow buzcut stuble guy' },
  { id: 18, label: 'orange buzzcut bra gal' },
  { id: 19, label: 'really ugly gal 2' },
  { id: 20, label: 'total naked guy' },
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
    <form action={formAction} className="flex flex-col gap-4 p-4  mx-auto max-w-xl">
      <div className="flex flex-col gap-2">
        <span className="text-header">
          Username
        </span>

        <div className='text-center'>
        <p className="text-small text-gray-400">
          Your final username:
        </p>
        <p className="text-header"> {word1 || 'first'} {word2 || 'second'}</p>
        </div>    

        {/* Hidden inputs that actually submit to the server */}
        <input type="hidden" name="word1" value={word1} />
        <input type="hidden" name="word2" value={word2} />

        <div className="flex items-center gap-0 bg-black/20 rounded-full">
          <div className="flex-1 flex items-center indent-4 text-white h-12 text-body">
            {word1}
          </div>
          <button
            type="button"
            onClick={randomizeWord1}
            className="bg-primary-accent flex items-center mx-1 h-10 px-4 text-primary-dark rounded-full"
          >
            Random
            &nbsp;<Dices size={16}/>
          </button>
            
        </div>

        <div className="flex items-center gap-0 bg-black/20 rounded-full">
          <div className="flex-1 flex items-center indent-4 text-white h-12 text-body">
            {word2}
          </div>
          <button
            type="button"
            onClick={randomizeWord2}
            className="bg-primary-accent flex items-center mx-1 h-10 px-4 text-primary-dark rounded-full"
          >
            Random
            &nbsp;<Dices size={16}/>
          </button>
        </div>
      </div>

      

      <div className="flex flex-col gap-2 mt-10 ">
  <label className="text-header text-center">Avatar</label>
  
  {/* Hidden input for form submission */}
  <input type="hidden" name="avatar" value={avatar} />

  {/* larger preview of selected */}
  <div className="flex justify-center my-4">
    <Image
      src={`/images/ava${avatar}.svg`}
      alt="Selected avatar"
      width={160}
      height={160}
      className="rounded-full halo bg-primary-accent"
    />
  </div>

  {/* Grid of avatars */}
  <div className="grid grid-cols-5 sm:grid-cols-10 gap-4 max-h-96 overflow-y-auto p-4 glass-bg rounded-xl">
    {avatarOptions.map((opt) => (
      <button
        key={opt.id}
        type="button"
        onClick={() => setAvatar(opt.id)}
        className={`relative justify-center flex rounded-full overflow-hidden transition-all ${
          avatar === opt.id 
            ? 'ring-4 ring-primary-accent bg-primary-accent-shade scale-110' 
            : 'hover:scale-105 opacity-60'
        }`}
      >
        <Image
          src={`/images/ava${opt.id}.svg`}
          alt={opt.label}
          width={60}
          height={60}
          className="object-cover"
        />
      </button>
    ))}
  </div>

  

  {/*<p className="text-sm text-gray-400">
    Selected: {avatarOptions.find(o => o.id === avatar)?.label}
  </p>*/}
</div>
        
        


      {state?.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}
      {state?.success && !state.error && (
        <p className="text-sm text-green-400">Profile saved!</p>
      )}

      <button
        type="submit"
        className="w-full button"
      >
        Save Profile
      </button>
    </form>
  );
}