import Link from "next/link";
import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { business, formatHoursRange, openingHours } from "@/lib/business";
import { services } from "@/lib/services";

const SHOP_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book now" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/terms#privacy", label: "Privacy" },
  { href: "/terms#cancellations", label: "Cancellations" },
];

const SOCIALS = [
  { href: business.social.instagram, label: "Instagram", Icon: FiInstagram },
  { href: business.social.facebook, label: "Facebook", Icon: FiFacebook },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const topServices = services.slice(0, 6);

  return (
    <footer className="relative mt-0 bg-ink pb-28 pt-20 text-cream lg:pb-14">
      {/* subtle top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-mint/40 to-transparent"
      />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo markClassName="h-10 w-10" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
              {business.shortDescription}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${business.fullName} on ${label}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cream/15 text-cream/70 transition-colors hover:border-mint hover:text-mint"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <Button href="/booking" size="sm" className="mt-6">
              Book an appointment
            </Button>
          </div>

          {/* Shop links */}
          <nav aria-label="Footer — shop" className="lg:col-span-2">
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mint">
              Shop
            </h3>
            <ul className="mt-5 space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/65 transition-colors hover:text-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer — services" className="lg:col-span-2">
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mint">
              Services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {topServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/booking?service=${service.id}`}
                    className="text-sm text-cream/65 transition-colors hover:text-mint"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm font-medium text-mint transition-colors hover:text-mint-600"
                >
                  View all →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact + Hours */}
          <div className="lg:col-span-4">
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mint">
              Visit &amp; contact
            </h3>

            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <FiMapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-mint/70"
                  aria-hidden="true"
                />
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 transition-colors hover:text-mint"
                >
                  {business.street}, {business.suburb}
                  <br />
                  {business.city}, {business.postalCode}
                </a>
              </li>
              <li className="flex gap-3">
                <FiPhone
                  className="mt-0.5 h-4 w-4 shrink-0 text-mint/70"
                  aria-hidden="true"
                />
                <a
                  href={business.phoneHref}
                  className="text-cream/70 transition-colors hover:text-mint"
                >
                  {business.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <FiMail
                  className="mt-0.5 h-4 w-4 shrink-0 text-mint/70"
                  aria-hidden="true"
                />
                <a
                  href={business.emailHref}
                  className="break-all text-cream/70 transition-colors hover:text-mint"
                >
                  {business.email}
                </a>
              </li>
            </ul>

            <div className="mt-7">
              <h4 className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mint">
                <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
                Opening hours
              </h4>
              <ul className="mt-4 space-y-1.5 text-[0.82rem]">
                {openingHours.map((entry) => (
                  <li
                    key={entry.day}
                    className="flex items-baseline justify-between gap-4 border-b border-cream/5 pb-1.5 last:border-0"
                  >
                    <span className="text-cream/55">{entry.day}</span>
                    <span
                      className={
                        entry.open
                          ? "font-medium text-cream/85"
                          : "font-medium text-clay-400"
                      }
                    >
                      {formatHoursRange(entry)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-cream/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-cream/45">
            © {year} {business.legalName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.75rem] text-cream/50 transition-colors hover:text-mint"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
