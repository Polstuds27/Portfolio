import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Award } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/Projects";
import { About } from "@/components/About";
import { Engineering } from "@/components/Engineering";
import { Contact } from "@/components/Contact";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { certifications } from "@/data/certifications";

function PreviewCard({
  icon: Icon,
  kicker,
  title,
  emptyText,
  preview,
  to,
  linkLabel,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  kicker: string;
  title: string;
  emptyText: string;
  preview: React.ReactNode;
  to: string;
  linkLabel: string;
}) {
  return (
    <div className="surface-flat flex h-full flex-col p-6 sm:p-7">
      <p className="flex items-center gap-2 text-[13px] font-medium text-[var(--muted)]">
        <Icon className="size-4" aria-hidden /> {kicker}
      </p>
      <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">{title}</h3>
      <div className="mt-2">
        {preview ?? <p className="text-[15px] leading-relaxed text-[var(--muted)]">{emptyText}</p>}
      </div>
      <div className="mt-auto pt-5">
        <Button variant="subtle" size="sm" asChild>
          <Link to={to}>
            {linkLabel} <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function HomePage() {
  const latestJob = experiences[0];
  const latestCert = certifications[0];

  return (
    <>
      <Hero />
      <section aria-label="Featured projects" className="mx-auto max-w-6xl px-5 sm:px-8 pt-4 sm:pt-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="display-section mt-2 text-[28px] sm:text-[32px]">Latest from the log</h2>
          </div>
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link to="/projects">
              All {projects.length} builds <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
      <ProjectShowcase limit={3} withFilter={false} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-16">
        <Engineering bare />
      </div>
      <About />
      <section aria-labelledby="home-credentials-heading" className="mx-auto max-w-6xl px-5 sm:px-8 pb-4 pt-16 sm:pt-20">
        <SectionHeading
          kicker="At a glance"
          title="Experience & certifications"
          lede="A preview of the full sections — every entry lives on its own page."
        />
        <h2 id="home-credentials-heading" className="sr-only">
          Experience and certifications preview
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal>
          <PreviewCard
            icon={Briefcase}
            kicker="Work history adn events"
            title="Experience"
            emptyText="No experience entries listed yet. Roles and internships will appear here once available."
            preview={
              latestJob ? (
                <p className="text-[15px] leading-relaxed text-[var(--ink-2)]">
                  <strong className="font-semibold text-[var(--ink)]">{latestJob.role}</strong>
                  {" — "}
                  {latestJob.organization}
                  <span className="mt-1 block text-[13px] text-[var(--muted)]">
                    {latestJob.startDate}
                    {latestJob.present ? " — Present" : latestJob.endDate ? ` — ${latestJob.endDate}` : ""}
                  </span>
                </p>
              ) : undefined
            }
            to="/experience"
            linkLabel={experiences.length > 0 ? "View all experience" : "View experience"}
          />
          </Reveal>
          <Reveal delay={80}>
          <PreviewCard
            icon={Award}
            kicker="Credentials"
            title="Certifications"
            emptyText="No certifications listed yet. Verifiable credentials will appear here once earned."
            preview={
              latestCert ? (
                <p className="text-[15px] leading-relaxed text-[var(--ink-2)]">
                  <strong className="font-semibold text-[var(--ink)]">{latestCert.name}</strong>
                  <span className="mt-1 block text-[13px] text-[var(--muted)]">
                    {latestCert.issuer} · {latestCert.issued}
                  </span>
                </p>
              ) : undefined
            }
            to="/certifications"
            linkLabel={certifications.length > 0 ? "View all certifications" : "View certifications"}
          />
          </Reveal>
        </div>
      </section>
      <Contact />
    </>
  );
}
