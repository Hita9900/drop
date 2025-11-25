import { signOut } from './actions.js';
import Image from 'next/image';
import ButtonStandard from '@/app/ui/Buttons.js';


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
      
      <form action={signOut}>
      
        <ButtonStandard title="Sign out"/>
      </form>
      </div>
  );
}
