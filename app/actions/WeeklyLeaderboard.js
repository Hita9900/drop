// app/ui/LeaderboardContent.js
import { getWeeklyLeaderboard } from '@/app/actions/getWeeklyLeaderboard';
import ClientWeeklyLeaderboard from '@/app/ui/ClientWeeklyLeaderboard';

export default async function WeeklyLeaderboard() {
    const users = await getWeeklyLeaderboard();
    return <ClientWeeklyLeaderboard users={users} />;
}   