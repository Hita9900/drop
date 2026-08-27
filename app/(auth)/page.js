import TopMenu from "@/app/ui/TopMenu.js";
import { Prompt } from '@/app/ui/Prompt.js';
import TodaySubmitCard from "../ui/TodaySubmitCard";
import AllTimeLeaderboard from "@/app/actions/AllTimeLeaderboard";
import WeeklyLeaderboard from "@/app/actions/WeeklyLeaderboard";  

import ServerTime from '@/app/actions/Testgettime.js'

export const dynamic = 'force-dynamic';

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
      <WeeklyLeaderboard/>
      <div className="h-14"></div>
      <AllTimeLeaderboard/>


      
      
      <ServerTime />
    
      

    </>
  );
}
