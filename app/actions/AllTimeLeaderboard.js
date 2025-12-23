// app/ui/LeaderboardContent.js
import { getAllTimeLeaderboard } from '@/app/actions/getAllTimeLeaderboard';
import ClientAllTimeLeaderboard from '@/app/ui/ClientAllTimeLeaderboard';

export default async function AllTimeLeaderboard() {
    const users = await getAllTimeLeaderboard();
    return <ClientAllTimeLeaderboard users={users} />;
}   