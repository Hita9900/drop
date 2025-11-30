export function formatDuration(seconds) {
  const totalSeconds = Math.floor(seconds / 1000);        // convert ms → seconds
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
export function SecToMin({ duration }) {
  return (
    <div>
      <p>Duration: {formatDuration(duration)}</p>
    </div>
  );
}