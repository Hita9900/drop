'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function ClientWeeklyLeaderboard({ users }) {
    const numofUsers = users.length;
    const t = useTranslations('LeaderBoard');
    const locale = useLocale();

    if (numofUsers <= 0) {return (<div className='mx-auto max-w-xl'>
        <h2 className={`text-header ${locale === 'fa' ? 'font-platinum' : ''}`}>{t('LeaderBoard')}</h2>
        <p className={`text-small mb-4 opacity-80  ${locale === 'fa' ? 'font-yekan pt-2' : ''}`}>{t('LeaderBoardDesc')}</p>
        <h3 className='text-header flex justify-center items-center rounded-xl h-18 bg-primary-light/5'>No one played Recently</h3>
    </div>)}


    return (
        <div className='mx-auto max-w-xl'>
            <h2 className={`text-header ${locale === 'fa' ? 'font-platinum' : ''}`}>{t('LeaderBoard')}</h2>
            <p className={`text-small mb-4 opacity-80  ${locale === 'fa' ? 'font-yekan pt-2' : ''}`}>{t('LeaderBoardDesc')}</p>
            {numofUsers > 1 ? (<>
                <div className='overflow-hidden rounded-xl'>
                    {users.map((user, index) => (<div key={index}>
                        {index === 0 ?
                            (<div key={index} className='mx-auto grid grid-cols-6 gap-0 max-w-xl bg-shade-glass pb-4 px-4'>
                                <div className='col-span-6 flex flex-col items-center pt-12 pb-6'>
                                    <Image className='rounded-full bg-primary-accent mb-4 topplayer-boxshadow' src={'/images/ava' + user.avatar + '.svg'} width={80} height={80} alt={user.username + `'s profile`} />
                                    <br />
                                    <div className='flex justify-center items-center flex-col'>
                                        <p className='col-1 flex items-center justify-end font-bold text-5xl h-14 opacity-40'>#{index + 1}&nbsp;</p>
                                        <p>{user.username}</p>
                                        <p className={`text-small opacity-80 ${locale ==='fa'?'font-yekan':''}`}>{user.total_votes} {t('Points')}</p>
                                    </div>
                                </div>
                                <div className={`col-1 flex items-center justify-end opacity-40 text-small  ${locale === 'fa' ? 'font-yekan' : ''}`}>#</div>
                                <div className='col-2'></div>
                                <div className={`col-span-3 flex items-center text-small opacity-40 ${locale === 'fa' ? 'font-yekan' : ''}`}>{t('Username')}</div>
                                <div className={`col-start-6 flex text-small opacity-40 ${locale === 'fa' ? 'font-yekan' : ''}`}>{t('Points')}</div>
                            </div>)
                            :
                            (<div key={index} className='mx-auto grid grid-cols-6 gap-0 max-w-xl bg-shade-glass pb-4  px-4'>
                                <div className='col-1 flex items-center justify-end font-bold mr-[-10px] text-5xl h-14 opacity-40'>{index + 1}</div>
                                <div className='col-2 items-center flex'><Image className='rounded-full bg-primary-accent-shade' src={'/images/ava' + user.avatar + '.svg'} width={40} height={40} alt={user.username + `'s profile`} /></div>
                                <div className='col-span-3 flex items-center text-body'>{user.username}</div>
                                <div className='col-start-6 flex items-center justify-center text-header font-semibold'>{user.total_votes ? user.total_votes : '0'}</div>
                            </div>)}
                    </div>))}
                </div>
            </>) : (<div className='overflow-hidden rounded-xl'>
                {users.map((user, index) => (<div key={index}>
                    <div key={index} className='mx-auto grid grid-cols-6 gap-0 max-w-xl bg-shade-glass pb-4 px-4'>
                                <div className='col-span-6 flex flex-col items-center pt-12 pb-6'>
                                    <Image className='rounded-full bg-primary-accent mb-4 topplayer-boxshadow' src={'/images/ava' + user.avatar + '.svg'} width={80} height={80} alt={user.username + `'s profile`} />
                                    <br />
                                    <div className='flex justify-center items-center flex-col'>
                                        <p className='col-1 flex items-center justify-end font-bold text-5xl h-14 opacity-40'>#{index + 1}&nbsp;</p>
                                        <p>{user.username}</p>
                                        <p className={`text-small opacity-80 ${locale ==='fa'?'font-yekan':''}`}>{user.total_votes} {t('Points')}</p>
                                    </div>
                                </div>
                            </div>
                </div>))}
            </div>)}
        </div>
    );
}