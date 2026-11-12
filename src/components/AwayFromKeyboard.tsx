import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PhotoBox, type PhotoPrint } from "@/components/ui/photo-box";
import { hobbies } from "@/data/hobbies";

const prints: PhotoPrint[] = hobbies.map((h) => ({
  id: h.id,
  title: h.name,
  caption: h.caption,
  src: h.image.src,
  alt: h.image.alt,
}));

/**
 * Photo folder + hobby selector. The selected hobby drives which print the folder opens;
 * opening a print selects its hobby. Escape or a click outside closes, and focus returns to the opener.
 */
/** `prominent` = larger heading, matching the About page's "Tech stack" heading. */
export function AwayFromKeyboard({ prominent = false }: { prominent?: boolean }) {
  const [active, setActive] = useState(hobbies[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openPrint = (id: string) => {
    if (!open) openerRef.current = document.activeElement as HTMLElement | null;
    setActive(id);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    const el = openerRef.current;
    openerRef.current = null;
    if (el && document.contains(el)) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  };

  // Escape anywhere, or a pointer down outside this block, closes the open print.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      // The mobile overlay is portalled to <body>; it handles its own outside clicks.
      if ((t as Element).closest?.('[role="dialog"][aria-modal="true"]')) return;
      if (!blockRef.current?.contains(t)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const selected = hobbies.find((h) => h.id === active) ?? hobbies[0];
  if (!selected) return null;

  return (
    <div ref={blockRef}>
      <h3
        className={cn(
          prominent
            ? "text-[19px] font-semibold tracking-[-0.015em] text-[var(--ink)]"
            : "text-[13px] font-medium text-[var(--muted)]"
        )}
      >
        Away from the keyboard
      </h3>
      <div className="mt-3 grid items-center gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <PhotoBox
          prints={prints}
          label={`${prints.length} prints · tap to open`}
          selected={open ? active : null}
          onCoverActivate={() => openPrint(active)}
          onPrintActivate={openPrint}
          onClose={close}
          // The stage keeps headroom for the enlarged print; when prominent, pull it up under the heading.
          className={cn("mx-auto max-w-[360px] sm:mx-0", prominent && "sm:-mt-16 sm:max-w-[440px] lg:-mt-20")}
        />

        <div>
          <div role="group" aria-label="Hobbies" className="flex flex-wrap items-center text-[15px]">
            {hobbies.map((h, i) => {
              const isActive = h.id === active;
              return (
                <span key={h.id} className="inline-flex items-center">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`${h.name}${open ? `: show ${h.name} photo` : ""}`}
                    onClick={() => setActive(h.id)}
                    className={cn(
                      "inline-flex min-h-10 cursor-pointer items-center font-medium decoration-[var(--accent)] decoration-2 underline-offset-4 hover:underline focus-visible:underline",
                      "motion-safe:transition-colors motion-safe:duration-150",
                      isActive ? "text-[var(--accent)]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                    )}
                  >
                    {h.name}
                  </button>
                  {i < hobbies.length - 1 && (
                    <span aria-hidden className="px-2 text-[var(--muted)]">
                      ·
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          {/* All blurbs share one grid cell so the box is as tall as the longest one: switching never shifts the page. */}
          <div className="mt-2 grid" aria-hidden>
            {hobbies.map((h) => {
              const isActive = h.id === active;
              return (
                <div
                  key={h.id}
                  className={cn(
                    "col-start-1 row-start-1 motion-safe:transition-opacity motion-safe:duration-150",
                    isActive ? "opacity-100" : "invisible opacity-0"
                  )}
                >
                  <p className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--ink)]">{h.name}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-[var(--ink-2)]">{h.blurb}</p>
                </div>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            {selected.name}: {selected.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}
