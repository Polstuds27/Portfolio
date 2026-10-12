import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechStackGrid } from "@/components/TechStack";

export const LINKEDIN = "https://www.linkedin.com/in/paul-adrianne-mojal-56a948294/";
export const PHOTO_URL = `${import.meta.env.BASE_URL}avatar.png`;

const capabilities = [
  { label: "Role", value: "Full-stack · Backend focus" },
  { label: "Focus", value: "REST APIs, sync, local AI" },
  { label: "School", value: "BulSU — BSIT" },
  { label: "Now", value: "FinTrack PWA + Linewise" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-10 sm:pb-12">
        <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="max-w-[640px]">
            <p className="flex items-center gap-2 text-sm font-medium text-[var(--ink-2)]">
              <span aria-hidden className="size-2 rounded-full bg-[var(--accent)]" />
              Open to internships &amp; junior roles
            </p>
            <p className="eyebrow mt-5">Paul Adrianne Mojal — Bulacan State University, BSIT</p>
            <h1
              id="hero-title"
              className="display-hero mt-4 text-[44px] leading-[1.04] sm:text-[64px] lg:text-[68px]"
            >
              I build{" "}
              <span className="underline decoration-[var(--accent)] decoration-[0.09em] underline-offset-[0.16em]">
                offline-first
              </span>{" "}
              apps that survive the real world.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[17px] sm:text-lg leading-relaxed text-[var(--ink-2)]">
              IT student focused on backend development — REST APIs with Django REST Framework,
              JWT security, WebSocket realtime, and tuned Postgres queries — with React and
              TypeScript frontends on top as well as using AI-assisted development 
              for enhancing projects and streamlining development processes. My recent work spans 
              an offline-first finance PWA with a real sync protocol, a deployed lab-management 
              backend for my university, and an on-device call-center QA pipeline that never 
              sends audio to the cloud.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/projects">
                  View projects <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
              <a
                href="https://github.com/Polstuds27"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                <Github className="size-4" aria-hidden /> Polstuds27
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                <Linkedin className="size-4" aria-hidden /> LinkedIn
              </a>
              <a
                href="mailto:paul.mojal@gmail.com"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                <Mail className="size-4" aria-hidden /> paul.mojal@gmail.com
              </a>
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <MapPin className="size-4" aria-hidden /> Bocaue, Bulacan
              </span>
            </div>
          </div>

          <aside
            aria-label="Profile summary"
            className="surface p-6 sm:p-7 lg:mt-2 lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={PHOTO_URL}
                alt="Paul Adrianne Mojal"
                className="size-16 shrink-0 rounded-full border border-[var(--line-soft)] bg-[var(--elevated)] object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[16px] font-semibold tracking-[-0.01em]">
                  Paul Adrianne Mojal
                </p>
                <p className="text-sm text-[var(--muted)]">Full-stack developer</p>
              </div>
              <span
                aria-hidden
                className="ml-auto flex items-center gap-1.5 text-[13px] text-[var(--muted)]"
              >
                <span className="size-1.5 rounded-full bg-[var(--accent)]" />
                Available
              </span>
            </div>

            <dl className="mt-6 space-y-3.5">
              {capabilities.map((c) => (
                <div key={c.label} className="grid grid-cols-[72px_1fr] gap-3 text-[15px]">
                  <dt className="text-sm text-[var(--muted)]">{c.label}</dt>
                  <dd className="font-medium leading-snug">{c.value}</dd>
                </div>
              ))}
            </dl>

            <div className="hairline mt-4 pt-4" aria-label="Technical stack">
              <p className="text-[13px] text-[var(--muted)]">Stack</p>
              <div className="mt-2.5">
                <TechStackGrid compact />
              </div>
            </div>

            <div className="hairline mt-4 pt-4">
              <p className="text-[13px] text-[var(--muted)]">Featured project</p>
              <Link
                to="/projects/linewise"
                className="group mt-1.5 inline-flex items-center gap-1.5 text-[16px] font-semibold tracking-[-0.01em] transition-opacity hover:opacity-75"
              >
                Linewise
                <ArrowUpRight
                  className="size-4 text-[var(--accent)] transition-transform duration-150 group-hover:translate-x-px group-hover:-translate-y-px"
                  aria-hidden
                />
              </Link>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                Offline-first AI call QA — transcribe, redact, score, coach.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
