import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, categories, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

function StackLine({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`text-[13.5px] leading-relaxed text-[var(--muted)] ${className}`}>
      {items.join("  ·  ")}
    </p>
  );
}

export function RepoLinks({ project, className = "" }: { project: Project; className?: string }) {
  if (!project.repos?.length) return null;
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-4 gap-y-1 ${className}`}>
      {project.repos.map((r) => (
        <a
          key={r.url}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
        >
          {r.label} <ArrowUpRight className="size-4" aria-hidden />
        </a>
      ))}
    </span>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article aria-label={`Featured: ${project.title}`} className="surface relative overflow-hidden">
      <div className="card-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative grid gap-0 md:grid-cols-[1.25fr_1fr]">
        <div className="p-7 sm:p-10">
          <p className="text-[13px] font-medium text-[var(--muted)]">
            {project.index} — {project.status}
          </p>
          <h3 className="display-section mt-3 text-[30px] sm:text-[36px]">{project.title}</h3>
          <p className="mt-2 text-[16px] text-[var(--ink-2)]">{project.tagline}</p>
          <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--ink-2)]">
            {project.solution}
          </p>
          <StackLine items={project.stack} className="mt-5" />
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button size="sm" asChild>
              <Link to={`/projects/${project.slug}`}>
                Case study <ArrowRight aria-hidden />
              </Link>
            </Button>
            <RepoLinks project={project} />
          </div>
        </div>
        <div className="border-t border-[var(--line-soft)] p-7 sm:p-10 md:border-l md:border-t-0">
          <p className="text-[13px] font-medium text-[var(--muted)]">Why it matters</p>
          <p className="mt-2 text-[15px] leading-relaxed">{project.problem}</p>
          <div className="hairline mt-6 pt-5">
            <p className="text-[13px] font-medium text-[var(--muted)]">What I did</p>
            <p className="mt-1.5 text-sm font-medium leading-snug">{project.role}</p>
            <ul className="mt-3 space-y-2">
              {project.notes.map((n) => (
                <li key={n} className="text-sm leading-relaxed text-[var(--ink-2)]">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="group grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span aria-hidden className="text-sm tabular-nums text-[var(--muted)]">
            {project.index}
          </span>
          <h3 className="text-[22px] font-semibold tracking-[-0.02em] leading-tight">
            <Link
              to={`/projects/${project.slug}`}
              className="transition-opacity hover:opacity-70"
            >
              {project.title}
            </Link>
          </h3>
          <span className="text-[13px] text-[var(--muted)]">{project.status}</span>
        </div>
        <p className="mt-1.5 text-[15.5px] text-[var(--ink-2)]">{project.tagline}</p>
        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-2)]">
          {project.solution}
        </p>
        <StackLine items={project.stack.slice(0, 6)} className="mt-3" />
      </div>
      <div className="flex items-center gap-5 sm:flex-col sm:items-end sm:gap-2">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)] transition-opacity hover:opacity-70"
        >
          Case study <ArrowRight className="size-4" aria-hidden />
        </Link>
        <RepoLinks project={project} />
      </div>
    </article>
  );
}

export function ProjectShowcase({ limit, withFilter = true }: { limit?: number; withFilter?: boolean }) {
  const [tab, setTab] = useState<string>("all");
  const filtered = useMemo(() => {
    const base = tab === "all" ? projects : projects.filter((p) => p.category === tab);
    return limit ? base.slice(0, limit) : base;
  }, [tab, limit]);

  if (!withFilter && limit) {
    const [first, ...rest] = filtered;
    return (
      <section aria-label="Featured projects" className="mx-auto max-w-6xl px-5 sm:px-8 pb-4">
        <div className="mt-6 grid gap-8">
          {first && (
            <Reveal>
              <FeaturedProject project={first} />
            </Reveal>
          )}
          {rest.length > 0 && (
            <div className="divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 60}>
                  <ProjectRow project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  const [first, ...rest] = tab === "all" ? filtered : [];
  const showFeatured = tab === "all" && first;
  const rows = tab === "all" ? rest : filtered;

  return (
    <section aria-labelledby="projects-heading" className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeading
        kicker="Selected work"
        title="Projects with receipts"
        lede={`${projects.length} real builds from my workspace — no mock startups, no invented metrics. Each entry states the problem, the solution, and what I actually did.`}
      />

      {withFilter ? (
        <Tabs value={tab} onValueChange={setTab} className="mt-8">
          <TabsList>
            {categories.map((c) => (
              <TabsTrigger key={c.value} value={c.value}>
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tab} key={tab}>
            <p className="text-[13px] text-[var(--muted)]" role="status">
              Showing {filtered.length} of {projects.length} builds
            </p>
            <div className="mt-6 grid gap-10">
              {showFeatured && (
                <Reveal>
                  <FeaturedProject project={first!} />
                </Reveal>
              )}
              {rows.length > 0 && (
                <div className="divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
                  {rows.map((p, i) => (
                    <Reveal key={p.slug} delay={(i % 3) * 60}>
                      <ProjectRow project={p} />
                    </Reveal>
                  ))}
                </div>
              )}
              {filtered.length === 0 && (
                <p className="surface-flat p-6 text-center text-[var(--muted)]">
                  No builds in this lane yet.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="mt-8 grid gap-10">
          {filtered.map((p, i) => (i === 0 ? <FeaturedProject key={p.slug} project={p} /> : <ProjectRow key={p.slug} project={p} />))}
        </div>
      )}
    </section>
  );
}
