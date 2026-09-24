import { cx } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <Reveal
      className={cx(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cx(
            "mb-4 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em]",
            isLight ? "text-mint" : "text-teal-700",
          )}
        >
          <span
            className={cx(
              "h-px w-6",
              isLight ? "bg-mint/60" : "bg-teal-700/50",
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cx(
          "max-w-3xl text-[clamp(1.85rem,5vw,3.25rem)]",
          isLight ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cx(
            "mt-5 max-w-2xl text-[0.95rem] leading-relaxed sm:text-base",
            isLight ? "text-cream/70" : "text-ink/70",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
