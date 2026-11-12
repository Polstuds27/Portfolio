import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { TechExplorer } from "@/components/TechExplorer";
import { AwayFromKeyboard } from "@/components/AwayFromKeyboard";

const copy = (
  <div className="grid content-start gap-4 text-[16.5px] leading-relaxed text-[var(--ink-2)]">
    <p>
      I'm Paul Adrianne Mojal, a backend-focused IT student at Bulacan State University (BSIT, expected 2027). I like
      turning messy workflows into software that keeps working in real conditions: a lab without ticketing, call QA
      that can't touch the cloud, a finance app on a patchy connection.
    </p>
    <p>
      I start with the domain, pick the simplest stack that fits, and only claim what I can show. If a number isn't
      measured, it doesn't go on the page.
    </p>
    {/* TODO: Paul, confirm what you're looking for (internship, junior role, freelance, start date). */}
    <p className="text-[var(--ink)]">I'm looking for an internship or junior role on a backend or full-stack team.</p>
  </div>
);

const stack = (
  <>
    <p className="mb-3 text-[13px] text-[var(--muted)]">Select a technology to see where I've used it.</p>
    <TechExplorer />
  </>
);

/**
 * Desktop (lg+): left = copy + "Away from the keyboard", right = tech stack.
 * Mobile: copy → tech stack → "Away from the keyboard".
 */
export function AboutBrief({ page = false }: { page?: boolean }) {
  return (
    <HomeSection
      id="about"
      title="About"
      as={page ? "h1" : "h2"}
      link={page ? undefined : { to: "/about", label: "More about me" }}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-x-14 lg:gap-y-10">
        <Reveal className="lg:col-start-1 lg:row-start-1">{copy}</Reveal>
        <Reveal delay={80} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {stack}
        </Reveal>
        <Reveal className="lg:col-start-1 lg:row-start-2">
          <AwayFromKeyboard />
        </Reveal>
      </div>
    </HomeSection>
  );
}
