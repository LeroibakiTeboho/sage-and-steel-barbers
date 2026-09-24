import Link from "next/link";
import { cx } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 " +
  "disabled:opacity-45 disabled:pointer-events-none select-none whitespace-nowrap";

const variants = {
  primary:
    "bg-mint text-ink-900 hover:bg-mint-600 active:bg-mint-700 shadow-soft hover:shadow-lift",
  dark: "bg-ink text-cream hover:bg-ink-800 active:bg-ink-900 shadow-soft",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-ink/50 hover:bg-ink/[0.04]",
  outlineLight:
    "border border-cream/30 bg-transparent text-cream hover:border-mint hover:text-mint",
  teal: "bg-teal-700 text-cream hover:bg-teal-600 shadow-soft",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.06]",
  link: "bg-transparent text-teal-700 underline-offset-4 hover:underline p-0 rounded-none",
};

const sizes = {
  sm: "text-[0.8rem] px-4 py-2",
  md: "text-sm px-5 py-2.5 sm:px-6 sm:py-3",
  lg: "text-[0.95rem] px-6 py-3.5 sm:px-8 sm:py-4",
};

export default function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const classes = cx(
    base,
    variants[variant] ?? variants.primary,
    variant === "link" ? "" : (sizes[size] ?? sizes.md),
    className,
  );

  if (href && !props.disabled) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Component = as ?? "button";
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
