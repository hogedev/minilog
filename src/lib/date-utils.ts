export function parseUtcTimestamp(s: string): Date {
  return new Date(s.replace(" ", "T") + (s.includes("Z") ? "" : "Z"));
}

export function formatJstTime(s: string): string {
  return parseUtcTimestamp(s).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatJstDateTime(s: string): string {
  return parseUtcTimestamp(s).toLocaleString("ja-JP");
}

export function formatDateHeader(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dow = [
    "\u65E5",
    "\u6708",
    "\u706B",
    "\u6C34",
    "\u6728",
    "\u91D1",
    "\u571F",
  ][d.getDay()];
  return `${d.getMonth() + 1}\u6708${d.getDate()}\u65E5\uFF08${dow}\uFF09`;
}
