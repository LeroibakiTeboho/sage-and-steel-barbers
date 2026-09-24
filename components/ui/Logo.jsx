import { cx } from "@/lib/utils";

export function LogoMark({ className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cx("shrink-0", className)}
      fill="none"
      aria-hidden="true"
    >
      {/* Hexagon shield */}
      <path
        d="M24 2.5 43.5 13.75v22.5L24 47.5 4.5 36.25v-22.5z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Razor blade */}
      <path
        d="M14.5 33.5 29.5 18.5"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* Razor pivot */}
      <circle
        cx="32.5"
        cy="15.5"
        r="3.6"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <circle cx="32.5" cy="15.5" r="1" fill="currentColor" />
      {/* Handle */}
      <path
        d="M35.5 18.5 40 26"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Edge highlight */}
      <path
        d="M18.5 35.5h10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Logo({
  className,
  markClassName = "h-9 w-9",
  showWordmark = true,
  tone = "light",
}) {
  const wordColor = tone === "light" ? "text-cream" : "text-ink";
  const markColor = tone === "light" ? "text-mint" : "text-teal-700";

  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <LogoMark className={cx(markClassName, markColor)} />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cx(
              "font-display text-[1.05rem] font-semibold tracking-tight sm:text-xl",
              wordColor,
            )}
          >
            Sage &amp; Steel
          </span>
          <span
            className={cx(
              "mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.28em]",
              tone === "light" ? "text-mint/70" : "text-clay-400",
            )}
          >
            Barber Co.
          </span>
        </span>
      )}
    </span>
  );
}
