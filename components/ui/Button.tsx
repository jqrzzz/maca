import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "onDark"
  | "onDarkOutline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[14px] font-medium " +
  "transition-colors duration-200 select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 " +
  "disabled:opacity-50 disabled:pointer-events-none [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  primary: "bg-clay-600 text-cream hover:bg-clay-700 shadow-soft",
  secondary: "bg-forest-500 text-cream hover:bg-forest-600 shadow-soft",
  outline:
    "border-[1.5px] border-clay-600 text-clay-700 bg-transparent hover:bg-clay-50",
  ghost: "bg-transparent text-forest-600 hover:bg-sand",
  onDark: "bg-cream text-ink hover:bg-clay-50 shadow-soft",
  onDarkOutline:
    "border-[1.5px] border-cream/70 text-cream bg-transparent hover:bg-cream/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-7 text-[1.0625rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    /** External links open in a new tab with safe rel. */
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button. Renders:
 *  - next/link for internal hrefs
 *  - a plain <a> (new tab + rel) for external hrefs
 *  - a <button> otherwise
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    children,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    // Strip styling-only props so they don't leak onto the anchor element.
    const {
      href,
      external,
      variant: _variant,
      size: _size,
      fullWidth: _fullWidth,
      children: _children,
      className: _className,
      ...rest
    } = props as ButtonAsLink;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
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

  const {
    variant: _variant,
    size: _size,
    fullWidth: _fullWidth,
    children: _children,
    className: _className,
    ...rest
  } = props as ButtonAsButton;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
