import Link from "next/link";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { formatDuration, formatPrice } from "@/lib/services";
import { cx } from "@/lib/utils";

export default function ServiceCard({ service, compact = false, className }) {
  return (
    <article
      className={cx(
        "group relative flex flex-col rounded-2xl border border-ink/10 bg-white/60 p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:border-teal/40 hover:bg-white hover:shadow-lift",
        className,
      )}
    >
      {service.popular && (
        <span className="absolute -top-2.5 right-5 rounded-2xl bg-ink px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-mint">
          Most booked
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl text-ink sm:text-[1.35rem]">
          {service.name}
        </h3>
        <span className="shrink-0 font-display text-xl text-teal-700">
          {formatPrice(service.price)}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        {service.description}
      </p>

      {!compact && service.includes?.length > 0 && (
        <ul className="mt-5 space-y-1.5">
          {service.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[0.82rem] text-ink/60"
            >
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-2xl bg-teal" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-clay">
          <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
          {formatDuration(service.duration)}
        </span>

        <Link
          href={`/booking?service=${service.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-teal-700"
        >
          Book
          <FiArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
          <span className="sr-only"> {service.name}</span>
        </Link>
      </div>
    </article>
  );
}
