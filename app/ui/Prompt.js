import ButtonStandard from "./Buttons";
import GetDailyPrompt from '@/app/api/getDailyPrompt.js';

export default function Prompt() {
    const message = GetDailyPrompt();
    return (<>
        <div className="h-10"></div>
        <h2 className="text-header mb-4">Daily Prompt</h2>
        <div>
            <div className="glass-bg p-8 rounded-xl bg-cover bg-center">
                <p className="text-small opacity-50 ">Day 21</p>
                <p className="text-lg mt-2 mb-3">{message}</p>
                <ButtonStandard title="Drop Your Song" icon="&#xe80a;" address="/submit" />
                
                
            </div>
        </div>
        <div className="h-10"></div>
    </>
    );
}