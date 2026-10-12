import { GraduationCap, Code2, Database, Globe } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const timeline = [
  {
    when: "Now",
    title: "Backend + local-AI builds",
    body: "FinTrack (offline-first finance PWA: React + Django + Postgres sync), Linewise (offline-first AI call QA, 6th place at the AppBuildersPH hackathon), and Safe Bite (mobile backend on Firebase with barcode-based allergen checking).",
  },
  {
    when: "2025 — 2026",
    title: "Deployed systems & verified training",
    body: "iLabCICT Laboratory Management System — backend API (JWT security, optimized queries, realtime tickets, notifications, reporting), now deployed for BulSU CICT. PocketLLM (browser side-panel chat over a Groq + Tavily agent backend) and FlashQuiz (PDF → OCR → Gemini flashcards). AppBuildersPH hackathon — Top 6 of 400+ teams, Tutorials Dojo Award. Salesforce virtual internship and IT Specialist — Python (Certiport).",
  },
  {
    when: "Ongoing",
    title: "Community & exploration",
    body: "CafeCollective — Next.js coffee-shop discovery on OpenStreetMap. SeekICT — auth-gated app with email OTP and role-aware UI. WorkPulse AI — DTR workflow with a Gemini structuring pass.",
  },
];

const toolkit = [
  { label: "Web", items: "JavaScript · TypeScript · React · Tailwind CSS · Vite · HTML5 · CSS3" },
  { label: "Backend", items: "Python · Django REST Framework · Node.js · PHP · Java" },
  { label: "Mobile", items: "Java · XML (Android layouts)" },
  { label: "Databases", items: "PostgreSQL · MySQL · Firebase NoSQL" },
  { label: "Tools & AI", items: "Git · GitHub · Figma · VS Code · Postman · XAMPP · JetBrains IDEs · Google AI Studio · Groq Studio · Tavily · Chrome MV3 · Cloudinary · OpenCode" },
  { label: "Shipping", items: "Vercel · Render · Neon Postgres · Docker Compose" },
];

const strengths = [
  { icon: Code2, title: "Backend APIs", body: "Django REST Framework with JWT auth, throttling, and WebSocket realtime. Optimized Postgres queries, MySQL, and Firebase NoSQL sync." },
  { icon: Database, title: "Frontend & mobile", body: "React 19, TypeScript, Vite, Tailwind CSS. Java + XML on mobile with Firebase-backed sync." },
  { icon: Globe, title: "Deployment", body: "Vercel frontends, Render backends, Neon Postgres, Cloudinary media. Environment-split configs, build checks before ship." },
  { icon: GraduationCap, title: "School", body: "Bulacan State University — BS Information Technology, Web & Mobile Applications Development (2023 – expected 2027). Two-time Dean's Lister; previously STEM at Dr. Yanga's Colleges with academic excellence awards." },
];

export function About() {
  return (
    <section aria-labelledby="about-heading" className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeading
        kicker="About"
        title="About the builder"
        lede="I'm Paul Adrianne Mojal, a backend-focused IT student who prefers working software over slide decks. I learn by shipping department tools, hackathon prototypes, and apps I actually use."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <div className="surface h-fit p-7 sm:p-8">
          <p className="text-[13px] font-medium text-[var(--muted)]">Working philosophy</p>
          <blockquote className="mt-3 font-display text-[24px] font-semibold leading-[1.25] tracking-[-0.02em]">
            “Offline first. Evidence over claims. Ship the smallest thing that survives contact with
            users.”
          </blockquote>
          <div className="mt-5 grid gap-3 text-[15.5px] leading-relaxed text-[var(--ink-2)]">
            <p>
              I turn messy workflows into practical software. Whether it’s a lab without ticketing, 
              QA workflow without the cloud, or a mobile app with limited connectivity, I start 
              with the domain, choose the simplest stack that fits, and use AI-assisted development to 
              accelerate implementation—from first model to deployment.
            </p>
            <p>
              I don’t invent testimonials or metrics. If a number isn’t measured, I don’t print it —
              see the Linewise scorecard rules for how seriously I take that.
            </p>
          </div>
          <dl className="mt-6 border-t border-[var(--line-soft)]">
            {toolkit.map((t) => (
              <div key={t.label} className="grid gap-1 border-b border-[var(--line-soft)] py-3.5 sm:grid-cols-[140px_1fr] sm:gap-4">
                <dt className="text-sm font-semibold">{t.label}</dt>
                <dd className="text-sm leading-relaxed text-[var(--ink-2)]">{t.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 id="about-heading" className="text-[13px] font-medium text-[var(--muted)]">
            Timeline — verified builds only
          </h3>
          <ol className="mt-4 border-t border-[var(--line-soft)]">
            {timeline.map((t, i) => (
              <li key={t.title} className="border-b border-[var(--line-soft)] py-5">
                <Reveal delay={(i % 3) * 60} className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4">
                <span className="pt-1 text-[13px] text-[var(--muted)]">{t.when}</span>
                <span>
                  <span className="block text-[17px] font-semibold tracking-[-0.01em]">{t.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-[var(--ink-2)]">{t.body}</span>
                </span>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 80} className="surface-flat p-5 h-full">
                <s.icon className="size-5 text-[var(--ink-2)]" aria-hidden />
                <p className="mt-2.5 font-semibold tracking-[-0.01em]">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--ink-2)]">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
