import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { RepoLinks } from "@/components/Projects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = idx >= 0 ? projects[idx] : undefined;

  if (!project) {
    return (
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center">
        <p className="text-sm font-medium text-[var(--muted)]">Missing entry</p>
        <h1 className="display-section mt-3 text-4xl">No such build</h1>
        <p className="mt-3 leading-relaxed text-[var(--ink-2)]">
          “{slug}” isn’t in the log. It may have been renamed or never shipped.
        </p>
        <Button asChild className="mt-6">
          <Link to="/projects">
            <ArrowLeft aria-hidden /> Back to projects
          </Link>
        </Button>
      </div>
    );
  }

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-[13px] text-[var(--muted)]">
        <Link to="/" className="transition-colors hover:text-[var(--ink)]">Home</Link>
        <span aria-hidden className="mx-2 opacity-50">/</span>
        <Link to="/projects" className="transition-colors hover:text-[var(--ink)]">Projects</Link>
        <span aria-hidden className="mx-2 opacity-50">/</span>
        <span aria-current="page" className="font-medium text-[var(--ink)]">{project.title}</span>
      </nav>

      <p className="mt-8 text-sm font-medium text-[var(--muted)]">
        {project.index} — {project.status}
      </p>
      <h1 className="display-section mt-3 text-[40px] sm:text-[52px]">
        {project.title}
      </h1>
      <p className="mt-3 text-[17px] leading-relaxed text-[var(--ink-2)]">
        {project.tagline} · {project.role}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <section aria-labelledby="pd-problem" className="surface-flat p-6">
          <h2 id="pd-problem" className="text-sm font-semibold">
            Problem
          </h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-[var(--ink-2)]">{project.problem}</p>
        </section>
        <section aria-labelledby="pd-solution" className="surface-flat p-6">
          <h2 id="pd-solution" className="text-sm font-semibold">
            Solution
          </h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-[var(--ink-2)]">{project.solution}</p>
        </section>
      </div>

      <section aria-label="Engineering notes" className="surface-elevated mt-4 p-6 sm:p-7">
        <h2 className="text-[13px] font-medium text-[var(--muted)]">
          Field notes
        </h2>
        <ul className="mt-3 grid gap-2">
          {project.notes.map((n) => (
            <li key={n} className="text-[15px] leading-relaxed text-[var(--ink-2)]">
              {n}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13.5px] leading-relaxed text-[var(--muted)]" aria-label="Tech stack">
          {project.stack.join("  ·  ")}
        </p>
        <RepoLinks project={project} className="mt-4" />
      </section>

      <nav aria-label="More builds" className="mt-10 grid gap-3 sm:grid-cols-2">
        <Button variant="outline" asChild className="justify-between rounded-2xl">
          <Link to={`/projects/${prev.slug}`}>
            <ArrowLeft aria-hidden /> {prev.title}
          </Link>
        </Button>
        <Button asChild className="justify-between rounded-2xl">
          <Link to={`/projects/${next.slug}`}>
            {next.title} <ArrowRight aria-hidden />
          </Link>
        </Button>
      </nav>
    </article>
  );
}
