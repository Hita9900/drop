import ButtonStandard from "./Buttons";
import GetDailyPrompt from '@/app/actions/getDailyPrompt.js';

export default function Prompt() {
    const Prompt = GetDailyPrompt();
    return (<>
        <div className="h-10"></div>
        <h2 className="text-header mb-4">Daily Prompt</h2>
        <div>
            <div className="glass-bg p-8 rounded-xl bg-cover bg-center">
                {Prompt.day && <p className="text-small opacity-50 ">Day {Prompt.day}</p>}
                <p className="text-lg mt-2 mb-3">{Prompt.text}</p>
                {Prompt.day > <ButtonStandard title='Drop a song'/>}
            </div>
        </div>
        <div className="h-10"></div>
    </>
    );
}