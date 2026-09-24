"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiCalendar,
  FiHome,
  FiInfo,
  FiMapPin,
  FiScissors,
} from "react-icons/fi";
import { cx } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "Home", Icon: FiHome },
  { href: "/services", label: "Services", Icon: FiScissors },
  { href: "/booking", label: "Book", Icon: FiCalendar, primary: true },
  { href: "/about", label: "About", Icon: FiInfo },
  { href: "/contact", label: "Visit", Icon: FiMapPin },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="Mobile navigation"
      className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-cream/10 bg-ink/95 backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 items-end px-2 pt-2">
        {ITEMS.map(({ href, label, Icon, primary }) => {
          const active = isActive(href);

          if (primary) {
            return (
              <li key={href} className="flex justify-center">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="-mt-5 flex flex-col items-center gap-1 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  <span
                    className={cx(
                      "flex h-13 w-13 items-center justify-center rounded-2xl shadow-lift transition-all duration-200",
                      "h-13 w-13",
                      active
                        ? "bg-mint-600 text-ink-900"
                        : "bg-mint text-ink-900",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={cx(
                      "pb-1 text-[0.6rem] font-semibold uppercase tracking-widest",
                      active ? "text-mint" : "text-cream/60",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "flex flex-col items-center gap-1 rounded-2xl px-1 py-2 transition-colors",
                  active ? "text-mint" : "text-cream/60 hover:text-cream/90",
                )}
              >
                <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                <span className="pb-0.5 text-[0.6rem] font-medium tracking-[0.06em]">
                  {label}
                </span>
                <span
                  className={cx(
                    "h-0.5 w-4 rounded-2xl transition-opacity",
                    active ? "bg-mint opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
