import { useState } from "react";
import { FileCode2, Layers, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const tabs = [
  {
    value: "stack",
    label: "Stack",
    icon: Layers,
    body: [
      ["Frontend", "React 19 · TypeScript · Vite 6/8 · Tailwind v4 · Radix UI · shadcn patterns · lucide-react"],
      ["Backend", "Django + DRF · Firebase Auth/Firestore · Supabase (coffee_shops) · django-q ORM broker"],
      ["Data", "PostgreSQL (Docker Compose local, Neon pooled prod) · Dexie/IndexedDB · PWA caches"],
      ["AI (local-first)", "Whisper base in Web Worker · Ollama qwen2.5:3b on localhost · Gemini for DTR structuring"],
      ["Ship", "Vercel (web/) · Render blueprint (api/) · tsc + vite build gates"],
    ],
  },
  {
    value: "decisions",
    label: "Decisions",
    icon: FileCode2,
    body: [
      ["Why offline-first?", "FinTrack treats the device as source of truth, then syncs against a shared contract — labs and finance desks lose connectivity constantly."],
      ["Why no cloud audio?", "Linewise keeps call audio on-device (Whisper worker + localhost Ollama). Privacy is an architecture choice, not a policy paragraph."],
      ["Why split deploy?", "Vercel for the PWA shell, Render + Neon for the API. Each side scales and fails independently."],
      ["Why this restraint?", "Quiet surfaces and one accent make hierarchy clear — the same reason scorecards use hard red/amber/green cutoffs."],
    ],
  },
  {
    value: "quality",
    label: "Quality gates",
    icon: ShieldCheck,
    body: [
      ["Evidence rule", "QA verdicts require a transcript quote; rejected if the quote isn't in the transcript. No invented accuracy numbers."],
      ["Redaction", "Deterministic PII pass (card regex + Luhn, email, PH mobile) before any export. Exports stay redacted."],
      ["Score math", "Bank Support v2: weights sum to 100, green ≥85 / amber 70–84 / red <70, critical fail forces red, N/A scaled out."],
      ["Build gates", "tsc -b + vite build must pass. Lint where configured. E2E only where a harness exists (Linewise phase1-e2e)."],
    ],
  },
];

const principles = ["Offline-first", "Local AI where it matters", "Typed contracts", "Redacted by default", "Build gates pass"];

export function Engineering({ bare = false }: { bare?: boolean }) {
  const [tab, setTab] = useState("stack");
  const inner = (
    <>
      <SectionHeading
        kicker="Engineering journal"
        title="How I engineer"
        lede="The patterns repeat across every build: model the domain, keep data close, prove it with a gate."
      />
      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              <t.icon className="size-4" aria-hidden /> {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <div className="border-t border-[var(--line-soft)]">
              {t.body.map(([k, v]) => (
                <Reveal key={k}>
                <article className="grid gap-1 border-b border-[var(--line-soft)] py-5 sm:grid-cols-[220px_1fr] sm:gap-6">
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{k}</h3>
                  <p className="text-[15px] leading-relaxed text-[var(--ink-2)]">{v}</p>
                </article>
                </Reveal>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Principles">
        {principles.map((p) => (
          <span key={p} className="inline-flex items-center gap-2 text-sm text-[var(--ink-2)]">
            <span aria-hidden className="size-1 rounded-full bg-[var(--accent)]" />
            {p}
          </span>
        ))}
      </div>
    </>
  );

  if (bare) return <section aria-labelledby="eng-heading">{inner}</section>;

  return (
    <section aria-labelledby="eng-heading" className={cn("mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20")}>
      {inner}
    </section>
  );
}
