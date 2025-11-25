import { signOut } from './actions.js';
import Image from 'next/image';
import ProfileData from './profileData';


export const metadata = {
  title: "Drop | Profile",
  description: ":3",
};

export default function Profile() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <p className='mb-5'>Profile</p>
      <div className='mb-10 flex justify-center items-center flex-col'>
        <Image className="w-10" src="/images/icon.png" width={60} height={60} alt='profile image' />
        <p>username</p>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <ProfileData />
      </div>

      <form action={signOut}>
        <button className='bg-primary-accent hover:bg-primary-accent-shade text-primary-dark' type="submit">
          log out ig?
        </button>
      </form>
      <a href='/'>home or something</a>
    </div>
  );
}
