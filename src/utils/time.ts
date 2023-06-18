/**
 * convert time to 00:00:00
 * @param time
 */
export function parseTime(time: number): string {
  if (time == 0 || Number.isNaN(time)) return "00:00:00";
  const h = parseInt(String((time / 60 / 60) % 24));
  const hs = h < 10 ? "0" + h : h;
  const m = parseInt(String((time / 60) % 60));
  const ms = m < 10 ? "0" + m : m;
  const s = parseInt(String(time % 60));
  const ss = s < 10 ? "0" + s : s;
  return `${hs}:${ms}:${ss}`;
}

export function formatTime(time: number): string {
  if (time == 0 || Number.isNaN(time)) return "0分钟";
  const h = parseInt(String((time / 60 / 60) % 24));
  const m = parseInt(String((time / 60) % 60));
  if (h != 0) {
    return `${h}小时${m}分钟`;
  }
  return `${m}分钟`;
}

/**
 * convert time to 00'00''
 * @param time
 */
export function parseSecond(time: number): string {
  if (time == 0 || Number.isNaN(time)) return "00'00''";
  const m = parseInt(String((time / 60) % 60));
  const ms = m < 10 ? "0" + m : m;
  const s = parseInt(String(time % 60));
  const ss = s < 10 ? "0" + s : s;
  return `${ms}'${ss}''`;
}

export function parseTimestamp(timestamp: number): string {
  const date = new Date(parseInt(String(timestamp)));
  const Year = date.getFullYear();
  const Moth =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const Day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const Hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const Minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const Second =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return (
    Year + "/" + Moth + "/" + Day + " " + Hour + ":" + Minute + ":" + Second
  );
}
