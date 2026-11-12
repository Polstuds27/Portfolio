import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HomeSection } from "@/components/HomeSection";
import { Reveal } from "@/components/Reveal";
import { experiences, type Experience } from "@/data/experience";
import { certifications, type Certification } from "@/data/certifications";

const year = (date: string) => date.split(" ").pop() ?? date;

function dateRange(start: string, end?: string, present?: boolean) {
  if (present) return `${start} — Present`;
  if (!end || end === start) return start;
  return `${start} — ${end}`;
}

const smallLink =
  "inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]";

function EntryLink({ link }: { link: NonNullable<Experience["link"]> }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={smallLink}>
        {link.label} <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link to={link.href} className={smallLink}>
      {link.label} <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

const homeCerts = certifications.filter((c) => c.showOnHome !== false);

/** Experience timeline: used on the home page and as the Experience page. */
export function ExperienceTimeline() {
  if (experiences.length === 0) return <p className="text-[15px] text-[var(--muted)]">No entries yet.</p>;
  return (
    <ol className="divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
      {experiences.map((e, i) => (
        <li key={e.id}>
          <Reveal delay={(i % 3) * 60}>
            <article className="grid gap-2 py-7 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
              <p className="pt-1 text-[13px] tabular-nums text-[var(--muted)]">
                {dateRange(e.startDate, e.endDate, e.present)}
              </p>
              <div className="min-w-0">
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em]">
                  {e.role}
                  <span className="font-normal text-[var(--ink-2)]"> · {e.organization}</span>
                </h3>
                <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-[var(--ink-2)]">{e.description}</p>
                {e.link && (
                  <div className="mt-3">
                    <EntryLink link={e.link} />
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Compact certification list. The home page shows a subset with a link out; the Certifications page shows all. */
export function CertificationList({ certs = certifications, withLink = false }: { certs?: Certification[]; withLink?: boolean }) {
  if (certs.length === 0) return <p className="text-[15px] text-[var(--muted)]">No certifications listed yet.</p>;
  const anyVerify = certs.some((c) => c.verifyUrl ?? c.assetUrl);
  return (
    <div className="min-w-0">
      <ul className="divide-y divide-[var(--line-soft)]">
        {certs.map((c) => {
          const href = c.verifyUrl ?? c.assetUrl;
          return (
            <li
              key={c.id}
              className={`grid gap-x-6 gap-y-0.5 py-3 sm:items-baseline ${
                anyVerify ? "sm:grid-cols-[minmax(0,1fr)_auto_5.5rem]" : "sm:grid-cols-[minmax(0,1fr)_auto]"
              }`}
            >
              <span className="text-[15px] font-semibold leading-snug" title={c.shortName ? c.name : undefined}>
                {c.shortName ?? c.name}
              </span>
              <span className="text-[14px] text-[var(--muted)]" title={c.issuer}>
                {c.issuerShort ?? c.issuer} · {year(c.issued)}
              </span>
              {anyVerify && (
                <span className="sm:text-right">
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
                    >
                      Verify <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">{c.name} (opens in a new tab)</span>
                    </a>
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {withLink && (
        <div className="mt-3">
          <Link to="/certifications" className={smallLink}>
            All certifications <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}

export function ExperienceRecognition() {
  return (
    <HomeSection id="experience" title="Experience & recognition" link={{ to: "/experience", label: "Full history" }}>
      <ExperienceTimeline />
      {homeCerts.length > 0 && (
        <Reveal className="mt-10 grid gap-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
          <h3 className="pt-3 text-[13px] font-medium text-[var(--muted)]">Certifications</h3>
          <CertificationList certs={homeCerts} withLink />
        </Reveal>
      )}
    </HomeSection>
  );
}
