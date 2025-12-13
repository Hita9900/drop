import TopMenu from "@/app/ui/TopMenu.js";
import { Prompt } from '@/app/ui/Prompt.js';
import TodaySubmitCard from "../ui/TodaySubmitCard";
import LeaderboardAllTime from "@/app/ui/leaderboardAll";
import LeaderboardWeekly from "@/app/ui/leaderboardWeekly";  

export const metadata = {
  title: "Drop | Home",
  description: "Challenge your persistance and taste with the tune you love",
};

export default function Home() {
  return (
    <>
      <TopMenu />
      <Prompt/>
      <TodaySubmitCard />
      <div className="h-14"></div>
      <LeaderboardWeekly/>
      <div className="h-14"></div>
      <LeaderboardAllTime/>
      

    </>
  );
}
