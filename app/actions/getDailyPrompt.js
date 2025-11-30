import  getTime  from '@/app/actions/getTime.js';

const DAILY_MESSAGES = [
  "Welcome to the challenge!",
  "Keep going, you're doing great!",
  "Consistency is key!",
  "You're building a habit!",
  "Five days down, keep it up!",
  "Stay strong, you're halfway to a week!",
  "One week complete, fantastic!",
  "A new week, a new opportunity!",
  "Keep the momentum going!",
  "Double digits, impressive!",
  "You're on a roll!",
  "Almost halfway there!",
  "Lucky day 13, keep pushing!",
  "Two weeks of dedication!",
  "Halfway through the challenge!",
  "Keep the streak alive!",
  "You're doing amazing!",
  "Stay focused and strong!",
  "Just a few days left!",
  "You're almost at the finish line!",
  "Three weeks of success!",
  "Keep up the great work!",
  "You're so close now!",
  "Almost there, don't give up!",
  "Just a few more days!",
  "You're nearly at the end!",
  "Stay strong for the final stretch!",
  "Just one more day to go!",
  "The finish line is in sight!",
  "You did it! Amazing work!"
];


export default function GetDailyPrompt() {

  const dayIndex = getTime().dayIndex;
  const Prompt = {text: null, day: null};

  // Before challenge
  if (dayIndex < 0) {
    const daysLeft = Math.abs(dayIndex);
    Prompt.text =`${daysLeft} day${daysLeft !== 1 ? 's' : ''} until the challenge starts!`;
    return Prompt;
  }

  // During challenge (day 0 = first day)
  if (dayIndex < DAILY_MESSAGES.length) {
    Prompt.text = DAILY_MESSAGES[dayIndex];
    Prompt.day = dayIndex+1;
    return Prompt;
  }

  // After challenge
  Prompt.text ="The challenge is over! See you next time";
  return Prompt;
}