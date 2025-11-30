//prompts were originally fetched from database but to make the app more efficient. they were moved
// here. and i didnt code this file so dont ask me what date dependancies are or how they work
import { fromZonedTime, toZonedTime, format } from 'date-fns-tz';
import { differenceInCalendarDays } from 'date-fns';

const TZ = 'Asia/Tehran';

const DAILY_MESSAGES = [
  "Day 1: Welcome to the challenge!",
  "Day 2: Keep going, you're doing great!",
  "Day 3: Consistency is key!",
  "Day 4: You're building a habit!",
  "Day 5: Five days down, keep it up!",
  "Day 6: Stay strong, you're halfway to a week!",
  "Day 7: One week complete, fantastic!",
  "Day 8: A new week, a new opportunity!",
  "Day 9: Keep the momentum going!",
  "Day 10: Double digits, impressive!",
  "Day 11: You're on a roll!",
  "Day 12: Almost halfway there!",
  "Day 13: Lucky day 13, keep pushing!",
  "Day 14: Two weeks of dedication!",
  "Day 15: Halfway through the challenge!",
  "Day 16: Keep the streak alive!",
  "Day 17: You're doing amazing!",
  "Day 18: Stay focused and strong!",
  "Day 19: Just a few days left!",
  "Day 20: You're almost at the finish line!",
  "Day 21: Three weeks of success!",
  "Day 22: Keep up the great work!",
  "Day 23: You're so close now!",
  "Day 24: Almost there, don't give up!",
  "Day 25: Just a few more days!",
  "Day 26: You're nearly at the end!",
  "Day 27: Stay strong for the final stretch!",
  "Day 28: Just one more day to go!",
  "Day 29: The finish line is in sight!",
  "Day 30: You did it! Amazing work!"
];

// Create start date as Tehran midnight on Dec 1, 2025 (explicitly parse in TZ, then to UTC)
const CHALLENGE_START_DATE = toZonedTime(
  //use yyyy-mm-dd format
  new Date('2025-10-27T00:00:00'), 
  TZ
);

export default function GetDailyPrompt(now = new Date()) {
  // Convert current time to Tehran
  const tehranNow = fromZonedTime(now, TZ);
  // Strip time to get Tehran date only
  const todayTehran = new Date(
    tehranNow.getFullYear(),
    tehranNow.getMonth(),
    tehranNow.getDate()
  );

  // Strip time to get start date only in Tehran
  const startTehran = fromZonedTime(CHALLENGE_START_DATE, TZ);
  const startDateOnly = new Date(
    startTehran.getFullYear(),
    startTehran.getMonth(),
    startTehran.getDate()
  );

  const dayIndex = differenceInCalendarDays(todayTehran, startDateOnly);

  // Before challenge
  if (dayIndex < 0) {
    const daysLeft = Math.abs(dayIndex);
    return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} until the challenge starts!`;
  }

  // During challenge (day 0 = first day)
  if (dayIndex < DAILY_MESSAGES.length) {
    return DAILY_MESSAGES[dayIndex];
  }

  // After challenge
  return "The challenge is over! See you next time";
}