/* this file provides the date and day index in Tehran timezone */

import { fromZonedTime, toZonedTime, format } from 'date-fns-tz';
import { differenceInCalendarDays } from 'date-fns';

const TZ = 'Asia/Tehran';
// Create start date as Tehran midnight on Dec 1, 2025 (explicitly parse in TZ, then to UTC)
const CHALLENGE_START_DATE = toZonedTime(new Date('2025-11-21T00:00:00'), TZ );

export default function getTime(now = new Date()){
  const TZ = 'Asia/Tehran';
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
  //console.log('Today in Tehran:', format(tehranNow, 'yyyy-MM-dd'));
  const Time  = {dayIndex: dayIndex, tehranNow: format(tehranNow, 'yyyy-MM-dd')};

    return (Time);
}