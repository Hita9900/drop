import { signOut } from '../../actions/signOut.js';
import { ButtonStandard } from '@/app/ui/Buttons.js';
import ProfileInfoCard from '@/app/ui/ProfileInfoCard.js';


export const metadata = {
  title: "Drop | Profile",
  description: ":3",
};

export default function Profile() {

  return (
    <div className='flex justify-center items-center flex-col'>
      <p className='mb-5'>Profile</p>
      <ProfileInfoCard />

      <form action={signOut}>
        <ButtonStandard title="Sign out" />
      </form>
    </div>
  );
}
