import { FiStar } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/testimonials";
import { business } from "@/lib/business";

export default function Testimonials() {
  return (
    <section className="bg-cream-200 py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="What people say"
          title="Four hundred reviews, one recurring theme"
          description={`Rated ${business.rating} out of 5 across ${business.reviewCount} reviews. Most of them mention the same thing: they were listened to.`}
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white/70 p-6 transition-shadow hover:shadow-soft">
                <div
                  className="flex gap-0.5"
                  aria-label={`${t.rating} out of 5 stars`}
                  role="img"
                >
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <FiStar
                      key={idx}
                      className="h-3.5 w-3.5 fill-teal-700 text-teal-700"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1">
                  <p className="text-[0.88rem] leading-relaxed text-ink/75">
                    “{t.quote}”
                  </p>
                </blockquote>

                <figcaption className="mt-5 border-t border-ink/10 pt-4">
                  <span className="block text-sm font-semibold text-ink">
                    {t.name}
                  </span>
                  <span className="mt-0.5 block text-[0.72rem] text-clay">
                    {t.meta}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
