import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { LINKEDIN } from "@/components/Hero";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line-soft)] bg-[var(--elevated)]/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-[22px] font-semibold tracking-[-0.02em]">
            Paul Adrianne Mojal
          </p>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[var(--ink-2)]">
            Full-stack developer working in React, TypeScript, and Django. Currently building
            offline-first apps and local-AI tooling out of Bulacan, Philippines.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="https://github.com/Polstuds27"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--card)]"
            >
              <Github className="size-4" aria-hidden /> GitHub
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--card)]"
            >
              <Linkedin className="size-4" aria-hidden /> LinkedIn
            </a>
            <a
              href="mailto:paul.mojal@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--card)]"
            >
              <Mail className="size-4" aria-hidden /> Email
            </a>
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="text-[13px] font-medium text-[var(--muted)]">Explore</p>
          <ul className="mt-3 grid gap-2 text-[15px]">
            {[
              ["/", "Home"],
              ["/projects", "Projects"],
              ["/about", "About"],
              ["/experience", "Experience"],
              ["/certifications", "Certifications"],
              ["/engineering", "Journal"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-[13px] font-medium text-[var(--muted)]">Colophon</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">
            Set in the system sans. Layered surfaces, hairline borders, and a restrained coral
            identity. No trackers, no frameworks-for-a-button.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--card)]"
          >
            <ArrowUp className="size-4" aria-hidden /> Back to top
          </button>
        </div>
      </div>
      <div className="border-t border-[var(--line-soft)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-4 text-[13px] text-[var(--muted)] sm:px-8">
          <span>© {new Date().getFullYear()} Paul Adrianne Mojal — Bulacan, PH</span>
          <span>Built with React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
