import { useState } from "react";
import { Mail, Github, Linkedin, Copy, Check, Send, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { LINKEDIN } from "@/components/Hero";

const EMAIL = "paul.mojal@gmail.com";
const GITHUB = "https://github.com/Polstuds27";
const PHONE = "+63 981 680 7108";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById("contact-email");
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `Hi Paul,\n\n${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("ready");
  };

  const valid =
    form.name.trim().length >= 2 &&
    /.+@.+\..+/.test(form.email.trim()) &&
    form.message.trim().length >= 10;

  return (
    <section aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeading
        kicker="Contact"
        title="Let's build something that lasts"
        lede="Email and GitHub are the fastest routes. The composer below opens your own mail app with a pre-addressed draft — nothing is swallowed into the void."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid content-start gap-4">
          <Reveal className="surface-flat p-6">
            <p className="text-[13px] font-medium text-[var(--muted)]">Direct</p>
            <p id="contact-email" className="mt-2 text-[17px] font-semibold tracking-[-0.01em] break-all">
              {EMAIL}
            </p>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="mt-1.5 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
            >
              <Phone className="size-4" aria-hidden /> {PHONE}
            </a>
            <p className="mt-1 text-sm text-[var(--muted)]">Bocaue, Bulacan</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={copyEmail}>
                {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
                {copied ? "Copied" : "Copy email"}
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={`mailto:${EMAIL}`}>
                  <Mail aria-hidden /> Open mail app
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]" role="status" aria-live="polite">
              {copied ? "Email address copied to clipboard." : "Typical reply: within a day or two."}
            </p>
          </Reveal>
          <Reveal delay={80} className="surface-flat p-6">
            <p className="text-[13px] font-medium text-[var(--muted)]">Elsewhere</p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.02em]">github.com/Polstuds27</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="subtle" asChild>
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  <Github aria-hidden /> GitHub
                </a>
              </Button>
              <Button size="sm" variant="subtle" asChild>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  <Linkedin aria-hidden /> LinkedIn
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Résumé available on request — I don’t post a download link I can’t keep current.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="surface relative overflow-hidden">
        <form
          onSubmit={onSubmit}
          aria-label="Compose an email to Paul Mojal"
        >
          <div className="card-wash pointer-events-none absolute inset-x-0 top-0 h-48" aria-hidden />
          <div className="relative flex items-center justify-between border-b border-[var(--line-soft)] px-6 py-4">
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              <Send className="size-4" aria-hidden /> New message
            </span>
            <span className="text-[13px] text-[var(--muted)]">Opens your mail app</span>
          </div>
          <div className="relative grid gap-4 p-6 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-[13px] font-medium text-[var(--ink-2)]">
                  Your name
                </label>
                <input
                  id="c-name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ada Lovelace"
                  className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-[15px] placeholder:text-[var(--muted)]"
                />
              </div>
              <div>
                <label htmlFor="c-email" className="text-[13px] font-medium text-[var(--ink-2)]">
                  Your email
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-[15px] placeholder:text-[var(--muted)]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="c-msg" className="text-[13px] font-medium text-[var(--ink-2)]">
                Message
              </label>
              <textarea
                id="c-msg"
                name="message"
                required
                minLength={10}
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Hi Paul — we have an internship / junior role / lab tooling problem…"
                className="mt-1.5 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-[15px] placeholder:text-[var(--muted)]"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={!valid}>
                <Send aria-hidden /> Compose email
              </Button>
              <p className="text-sm text-[var(--muted)]" role="status" aria-live="polite">
                {status === "ready"
                  ? "Draft handed to your mail app — check it opened with your words."
                  : valid
                    ? "Ready — this will open your mail app."
                    : "Fill all fields to enable the composer."}
              </p>
            </div>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
