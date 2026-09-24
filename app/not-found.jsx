import Link from "next/link";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink pt-28 text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-2xl bg-mint/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-2xl bg-teal/12 blur-3xl"
      />

      <div className="container-x relative py-20">
        <div className="max-w-xl">
          <Logo markClassName="h-11 w-11" />

          <p className="mt-8 font-display text-[clamp(4rem,14vw,8rem)] leading-none text-mint/25">
            404
          </p>

          <h1 className="mt-2 text-[clamp(1.75rem,5vw,2.75rem)] text-cream">
            This page took an early cut
          </h1>

          <p className="mt-5 text-[0.95rem] leading-relaxed text-cream/65">
            The link you followed doesn&apos;t exist — or it&apos;s been moved.
            Nothing broken on our end, just a wrong turn. Let&apos;s get you
            back to something useful.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/" size="lg" className="w-full sm:w-auto">
              <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Button>
            <Button
              href="/booking"
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              <FiCalendar className="h-4 w-4" aria-hidden="true" />
              Book an appointment
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem]">
            {[
              { href: "/services", label: "Services & prices" },
              { href: "/about", label: "About us" },
              { href: "/contact", label: "Contact" },
              { href: "/terms", label: "Terms & Conditions" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/50 underline-offset-4 transition-colors hover:text-mint hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
