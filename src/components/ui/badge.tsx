import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium tracking-[-0.005em] leading-none border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-[var(--elevated)] text-[var(--ink-2)]",
        accent: "bg-[var(--accent-soft)] text-[var(--ink)]",
        sage: "bg-[var(--elevated)] text-[var(--ink-2)]",
        gold: "bg-[var(--elevated)] text-[var(--ink-2)]",
        ink: "bg-[var(--ink)] text-[var(--paper)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
