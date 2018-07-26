export default function getCurrentTime(timer) {
  let totalSeconds = timer.totalSeconds;

  // if (timer.start !== null) {
  //   totalSeconds += (Date.now() - timer.start) / 1000;
  // }

  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;

  let minutes = Math.floor(totalSeconds / 60);
  totalSeconds %= 60;

  let seconds = Math.floor(totalSeconds);

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${hours}:${minutes}:${seconds}`;
}
