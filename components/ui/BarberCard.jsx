import SmartImage from "./SmartImage";
import { barberPortraits } from "@/lib/images";
import { cx } from "@/lib/utils";

export default function BarberCard({ barber, className }) {
  const portrait = barberPortraits[barber.id];

  return (
    <article
      className={cx(
        "group overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden bg-ink">
        <SmartImage
          src={portrait}
          alt={`${barber.name}, ${barber.role} at Sage & Steel Barber Co.`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-lg text-cream sm:text-xl">
            {barber.name}
          </h3>
          <p className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-mint">
            {barber.role}
          </p>
        </div>

        <span className="absolute right-4 top-4 rounded-2xl bg-cream/90 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur">
          {barber.years} yrs
        </span>
      </div>

      <div className="p-5">
        <p className="text-[0.83rem] leading-relaxed text-ink/70">
          {barber.bio}
        </p>

        {barber.specialties?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {barber.specialties.map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-teal/30 bg-teal/10 px-2.5 py-1 text-[0.65rem] font-medium text-teal-700"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
