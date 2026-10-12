import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-24 text-center">
      <p aria-hidden className="font-display text-[72px] font-semibold leading-none tracking-[-0.03em] text-[var(--elevated)] dark:text-white/10">
        404
      </p>
      <h1 className="display-section mt-2 text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-3 leading-relaxed text-[var(--ink-2)]">
        The route you asked for isn’t in this portfolio. Head back home or to the project list.
      </p>
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        <Button asChild>
          <Link to="/">
            <ArrowLeft aria-hidden /> Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/projects">Projects</Link>
        </Button>
      </div>
    </div>
  );
}
