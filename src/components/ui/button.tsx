import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out " +
  "hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 " +
  "whitespace-nowrap";

const variants: Record<Variant, string> = {
  // Near-black on light, near-white on dark — maximum contrast, minimum noise.
  primary:
    "bg-surface-inverse text-foreground-inverse shadow-soft hover:shadow-lift " +
    "hover:bg-[color-mix(in_oklab,var(--surface-inverse)_92%,var(--accent))]",
  secondary:
    "border border-line-strong bg-surface text-foreground hover:bg-surface-muted hover:border-foreground-subtle",
  ghost: "text-foreground-muted hover:text-foreground hover:bg-surface-muted",
  // For use on the navy panels.
  inverse: "bg-white text-navy shadow-soft hover:shadow-lift hover:bg-slate-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const classesFor = (variant: Variant, size: Size, className?: string) =>
  cn(base, variants[variant], sizes[size], className);

/** Renders an anchor when given `href`, otherwise a native button. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  return "href" in props ? <LinkButton {...props} /> : <PlainButton {...props} />;
}

function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: ButtonAsLink) {
  const classes = classesFor(variant, size, className);

  // mailto:, tel: and off-site URLs bypass the client router.
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

function PlainButton({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonAsButton) {
  return (
    <button type={type} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
