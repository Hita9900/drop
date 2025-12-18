import SpotifyPreview from '@/app/ui/spotify-preview';
import TopMenu from '@/app/ui/TopMenu';
import {useTranslations} from 'next-intl';
import { useLocale } from 'next-intl';


export const metadata = {
  title: "Drop | Submit",
  description: ":3",
};

export default function Submit() {
  const locale = useLocale();
  const t = useTranslations('Submit');
  return (
    <>
    <TopMenu/>
    <div className='mx-auto max-w-xl'>
    <p className={`font-wildworld text-header pt-10  ${ locale ==='fa'? 'font-platinum text-2xl!':''}`}>{t('submitTitle')}</p>
    <p className={`text-small mt-2 mb-10 ${ locale ==='fa'? 'font-yekan':''}`}>{t('submitDesc')} <a className='underline! text-primary-accent! italic! hover:text-primary-accent-shade!' href='#'>{t('submitDescButton')}</a></p>
      <SpotifyPreview />
      </div>
      </>
  );
}

