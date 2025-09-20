import TopMenu from "@/app/ui/TopMenu.js";
import ButtonStandard from "@/app/ui/Buttons.js";

export const metadata = {
  title: "Drop | Home",
  description: ":3",
};

export default function Home() {
  return (

    <div className="">
      <TopMenu />
      <div className="h-10"></div>
      <h2 className="text-header mb-4">Daily Prompt</h2>

      <div>
        <div className="glass-bg p-8 rounded-xl bg-cover bg-center">
          <p className="text-small opacity-50 ">Day 21</p>
          <p className="text-lg mt-2 mb-3">Drop a song that has exactly 6 letters for the title</p>
          <ButtonStandard title="Drop Your Song" icon="&#xe80a;"/>
        </div>
      </div>
      <div className="h-10"></div>




    </div>

  );
}
