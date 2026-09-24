"use client";

import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  BOOKING_WINDOW_DAYS,
  addDays,
  compareDateKeys,
  countAvailableSlots,
  dateKeyToDate,
  doesBarberWorkOn,
  getSlotsForDate,
  isClosedOn,
  nowInShopTimezone,
} from "@/lib/booking";
import { formatTime12 } from "@/lib/utils";
import { cx } from "@/lib/utils";

const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_NAMES = [
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

function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < leadingBlanks; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1)
    cells.push(new Date(year, month, d));
  return cells;
}

export default function StepSchedule({ booking, onChange }) {
  const { date: selectedDate, time: selectedTime, barberId } = booking;

  const today = useMemo(() => nowInShopTimezone().date, []);
  const maxDate = useMemo(() => addDays(today, BOOKING_WINDOW_DAYS), [today]);

  const initialMonth = selectedDate
    ? dateKeyToDate(selectedDate)
    : dateKeyToDate(today);

  const [viewYear, setViewYear] = useState(initialMonth.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialMonth.getMonth());

  const cells = useMemo(
    () => buildMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const canGoPrev =
    viewYear > dateKeyToDate(today).getFullYear() ||
    (viewYear === dateKeyToDate(today).getFullYear() &&
      viewMonth > dateKeyToDate(today).getMonth());

  const canGoNext =
    viewYear < dateKeyToDate(maxDate).getFullYear() ||
    (viewYear === dateKeyToDate(maxDate).getFullYear() &&
      viewMonth < dateKeyToDate(maxDate).getMonth());

  const goPrev = () => {
    if (!canGoPrev) return;
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const goNext = () => {
    if (!canGoNext) return;
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const slots = useMemo(
    () => (selectedDate ? getSlotsForDate(selectedDate, barberId) : []),
    [selectedDate, barberId],
  );

  const availableCount = slots.filter((s) => s.available).length;

  const handleDateSelect = (dateKey) => {
    const stillValid =
      selectedTime && slots.some((s) => s.time === selectedTime && s.available);
    onChange({
      date: dateKey,
      time: stillValid ? selectedTime : null,
    });
  };

  return (
    <div>
      <header className="mb-7">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Pick a date and time
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          We&apos;re open Monday to Saturday. All times shown in SAST (UTC+2).
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        {/* ---------- Calendar ---------- */}
        <div className="rounded-2xl border border-ink/10 bg-white/60 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-ink/10 text-ink transition-colors hover:border-teal/50 hover:text-teal-700 disabled:opacity-30 disabled:hover:border-ink/10 disabled:hover:text-ink"
            >
              <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <p
              aria-live="polite"
              className="font-display text-base text-ink sm:text-lg"
            >
              {MONTH_NAMES[viewMonth]} {viewYear}
            </p>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Next month"
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-ink/10 text-ink transition-colors hover:border-teal/50 hover:text-teal-700 disabled:opacity-30 disabled:hover:border-ink/10 disabled:hover:text-ink"
            >
              <FiChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div
            className="mt-4 grid grid-cols-7 gap-1"
            role="grid"
            aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear} calendar`}
          >
            {WEEKDAY_LABELS.map((day) => (
              <div
                key={day}
                role="columnheader"
                className="py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-clay"
              >
                {day}
              </div>
            ))}

            {cells.map((date, index) => {
              if (!date) {
                return (
                  <div
                    key={`blank-${index}`}
                    role="gridcell"
                    aria-hidden="true"
                  />
                );
              }

              const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

              const inWindow =
                compareDateKeys(key, today) >= 0 &&
                compareDateKeys(key, maxDate) <= 0;
              const closed = isClosedOn(key);
              const barberOff = !doesBarberWorkOn(barberId, key);
              const hasSlots =
                inWindow &&
                !closed &&
                !barberOff &&
                countAvailableSlots(key, barberId) > 0;

              const disabled = !hasSlots;
              const isSelected = key === selectedDate;
              const isToday = key === today;

              return (
                // eslint-disable-next-line jsx-a11y/role-supports-aria-props
                <button
                  key={key}
                  type="button"
                  role="gridcell"
                  disabled={disabled}
                  onClick={() => handleDateSelect(key)}
                  aria-pressed={isSelected}
                  aria-label={`${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}${
                    disabled
                      ? closed
                        ? " — closed"
                        : barberOff
                          ? " — barber unavailable"
                          : " — fully booked"
                      : ""
                  }`}
                  className={cx(
                    "relative flex aspect-square items-center justify-center rounded-2xl text-[0.82rem] font-medium transition-all duration-150",
                    isSelected
                      ? "bg-ink text-mint shadow-soft"
                      : disabled
                        ? "cursor-not-allowed text-ink/20"
                        : "text-ink hover:bg-teal/12 hover:text-teal-700",
                    isToday &&
                      !isSelected &&
                      !disabled &&
                      "ring-1 ring-teal/40",
                  )}
                >
                  {date.getDate()}
                  {hasSlots && !isSelected && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1.5 h-1 w-1 rounded-2xl bg-teal-700/70"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-3.5 text-[0.68rem] text-ink/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-2xl bg-teal-700/70" />
              Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-2xl bg-ink/20" />
              Closed / full
            </span>
          </div>
        </div>

        {/* ---------- Time slots ---------- */}
        <div className="rounded-2xl border border-ink/10 bg-white/60 p-4 sm:p-5">
          {!selectedDate ? (
            <div className="flex h-full min-h-55 flex-col items-center justify-center text-center">
              <span className="font-display text-base text-ink/40">
                Select a date
              </span>
              <p className="mt-2 max-w-60 text-[0.78rem] leading-relaxed text-ink/40">
                Available appointment times will appear here.
              </p>
            </div>
          ) : availableCount === 0 ? (
            <div className="flex h-full min-h-55 flex-col items-center justify-center text-center">
              <span className="font-display text-base text-ink/50">
                No times left
              </span>
              <p className="mt-2 max-w-[16rem] text-[0.78rem] leading-relaxed text-ink/45">
                That day is fully booked for this barber. Try another date, or
                switch to “First available”.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-clay">
                Available times
              </p>
              <div className="mt-4 grid max-h-80 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 lg:grid-cols-3">
                {slots.map((slot) => {
                  const isSelected = slot.time === selectedTime;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => onChange({ time: slot.time })}
                      aria-pressed={isSelected}
                      className={cx(
                        "rounded-2xl border px-2 py-2.5 text-[0.76rem] font-medium transition-all duration-150",
                        isSelected
                          ? "border-ink bg-ink text-mint"
                          : slot.available
                            ? "border-ink/12 bg-white text-ink hover:border-teal-700 hover:text-teal-700"
                            : "cursor-not-allowed border-transparent bg-ink/4 text-ink/25 line-through",
                      )}
                    >
                      {formatTime12(slot.time)}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
