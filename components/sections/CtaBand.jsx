import { FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CtaBand({
  eyebrow = "Ready when you are",
  title = "Book your chair in under a minute",
  description = "Pick a service, choose your barber, pick a time. You'll get a calendar invite you can add to Google or Apple Calendar straight away.",
}) {
  return (
    <section className="container-x py-8 sm:py-12 lg:py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-2xl bg-mint/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-2xl bg-teal/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-mint">
              <span className="h-px w-6 bg-mint/60" />
              {eyebrow}
              <span className="h-px w-6 bg-mint/60" />
            </span>

            <h2 className="mt-5 text-[clamp(1.75rem,5vw,3rem)] text-cream">
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/70">
              {description}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/booking" size="lg" className="w-full sm:w-auto">
                Book now
                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href="/services"
                variant="outlineLight"
                size="lg"
                className="w-full sm:w-auto"
              >
                Browse services
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
