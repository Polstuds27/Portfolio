import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getProjectsUsingTech, sharesProject, tech, techGroups, type TechId } from "@/data/tech";

/**
 * About-section tech stack. Each item is a toggle: selecting one highlights it, dims techs that never
 * appear in a project with it, and shows a "Used in" line with case-study links under its row.
 */
export function TechExplorer() {
  const [selected, setSelected] = useState<TechId | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  const groups = useMemo(
    () => techGroups.map((g) => ({ group: g, items: tech.filter((t) => t.group === g) })).filter((g) => g.items.length),
    []
  );
  const usedIn = selected ? getProjectsUsingTech(selected) : [];

  return (
    <dl className="border-t border-[var(--line-soft)]">
      {groups.map(({ group, items }) => {
        const activeHere = items.some((t) => t.id === selected);
        return (
          <div
            key={group}
            className="grid gap-x-4 gap-y-1 border-b border-[var(--line-soft)] py-3 sm:grid-cols-[130px_minmax(0,1fr)] sm:py-4"
          >
            <dt className="pt-0.5 text-sm font-semibold sm:pt-[3px]">{group}</dt>
            <dd className="flex flex-wrap items-center text-[15px] leading-relaxed text-[var(--ink-2)]">
              {items.map((t, i) => {
                const isSelected = t.id === selected;
                const dimmed = selected !== null && !isSelected && !sharesProject(selected, t.id);
                return (
                  <span key={t.id} className="inline-flex items-center whitespace-nowrap">
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelected(isSelected ? null : t.id)}
                      className={cn(
                        "inline-flex min-h-10 cursor-pointer items-center text-left decoration-[var(--accent)] decoration-2 underline-offset-4 hover:underline focus-visible:underline sm:min-h-0",
                        "motion-safe:transition-[opacity,color] motion-safe:duration-150",
                        isSelected && "font-medium text-[var(--accent)]",
                        dimmed && "opacity-40"
                      )}
                    >
                      {t.label}
                    </button>
                    {i < items.length - 1 && (
                      <span aria-hidden className="px-1.5 text-[var(--muted)]">
                        ·
                      </span>
                    )}
                  </span>
                );
              })}
            {/* Always mounted so screen readers announce changes; only the active row gets content (and height). */}
            <div aria-live="polite" className="basis-full">

              {activeHere && selected && (
                <p className="pt-1 text-[14px] leading-relaxed">
                  {usedIn.length === 0 ? (
                    <span className="text-[var(--muted)]">Used in coursework</span>
                  ) : (
                    <>
                      <span className="font-semibold text-[var(--ink)]">Used in: </span>
                      {usedIn.map((p, i) => (
                        <span key={p.slug} className="inline-flex items-center">
                          <Link
                            to={`/projects/${p.slug}`}
                            className="inline-flex min-h-10 items-center font-medium text-[var(--ink-2)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:decoration-[var(--accent)] sm:min-h-0"
                          >
                            {p.title}
                          </Link>
                          {i < usedIn.length - 1 && (
                            <span aria-hidden className="px-1.5 text-[var(--muted)]">
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              )}
            </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
