import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shared wrapper for home-page sections: one h2 row with an optional "view all" link on the right. */
export function HomeSection({
  id,
  title,
  link,
  as: Heading = "h2",
  className,
  children,
}: {
  id: string;
  title: string;
  link?: { to: string; label: string };
  /** "h1" when the section is a page of its own (the nav-tab pages reuse the home sections). */
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("relative isolate bg-[var(--paper)]", className)}>
      <div className={cn("mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16", Heading === "h1" && "pt-10 sm:pt-12")}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading
            id={headingId}
            className={cn("display-section", Heading === "h1" ? "text-[34px] sm:text-[44px]" : "text-[28px] sm:text-[32px]")}
          >
            {title}
          </Heading>
          {link && (
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <Link to={link.to}>
                {link.label} <ArrowRight aria-hidden />
              </Link>
            </Button>
          )}
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
