//import TopMenu from '@/app/ui/TopMenu';
//import { useTranslations } from 'next-intl';
//import { useLocale } from 'next-intl';
import { currentRegister } from '@/app/actions/currentChallenge';
import RegisterForm from '@/app/actions/RegisterForm';
import LogoTopBar from '@/app/ui/LogoTopBar';

export default async function register() {
    const info = await currentRegister();

    if (!info.success) {
        return (
            <p>the registration time is over</p>
        );
    }

    const challenge = info.challenge;

    return (
        <>
        <div className='mx-auto max-w-xl'>
        <LogoTopBar/>
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