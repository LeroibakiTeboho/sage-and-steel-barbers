import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import BarberCard from "@/components/ui/BarberCard";
import Reveal from "@/components/ui/Reveal";
import { barbers } from "@/lib/barbers";

export default function TeamPreview() {
  return (
    <section className="container-x py-20 sm:py-24 lg:py-28">
      <SectionHeading
        eyebrow="The chairs"
        title="Four barbers. One standard."
        description="Each of our barbers has their own speciality, but they all cut to the same brief: sharp lines, honest advice, and a finish that lasts."
        align="center"
        className="mx-auto max-w-3xl"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {barbers.map((barber, i) => (
          <Reveal key={barber.id} delay={i * 0.07}>
            <BarberCard barber={barber} className="h-full" />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 flex justify-center">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors hover:text-ink"
        >
          Read their stories
          <FiArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </section>
  );
}
