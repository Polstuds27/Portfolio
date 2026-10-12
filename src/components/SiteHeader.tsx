import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PHOTO_URL } from "@/components/Hero";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/certifications", label: "Certifications" },
  { to: "/engineering", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader({
  theme,
  onToggleTheme,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-soft)] bg-[var(--paper)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-[64px] items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Paul Mojal — home">
            <img
              src={PHOTO_URL}
              alt="Paul Adrianne Mojal"
              className="size-8 shrink-0 rounded-full border border-[var(--line-soft)] bg-[var(--elevated)] object-cover"
            />
            <span className="text-[15px] font-semibold tracking-[-0.01em]">
              Paul Adrianne Mojal
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm rounded-full transition-colors duration-150",
                    isActive
                      ? "font-semibold text-[var(--ink)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="grid size-9 cursor-pointer place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--elevated)] hover:text-[var(--ink)]"
            >
              {theme === "dark" ? (
                <Sun className="size-[18px]" aria-hidden />
              ) : (
                <Moon className="size-[18px]" aria-hidden />
              )}
            </button>
            <a
              href="mailto:paul.mojal@gmail.com"
              className="hidden items-center gap-1 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Hire me <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-[var(--line-soft)] bg-[var(--paper)] lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 sm:px-8 py-3">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-[16px]",
                      isActive
                        ? "font-semibold text-[var(--ink)] bg-[var(--elevated)]"
                        : "text-[var(--ink-2)]"
                    )
                  }
                >
                  {l.label} <ArrowUpRight className="size-4 opacity-50" aria-hidden />
                </NavLink>
              </li>
            ))}
            <li className="px-3 py-3">
              <a
                href="mailto:paul.mojal@gmail.com"
                className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] sm:hidden"
              >
                Hire me <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
