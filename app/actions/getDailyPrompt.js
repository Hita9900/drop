import  getTime  from '@/app/actions/getTime.js';
import {useTranslations} from 'next-intl';
import { useLocale } from 'next-intl';


export default function GetDailyPrompt() {
  const dayIndex = getTime().dayIndex;
  const Prompt = {text: null, day: null};
  const t = useTranslations('Prompt');  
  const locale = useLocale();

  // Before challenge
  if (dayIndex < 0) {
    const daysLeft = Math.abs(dayIndex);
    Prompt.text = locale === 'fa' 
    ? `${daysLeft} ${t('UntilChallenge')}`
    : `${daysLeft} ${t('day')}${daysLeft !== 1 ? 's' : ''} ${t('UntilChallenge')}`;
    return Prompt;
  }

  // During challenge (day 0 = first day)
  if (dayIndex < 30) {
    Prompt.text = t('PromptD'+(dayIndex+1));
    Prompt.day = dayIndex+1;
    return Prompt;
  }

  // After challenge
  Prompt.text = t('ChallengeOver');
  return Prompt;
}