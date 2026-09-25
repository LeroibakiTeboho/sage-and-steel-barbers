import Image from "next/image";
import { cx } from "@/lib/utils";

/**
 * Brand logo.
 *
 * The brand mark is a single PNG (`/images/logo/logo.png`).
 *
 * Sizing strategy:
 *   - The intrinsic `width` / `height` props below should match the
 *     PNG's real pixel dimensions. Update them if your file differs.
 *   - Height is always `h-auto` so the image scales proportionally.
 *   - Width is controlled by the caller via `markClassName`.
 *
 * `LogoMark` is exported separately so callers (e.g. PromoModal) that
 * only need the mark don't pull in the optional wordmark.
 */

export function LogoMark({ className, priority = false }) {
  return (
    <Image
      src="/images/logo/logo.png"
      alt=""
      width={400}
      height={120}
      priority={priority}
      sizes="(max-width: 640px) 140px, 170px"
      className={cx("h-auto object-contain", className)}
      aria-hidden="true"
    />
  );
}

export default function Logo({
  className,
  markClassName = "w-[140px] sm:w-[170px]",
  showWordmark = false,
  tone = "light",
  priority = false,
}) {
  const wordColor = tone === "light" ? "text-cream" : "text-ink";

  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <LogoMark className={markClassName} priority={priority} />

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
