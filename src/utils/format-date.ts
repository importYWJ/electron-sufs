// export function formatTimestamp(timestamp: number): any {
//   const date = new Date(timestamp);
//   const y = date.getFullYear();
//   let m = (date.getMonth() + 1).toString(),
//     d = date.getDate().toString(),
//     h = date.getHours().toString(),
//     i = date.getMinutes().toString(),
//     s = date.getSeconds().toString();
//   if (Number(m) < 10) {
//     m = 0 + m;
//   }
//   if (Number(d) < 10) {
//     d = "0" + d;
//   }
//   if (Number(h) < 10) {
//     h = "0" + h;
//   }
//   if (Number(i) < 10) {
//     i = "0" + i;
//   }
//   if (Number(s) < 10) {
//     s = "0" + s;
//   }
//   const t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
//   return t;
// }

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export function formatTimestamp(
  value: number,
  format: string = DATE_TIME_FORMAT
): string {
  // const timestamp = typeof value === "string" ? Number(value) : value;
  return dayjs.unix(value).format(format);
}

dayjs.extend(utc);
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
): string {
  return dayjs.utc(utcString).format(format);
}
