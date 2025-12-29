'use client';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function ClientAllTimeLeaderboard({ users }) {
    const t = useTranslations('LeaderBoard');
    const locale = useLocale();
    
    return (
        <>
            <h2 className={`text-header mx-auto max-w-xl ${locale ==='fa'?'font-platinum':''}`}>{t('AllTimeTopPlayers')}</h2>
            <p className={`text-small mx-auto max-w-xl ${locale ==='fa'?'font-yekan':''}`}>{t('RefreshText')}</p>
            <div className='mx-auto grid grid-cols-5 gap-0 max-w-xl'>
                <div className={`col-1 flex items-center justify-center text-small opacity-40 h-10 ${locale ==='fa'?'font-yekan':''}`}>#</div>
                <div className={`col-span-3 flex items-center text-samll opacity-40 ${locale ==='fa'?'font-yekan':''}`}>{t('Username')}</div>
                <div className={`col-start-5 flex items-center justify-center text-small opacity-40 ${locale ==='fa'?'font-yekan':''}`}>{t('Points')}</div>
            </div>
            <div className=' rounded-xl overflow-hidden mx-auto max-w-xl'>
                {users.map((user, index) => (
                <div key={index} className=' grid grid-cols-5 gap-0 bg-shade-glass'>
                    <div className='col-1 flex items-center justify-center text-small opacity-80 h-14'>{index + 1}</div>
                    <div className='col-span-3 flex items-center text-body'> {user.username}</div>
                    <div className='col-start-5 flex items-center justify-center text-header font-semibold'>{user.total_votes ? user.total_votes : '0'}</div>
                </div>
            ))}
            </div>

        </>
    );
}