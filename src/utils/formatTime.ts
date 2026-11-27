import { settings } from '../constants/settings';

export function formatTime(totalSeconds: number): string {
  const wholeSeconds = Math.floor(totalSeconds);
  const minutes = Math.floor(wholeSeconds / settings.secondsPerMinute);
  const seconds = wholeSeconds % settings.secondsPerMinute;

  let secondsText = String(seconds);
  if (seconds < 10) {
    secondsText = '0' + seconds;
  }

  return minutes + ':' + secondsText;
}
