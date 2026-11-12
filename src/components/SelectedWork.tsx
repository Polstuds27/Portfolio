import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { projects, selectedWork, type Project, type ProjectLink, type ShowcaseProject } from "@/data/projects";

function Badge({ badge }: { badge: NonNullable<ShowcaseProject["badge"]> }) {
  const tone =
    badge.tone === "award"
      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
      : "border-[var(--line)] text-[var(--muted)]";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] font-medium leading-5 ${tone}`}
    >
      {badge.label}
    </span>
  );
}

function StackLine({ items }: { items: string[] }) {
  return (
    <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">
      <span className="sr-only">Built with: </span>
      {items.join("  ·  ")}
    </p>
  );
}

function Highlights({ items, className = "" }: { items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((h) => (
        <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-[var(--ink)]">
          <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          {h}
        </li>
      ))}
    </ul>
  );
}

/** Screenshot with fixed 16:10 box so nothing shifts; falls back to a labelled panel if the file is missing. */
function Shot({
  image,
  title,
  width,
  height,
  eager = false,
  className = "",
}: {
  image: ShowcaseProject["image"];
  title: string;
  width: number;
  height: number;
  eager?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`aspect-[16/10] overflow-hidden rounded-lg border border-[var(--line-soft)] bg-[var(--elevated)] ${className}`}
    >
      {failed ? (
        <div
          role="img"
          aria-label={image.alt}
          className="flex h-full w-full items-center justify-center text-sm font-medium text-[var(--muted)]"
        >
          {title}
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}

const textLink =
  "inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]";

function ProjectLinkItem({ link, primary = false }: { link: ProjectLink; primary?: boolean }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={textLink}>
        {link.label} <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  if (primary) {
    return (
      <Button size="sm" asChild>
        <Link to={link.href}>
          {link.label} <ArrowRight aria-hidden />
        </Link>
      </Button>
    );
  }
  return (
    <Link to={link.href} className={textLink}>
      {link.label} <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

function Links({ project, primaryCaseStudy = false }: { project: ShowcaseProject; primaryCaseStudy?: boolean }) {
  if (!project.links.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {project.links.map((l) => (
        <ProjectLinkItem key={l.label} link={l} primary={primaryCaseStudy && l.label === "Case study"} />
      ))}
    </div>
  );
}

function FeaturedCard({ project }: { project: ShowcaseProject }) {
  const titleId = `work-${project.slug}-title`;
  return (
    <article aria-labelledby={titleId} className="surface overflow-hidden">
      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-10 lg:p-10">
        <Shot
          image={project.image}
          title={project.title}
          width={1600}
          height={1000}
          eager
          className="md:order-last"
        />
        <div className="min-w-0">
          {project.badge && <Badge badge={project.badge} />}
          <h3 id={titleId} className="display-section mt-3 text-[30px] sm:text-[36px]">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[16px] text-[var(--ink-2)]">{project.tagline}</p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--ink-2)]">{project.pitch}</p>
          <Highlights items={project.highlights} className="mt-5" />
          <div className="mt-5">
            <StackLine items={project.stack} />
          </div>
          <div className="mt-6">
            <Links project={project} primaryCaseStudy />
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkRow({ project }: { project: ShowcaseProject }) {
  const titleId = `work-${project.slug}-title`;
  return (
    <article
      aria-labelledby={titleId}
      className="grid gap-5 py-10 sm:grid-cols-[minmax(0,1fr)_240px] sm:items-start sm:gap-10"
    >
      <Shot image={project.image} title={project.title} width={240} height={150} className="w-full sm:order-last" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 id={titleId} className="text-[22px] font-semibold leading-tight tracking-[-0.02em]">
            {project.title}
          </h3>
          {project.badge && <Badge badge={project.badge} />}
        </div>
        <p className="mt-1.5 text-[15.5px] text-[var(--ink-2)]">{project.tagline}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-2)]">{project.pitch}</p>
        <Highlights items={project.highlights} className="mt-4" />
        <div className="mt-4">
          <StackLine items={project.stack} />
        </div>
        <div className="mt-5">
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

/** Text-only row in the same style as WorkRow, for builds that have no showcase entry. */
function BuildRow({ project }: { project: Project }) {
  const titleId = `build-${project.slug}-title`;
  return (
    <article aria-labelledby={titleId} className="py-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 id={titleId} className="text-[22px] font-semibold leading-tight tracking-[-0.02em]">
          {project.title}
        </h3>
        <span className="inline-flex items-center rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[12px] font-medium leading-5 text-[var(--muted)]">
          {project.status}
        </span>
      </div>
      <p className="mt-1.5 text-[15.5px] text-[var(--ink-2)]">{project.tagline}</p>
      <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-[var(--ink-2)]">{project.solution}</p>
      <div className="mt-4">
        <StackLine items={project.stack.slice(0, 6)} />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <ProjectLinkItem link={{ label: "Case study", href: `/projects/${project.slug}` }} />
        {project.repos?.map((r) => (
          <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className={textLink}>
            {r.label} <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
      </div>
    </article>
  );
}

const showcased = new Set(selectedWork.map((p) => p.slug));

/** Every build that isn't in the Selected work showcase (Projects page only). */
export function MoreBuilds() {
  const others = projects.filter((p) => !showcased.has(p.slug));
  if (others.length === 0) return null;
  return (
    <section aria-labelledby="more-builds-heading" className="relative isolate bg-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20">
        <h2 id="more-builds-heading" className="display-section text-[28px] sm:text-[32px]">
          More builds
        </h2>
        <div className="mt-2 divide-y divide-[var(--line-soft)] border-b border-[var(--line-soft)]">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 60}>
              <BuildRow project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** `page` = rendered as the Projects page: h1 title and no "All builds" link. */
export function SelectedWork({ page = false }: { page?: boolean }) {
  const featured = selectedWork.find((p) => p.featured);
  const rest = selectedWork.filter((p) => p !== featured);
  const Heading = page ? "h1" : "h2";

  return (
    // relative + isolate + solid background keeps the hero's sparkles canvas from painting over this section
    <section
      aria-labelledby="selected-work-heading"
      className="relative isolate z-10 bg-[var(--paper)]"
    >
      <div className={`mx-auto max-w-6xl px-5 pb-4 sm:px-8 ${page ? "pt-10 sm:pt-12" : "pt-4 sm:pt-6"}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading
            id="selected-work-heading"
            className={`display-section ${page ? "text-[34px] sm:text-[44px]" : "text-[28px] sm:text-[32px]"}`}
          >
            {page ? "Projects" : "Selected work"}
          </Heading>
          {!page && (
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <Link to="/projects">
                All {projects.length} builds <ArrowRight aria-hidden />
              </Link>
            </Button>
          )}
        </div>

        <div className="mt-6 grid gap-6">
          {featured && (
            <Reveal>
              <FeaturedCard project={featured} />
            </Reveal>
          )}
          {rest.length > 0 && (
            <div className="divide-y divide-[var(--line-soft)] border-b border-[var(--line-soft)]">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 60}>
                  <WorkRow project={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
