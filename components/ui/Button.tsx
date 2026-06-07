import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  // CTA — deep slate with light text (high contrast, on-palette)
  primary: "bg-ink text-white hover:bg-ink/90 shadow-sm",
  secondary:
    "bg-white text-ink border border-secondary/50 hover:border-secondary hover:bg-primary/40",
  ghost: "bg-transparent text-ink hover:bg-primary/50",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonAsButton | ButtonAsLink
>(function Button(
  { variant = "primary", size = "md", className = "", children, ...props },
  ref,
) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
});
