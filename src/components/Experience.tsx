import { Briefcase, MapPin, FileCode2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { experiences } from "@/data/experience";

function dateRange(start: string, end: string | undefined, present: boolean | undefined) {
  if (present) return `${start} — Present`;
  return end ? `${start} — ${end}` : start;
}

export function Experience() {
  return (
    <section aria-labelledby="experience-heading" className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeading
        kicker="Work history"
        title="Experience"
        lede="Roles, internships, hackathons, and sustained project work."
      />

      {experiences.length === 0 ? (
        <div
          className="surface-flat mx-auto mt-10 max-w-xl p-8 text-center sm:p-10"
          role="status"
        >
          <Briefcase className="mx-auto size-6 text-[var(--muted)]" aria-hidden />
          <h3 id="experience-heading" className="mt-3 text-xl font-semibold tracking-[-0.02em]">
            No experience entries yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">
            Professional experience will be listed here once it’s available. Entries are
            data-driven — add them in{" "}
            <code className="rounded-md bg-[var(--elevated)] px-1.5 py-0.5 font-mono text-[13px]">
              src/data/experience.ts
            </code>{" "}
            and they render automatically.
          </p>
        </div>
      ) : (
        <>
          <h3 id="experience-heading" className="sr-only">
            Work experience
          </h3>
          <ol className="mt-10 grid max-w-3xl gap-0 border-t border-[var(--line-soft)]">
            {experiences.map((e, i) => (
              <li key={e.id} className="relative border-b border-[var(--line-soft)] py-7 pl-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-9 size-2 rounded-full bg-[var(--accent)]"
                />
                <Reveal delay={(i % 3) * 60}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{e.role}</h3>
                  <span className="text-[15px] text-[var(--muted)]">{e.organization}</span>
                </div>
                <p className="mt-1 text-[13px] text-[var(--muted)]">
                  {dateRange(e.startDate, e.endDate, e.present)}
                  {e.employmentType ? ` · ${e.employmentType}` : ""}
                </p>
                {(e.location || e.technologies.length > 0) && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {e.location && (
                      <span className="inline-flex items-center gap-1 text-[13px] text-[var(--muted)]">
                        <MapPin className="size-3.5" aria-hidden /> {e.location}
                      </span>
                    )}
                    {e.technologies.length > 0 && (
                      <span className="text-[13px] text-[var(--muted)]">
                        {e.technologies.join(" · ")}
                      </span>
                    )}
                  </div>
                )}
                <p className="mt-2 max-w-3xl text-[15.5px] leading-relaxed text-[var(--ink-2)]">
                  {e.description}
                </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </>
      )}

      <p className="mt-8 flex items-center gap-2 text-sm text-[var(--muted)]">
        <FileCode2 className="size-4" aria-hidden />
        Related hands-on work is documented in the project build log.
      </p>
    </section>
  );
}
