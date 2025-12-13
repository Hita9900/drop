import GetDailyPrompt from '@/app/actions/getDailyPrompt.js';

export function Prompt() {
    const Prompt = GetDailyPrompt();
    return (<div className='mx-auto max-w-xl'>
        <div className="h-10"></div>
        <h2 className="text-header ml-2 mb-4 font-wildworld">DAILY PROMT</h2>
        <div>
            <div className="glass-bg p-8 rounded-xl bg-cover bg-center">
                {Prompt.day && <p className="text-small opacity-50 ">Day {Prompt.day}</p>}
                <p className="text-body mt-2 mb-1">{Prompt.text}</p>
            </div>
        </div>
        <div className="h-10"></div>
    </div>
    );
}

export function PromptCompact() {
    const Prompt = GetDailyPrompt()
    return (<>


        <div className="py-4 pl-14 pr-4 rounded-xl bg-cover bg-center mb-2 bg-[url(/images/SubmitEntryBack.svg)]">
            <p className="text-small leading-tight opacity-50 ">Today's Prompt</p>
            <p className="text-body leading-tight">{Prompt.text}</p>
        </div>

    </>
    );
}