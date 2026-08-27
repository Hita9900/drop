
// app/components/ServerTime.jsx
export default function ServerTime() {
  const now = new Date();
  
  // Get components in Tehran timezone
  const options = { timeZone: 'Asia/Tehran' };
  const year = now.toLocaleString('en-US', { ...options, year: 'numeric' });
  const month = now.toLocaleString('en-US', { ...options, month: '2-digit' });
  const day = now.toLocaleString('en-US', { ...options, day: '2-digit' });
  const hours = now.toLocaleString('en-US', { ...options, hour: '2-digit', hour12: false });
  const minutes = now.toLocaleString('en-US', { ...options, minute: '2-digit' });
  
  const dateString = `${year}-${month}-${day}`;
  const timeString = `${hours}:${minutes}`;
  
  return (
    <div>
      <div>📅  {dateString}</div>
      <div>🕐  {timeString}</div>
    </div>
  );
}


