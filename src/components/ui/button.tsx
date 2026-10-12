import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-[15px] font-semibold tracking-[-0.01em] rounded-full transition-[background-color,color,opacity,transform] duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[var(--accent)] text-[var(--accent-ink)] hover:opacity-90 px-6 py-3",
        ink: "bg-[var(--ink)] text-[var(--paper)] hover:opacity-85 px-6 py-3",
        outline:
          "bg-transparent text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--elevated)] px-6 py-3",
        subtle: "bg-[var(--elevated)] text-[var(--ink)] hover:opacity-90 px-5 py-2.5",
        sage: "bg-[var(--elevated)] text-[var(--ink)] hover:opacity-90 px-5 py-2.5",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-sm",
        lg: "px-7 py-3.5 text-base",
        icon: "p-2.5 rounded-full",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
