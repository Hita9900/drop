import SpotifyPreview from '@/app/ui/spotify-preview';
import Prompt from '@/app/ui/Prompt';
import TopMenu from '@/app/ui/TopMenu';

export const metadata = {
  title: "Drop | Submit",
  description: ":3",
};

export default function Submit() {
  return (
    <>
    <TopMenu/>
    <div className='mx-auto max-w-xl'>
    <p className='font-wildworld text-header pt-10'>SUBMIT ENTRY</p>
    <p className='text-small mt-2 mb-10'>Paste the link and press preview, need more help for submitting? <a className='underline! text-primary-accent! italic! hover:text-primary-accent-shade!' href='#'>click here</a></p>
      <SpotifyPreview />
      </div>
      </>
  );
}

