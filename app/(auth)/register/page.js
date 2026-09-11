//import TopMenu from '@/app/ui/TopMenu';
//import { useTranslations } from 'next-intl';
//import { useLocale } from 'next-intl';
import { currentRegister } from '@/app/actions/currentChallenge';
import RegisterForm from '@/app/actions/RegisterForm';
import LogoTopBar from '@/app/ui/LogoTopBar';
import { Globe, Plane, Send } from 'lucide-react';

export default async function register() {
    const info = await currentRegister();

    if (!info.success) {
        return (
            <>
                <div className='mx-auto max-w-xl'>
                    <LogoTopBar />
                    <p className={`font-wildworld text-header pt-10 mb-4`}>OH NO..</p>
                    <p>the time for Registering has ended</p>

                    <div className='py-2'></div>

                    <p className='text-small opacity-70'>stay informed for next challenges. they are announced in the links bellow:</p>
                    <div className='flex flex-col gap-2 mt-2'>
                        <a href='https://dropinfo.vercel.app/en/Timetable' target='_blank' className='text-primary-accent! flex items-center p-1.5 rounded-lg border-2 border-primary-accent w-max text-sm hover:bg-primary-accent hover:text-primary-dark!'><Globe size={16} /> &nbsp; <span>official drop website</span></a>
                        <a href='https://t.me/DropChallenge' target='_blank' className='text-primary-accent! flex items-center p-1.5 rounded-lg border-2 border-primary-accent w-max text-sm hover:bg-primary-accent hover:text-primary-dark!'><Send size={16} /> &nbsp; <span> Telegram Channel </span></a>
                    </div>

                </div >
            </>
        );
    }

    const challenge = info.challenge;

    return (
        <>
            <div className='mx-auto max-w-xl'>
                <LogoTopBar />
                <p className={`font-wildworld text-header pt-10 mb-4`}>REGISTRATION</p>

                <p className='text-small indent-2 opacity-50'>you are registering for</p>
                <p className='bg-[#89aa132b] py-0.5 px-2 w-fit rounded-lg'>{challenge.desc}</p>
                <div className='py-2'></div>
                for more information check out the <a href='https://dropinfo.vercel.app/en/Timetable' target='_blank'> <span className='underline italic hover:text-primary-accent'>official drop website</span></a>

                <p>Are you going to commit to this challenge?</p>

                <RegisterForm challengeId={challenge.id} />
            </div>
        </>
    );
}