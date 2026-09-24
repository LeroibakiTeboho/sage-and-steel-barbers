"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { FiMenu, FiPhone, FiX } from "react-icons/fi";
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

/* ------------------------------------------------------------------ */
/* Scroll external store                                               */
/*                                                                     */
/* Defined at module scope so their identities stay stable across      */
/* renders — otherwise useSyncExternalStore would re-subscribe on      */
/* every render.                                                       */
/* ------------------------------------------------------------------ */

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

  /* ---------- Derived menu state ----------
     We store the pathname the menu was opened on. `open` is then
     computed during render:

       menuPathname === null          → closed
       menuPathname === pathname      → open on this route
       menuPathname !== pathname      → navigation happened; auto-closes

     No effect, no setState-in-effect, no cascading renders.         */
  const [menuPathname, setMenuPathname] = useState(null);
  const open = menuPathname === pathname;

  const toggleMenu = () =>
    setMenuPathname((prev) => (prev === pathname ? null : pathname));

  const closeMenu = () => setMenuPathname(null);

  /* ---------- External store: scroll position ---------- */
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getScrollServerSnapshot,
  );

  /* ---------- Lock body scroll while the sheet is open ----------
     DOM side-effect only (no setState), so this is a legitimate use
     of useEffect.                                                   */
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Desktop / tablet header */}
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
            <Link
              href="/"
              aria-label={`${business.fullName} — home`}
              className="rounded-2xl"
            >
              <Logo markClassName="h-8 w-8 sm:h-9 sm:w-9" />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden lg:block pl-20">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cx(
                        "relative rounded-2xl px-4 py-2 text-sm font-medium transition-colors",
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

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={business.phoneHref}
                className="hidden items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-cream/75 transition-colors hover:text-mint xl:inline-flex"
              >
                <FiPhone className="h-3.5 w-3.5" aria-hidden="true" />
                {business.phone}
              </a>

              <Button
                href="/booking"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Book Now
              </Button>

              {/* Mobile menu toggle — secondary to the bottom nav */}
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={open}
                aria-controls="header-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-mint hover:text-mint lg:hidden"
              >
                {open ? (
                  <FiX className="h-5 w-5" />
                ) : (
                  <FiMenu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary mobile sheet — contact, hours, socials.
          Primary mobile navigation lives in the bottom bar. */}
      {open && (
        <div
          id="header-menu"
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="absolute inset-0 h-full w-full bg-ink/70 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 top-16 mx-4 rounded-2xl border border-cream/10 bg-ink p-6 shadow-lift">
            <nav aria-label="Mobile menu">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={cx(
                        "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-mint/10 text-mint"
                          : "text-cream/80 hover:bg-cream/5 hover:text-cream",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-5 space-y-3 border-t border-cream/10 pt-5">
              <Button
                href="/booking"
                onClick={closeMenu}
                className="w-full"
                size="md"
              >
                Book an appointment
              </Button>
              <a
                href={business.phoneHref}
                className="flex items-center justify-center gap-2 text-sm font-medium text-cream/70 transition-colors hover:text-mint"
              >
                <FiPhone className="h-3.5 w-3.5" aria-hidden="true" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
