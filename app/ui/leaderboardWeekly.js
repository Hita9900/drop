import { getWeeklyLeaderboard } from '@/app/actions/getWeeklyLeaderboard';
import Image from 'next/image';

export default async function LeaderboardWeekly() {
    const users = await getWeeklyLeaderboard();
    return (
        <div className='mx-auto max-w-xl'>
            <h2 className='text-header'>Leaderboard</h2>
            <p className='text-small mb-4'>top players of past 3 days</p>
            <div className='overflow-hidden rounded-xl'>
                {users.map((user, index) => (<div key={index}>
                    {index === 0 ?
                        (<div key={index} className='mx-auto grid grid-cols-6 gap-0 max-w-xl bg-shade-glass pb-4'>
                            <div className='col-span-6 flex flex-col items-center pt-12 pb-6'>
                                <Image className='rounded-full bg-primary-accent mb-4 topplayer-boxshadow' src={'/images/ava' + user.avatar + '.svg'} width={80} height={80} alt={user.username + `'s profile`} />
                                <br />
                                <div className='flex justify-center'><p className='leading-6 text-header font-bold'>#{index + 1}&nbsp;</p><p>{user.username}</p></div>
                            </div>
                            <div className='col-1 flex items-center justify-end opacity-40 text-small'>#</div>
                            <div className='col-2'></div>
                            <div className='col-span-3 flex items-center text-small opacity-40'>Name</div>
                            <div className='col-start-6 flex items-center text-small opacity-40'>Votes</div>
                        </div>)
                        :
                        (<div key={index} className='mx-auto grid grid-cols-6 gap-0 max-w-xl bg-shade-glass pb-4'>
                            <div className='col-1 flex items-center justify-end font-bold mr-[-10px] text-5xl h-14 opacity-40'>{index + 1}</div>
                            <div className='col-2 items-center flex'><Image className='rounded-full bg-primary-accent-shade' src={'/images/ava' + user.avatar + '.svg'} width={40} height={40} alt={user.username + `'s profile`} /></div>
                            <div className='col-span-3 flex items-center text-body'>{user.username}</div>
                            <div className='col-start-6 flex items-center justify-center text-header font-semibold'>{user.total_votes ? user.total_votes : '0'}</div>
                        </div>)}
                </div>))}
            </div>
        </div>
    );
}
