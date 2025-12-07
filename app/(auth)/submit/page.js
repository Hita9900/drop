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
      <Prompt/>
      <SpotifyPreview />
    </>
  );
}

