import GetDailyPrompt from '@/app/actions/getDailyPrompt.js';
import {useTranslations} from 'next-intl';
import { useLocale } from 'next-intl';


export function Prompt() {
    const locale = useLocale();
    const t = useTranslations('Prompt');
    const Prompt = GetDailyPrompt();

    return (<div className='mx-auto max-w-xl'>
        <div className="h-10"></div>
    
        <h2 className={`text-header ml-2 mb-4 font-wildworld ${ locale ==='fa'? 'font-platinum':''}`}>{t('Daily Prompt')}</h2>
        <div>
            <div className="glass-bg p-8 rounded-xl bg-cover bg-center">
                {Prompt.day && <p className={`text-small opacity-50 ${ locale ==='fa'? 'font-platinum':''}`}> {t('day')} {Prompt.day}</p>}
                <p className={`text-body mt-2 mb-1 ${ locale ==='fa'? 'font-yekan':''}`}>{Prompt.text}</p>
            </div>
        </div>
        <div className="h-10"></div>
    </div>
    );
}

export function PromptCompact() {
    const locale = useLocale();
    const Prompt = GetDailyPrompt()
    const t = useTranslations('Prompt');
    return (<>


        <div className="py-4 pl-14 pr-4 rounded-xl bg-cover bg-center mb-2 bg-[url(/images/SubmitEntryBack.svg)]">
            <p className={`text-small leading-tight opacity-50 ${ locale ==='fa'? 'font-yekan':''}`}>{t('todayPrompt')}</p> 
            <p className={`text-body leading-tight ${ locale ==='fa'? 'font-yekan':''}`}>{Prompt.text}</p>
        </div>

    </>
    );
}