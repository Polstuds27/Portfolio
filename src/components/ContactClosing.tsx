import { useState } from "react";
import { ArrowUp, Check, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { LINKEDIN } from "@/components/Hero";
import { EMAIL, GITHUB, PHONE, RESUME_FILE } from "@/components/Contact";

const detailLink = "underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]";

const pill =
  "inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--card)]";

/** Closing contact block for the home page, and the whole Contact page. Doubles as the footer on both. */
export function ContactClosing({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
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
      className={
        page
          ? "relative isolate flex flex-1 flex-col bg-[var(--paper)]"
          : "relative isolate border-t border-[var(--line-soft)] bg-[var(--elevated)]/50"
      }
    >
      <div
        className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${
          page ? "flex flex-1 flex-col pb-8 pt-12 sm:pt-16" : "py-16 sm:py-20"
        }`}
      >
        <div
          className={
            page
              ? "grid flex-1 content-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-16"
              : ""
          }
        >
        <Reveal>
          <Heading id="contact-closing-heading" className="display-section max-w-3xl text-[34px] sm:text-[48px]">
            Have a role or a messy workflow? Let's talk.
          </Heading>
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

        {page && (
          <Reveal delay={80}>
            <dl className="surface divide-y divide-[var(--line-soft)] px-6 sm:px-7">
              {[
                ["Email", <a href={`mailto:${EMAIL}`} className={detailLink}>{EMAIL}</a>],
                ["Phone", <a href={`tel:${PHONE.replace(/\s/g, "")}`} className={detailLink}>{PHONE}</a>],
                ["Based in", "Bocaue, Bulacan, PH"],
                ["Reply time", "Within a day or two"],
                [
                  "GitHub",
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={detailLink}>
                    Polstuds27<span className="sr-only"> (opens in a new tab)</span>
                  </a>,
                ],
              ].map(([label, value]) => (
                <div key={label as string} className="grid gap-1 py-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[13px] font-medium text-[var(--muted)] sm:pt-0.5">{label}</dt>
                  <dd className="min-w-0 break-words text-[15px] font-medium text-[var(--ink)]">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
        </div>

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
