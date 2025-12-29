import LogoTopBar from '@/app/ui/LogoTopBar.js';
import { signOut } from '../../actions/signOut.js';
import { ButtonStandard } from '@/app/ui/Buttons.js';
import ProfileInfoCard from '@/app/ui/ProfileInfoCard.js';
import {useTranslations} from 'next-intl';
import { useLocale } from 'next-intl';


export const metadata = {
  title: "Drop | Profile",
  description: ":3",
};

export default function Profile() {
  const t = useTranslations('Profile');
  const locale = useLocale();

  return (
    <div className='flex justify-center items-center flex-col'>
      <LogoTopBar/>
      <ProfileInfoCard />

      <button
        onClick={signOut}
        className={`bg-secondary-accent/10 w-full max-w-md rounded-xl p-2.5 text-small text-secondary-accent hover:bg-secondary-accent/50 hover:text-primary-light ${locale === 'fa'? 'font-yekan pt-1!':''}`}>
          {t('signOutButton')}
      </button>
    </div>
  );
}
