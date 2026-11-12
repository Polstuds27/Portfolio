import { useState } from "react";
import { ArrowUp, Check, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { LINKEDIN } from "@/components/Hero";
import { EMAIL, GITHUB, RESUME_FILE } from "@/components/Contact";

const pill =
  "inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--card)]";

/** Closing contact block. Rendered by SiteFooter on every page; the nav's "Contact" scrolls to #contact. */
export function ContactClosing() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const resume = RESUME_FILE
    ? { href: `${import.meta.env.BASE_URL}${RESUME_FILE}`, label: "Résumé", download: true }
    : { href: `mailto:${EMAIL}?subject=${encodeURIComponent("Résumé request")}`, label: "Request résumé", download: false };

  return (
    <section
      id="contact"
      aria-labelledby="contact-closing-heading"
      className="relative isolate border-t border-[var(--line-soft)] bg-[var(--elevated)]/50"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <h2 id="contact-closing-heading" className="display-section max-w-3xl text-[34px] sm:text-[48px]">
            Have a role or a messy workflow? Let's talk.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[var(--ink-2)]">
            Email is the fastest way to reach me. I usually reply within a day or two.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${EMAIL}`}
              className="break-all text-[22px] font-semibold tracking-[-0.02em] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] transition-opacity hover:opacity-80 sm:text-[26px]"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
            >
              {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              {copied ? "Copied" : "Copy"}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? "Email address copied to clipboard." : ""}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <Button asChild>
              <a href={resume.href} {...(resume.download ? { download: "" } : {})}>
                <FileText aria-hidden /> {resume.label}
              </a>
            </Button>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={pill}>
              <Github className="size-4" aria-hidden /> GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={pill}>
              <Linkedin className="size-4" aria-hidden /> LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={pill}>
              <Mail className="size-4" aria-hidden /> Email
            </a>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line-soft)] pt-5 text-[13px] text-[var(--muted)]">
          <span>© {new Date().getFullYear()} Paul Adrianne Mojal · Bocaue, Bulacan, PH</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex cursor-pointer items-center gap-1.5 font-medium transition-colors hover:text-[var(--ink)]"
          >
            <ArrowUp className="size-4" aria-hidden /> Back to top
          </button>
        </div>
      </div>
    </section>
  );
}
