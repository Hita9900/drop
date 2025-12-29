//this file does not provide the date anymore. getToday() is in charge of that. im keeping this file for testing day index


import { toZonedTime, format } from 'date-fns-tz';
import { differenceInCalendarDays, startOfDay } from 'date-fns';


const TZ = 'Asia/Tehran';

const CHALLENGE_START_DATE_UTC = Date.UTC(2025, 11, 16, 20, 30, 0); // Month is 0-indexed (10 = November) also Dec 17 20:30 UTC = Dec 18 00:00 Tehran 
const challengeStartZoned = toZonedTime(new Date(CHALLENGE_START_DATE_UTC), TZ);
const startDateOnlyTehran = startOfDay(challengeStartZoned); // Midnight Tehran on start day


export default function getTime(now = new Date()){
  const TZ = 'Asia/Tehran';
 // Convert current time to Tehran
 const tehranNow = toZonedTime(now, TZ);

  //console.log(format(tehranNow, 'yyyy-MM-dd HH:mm:ss'));

  
  // Get just the date (midnight) in Tehran for today
  const todayTehran = startOfDay(tehranNow);


  // Calculate the day index (0 = Nov 21, 1 = Nov 22, etc.)
  const dayIndex = differenceInCalendarDays(todayTehran, startDateOnlyTehran);

  //console.log('Today in Tehran:', format(tehranNow, 'yyyy-MM-dd'));
  const Time  = {
    dayIndex: dayIndex,
    tehranNow: format(tehranNow, 'yyyy-MM-dd')};

    return (Time);
}









