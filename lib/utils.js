export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const WEEKDAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-09-25" → "Friday, 25 September 2026" */
export function formatLongDate(dateKey) {
  if (!dateKey) return "";
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${WEEKDAYS_LONG[date.getDay()]}, ${d} ${MONTHS_LONG[m - 1]} ${y}`;
}

/** "2026-09-25" → "Fri 25 Sep" */
export function formatShortDate(dateKey) {
  if (!dateKey) return "";
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${WEEKDAYS_LONG[date.getDay()].slice(0, 3)} ${d} ${MONTHS_LONG[m - 1].slice(0, 3)}`;
}

/** "15:00" → "3:00 PM" */
export function formatTime12(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/** "2026-09-25" + "15:00" → "Friday, 25 September 2026 at 3:00 PM" */
export function formatDateTimeLong(dateKey, time) {
  return `${formatLongDate(dateKey)} at ${formatTime12(time)}`;
}

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim());
}

export function isValidPhone(value) {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 9 && digits.length <= 15;
}
