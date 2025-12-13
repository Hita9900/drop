import { getLeaderboardAllTime } from '@/app/actions/getLeaderboard';

export default async function LeaderboardAllTime() {
    const users = await getLeaderboardAllTime();
    //maybe later i filter this just to show 10 top users? idk
    return (
        <>
            <h2 className='text-header mx-auto max-w-xl'>All time top players</h2>
            <div className='mx-auto grid grid-cols-5 gap-0 max-w-xl'>
                <div className='col-1 flex items-center justify-center text-small opacity-40 h-10'>#</div>
                <div className='col-span-3 flex items-center text-samll opacity-40'>username</div>
                <div className='col-start-5 flex items-center justify-center text-small opacity-40'>points</div>
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
