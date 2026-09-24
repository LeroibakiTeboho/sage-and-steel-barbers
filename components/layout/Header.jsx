"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { FiPhone } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { business } from "@/lib/business";
import { cx } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 16;

/* Scroll external store — module scope so identities stay stable
   across renders; otherwise useSyncExternalStore re-subscribes on
   every render. */
function subscribeToScroll(callback) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD;
}

function getScrollServerSnapshot() {
  // No scroll position on the server — render as "at top".
  return false;
}

export default function Header() {
  const pathname = usePathname();

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getScrollServerSnapshot,
  );

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink/95 shadow-lift backdrop-blur-md"
          : "bg-ink/70 backdrop-blur-sm",
      )}
    >
      <div className="container-x">
        <div
          className={cx(
            "flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-16" : "h-20",
          )}
        >
          {/* Logo — left-aligned on every breakpoint.
              On mobile/tablet, navigation and booking live in the
              bottom app-style bar, so this is the only header item. */}
          <Link
            href="/"
            aria-label={`${business.fullName} — home`}
            className="rounded-lg"
          >
            <Logo markClassName="h-8 w-8 sm:h-9 sm:w-9" />
          </Link>

          {/* ---------- Desktop (lg+) ---------- */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:block lg:pl-20"
          >
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cx(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-mint"
                        : "text-cream/75 hover:text-cream",
                    )}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-px bg-mint/70" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex lg:gap-3">
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-cream/75 transition-colors hover:text-mint xl:inline-flex"
            >
              <FiPhone className="h-3.5 w-3.5" aria-hidden="true" />
              {business.phone}
            </a>

            <Button href="/booking" size="sm">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
