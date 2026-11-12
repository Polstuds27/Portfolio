// Adapted from EasyUI Photo Box by Suraj Maurya (MIT): https://easyui.site/components/photo-box
// Changes for this site:
//  - selection is controlled by the parent (hobby selector drives which print is open)
//  - muted kraft/coral folder, small soft shadow, no cover title
//  - on desktop the enlarged print stays inside the component's own stage (never overlaps neighbours)
//  - below md the print opens in a centered overlay with a dimmed backdrop and a focus trap
//  - site tokens for text/focus colours, broken-image fallback, reduced motion = fades only

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, X } from "lucide-react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type PhotoPrint = {
  id: string;
  /** Written on the polaroid border */
  title: string;
  /** Shown under the print when it's open */
  caption: string;
  src?: string;
  alt?: string;
};

export type PhotoBoxProps = {
  /** Up to 3 prints (the box has 3 slots) */
  prints: PhotoPrint[];
  /** Small text on the folder, e.g. "3 prints · tap to open" */
  label: string;
  /** Id of the open print, or null when closed (controlled) */
  selected: string | null;
  /** Folder itself was activated (open the parent's current print) */
  onCoverActivate: () => void;
  /** A specific print was clicked */
  onPrintActivate: (id: string) => void;
  onClose: () => void;
  className?: string;
};

/* ------------------------------ Design space ------------------------------- */
// Authored on a 490-wide stage and scaled to the container. The stage is tall enough to hold the
// enlarged print + caption, so the open state never spills outside the component.

const W = 490;
const COVER = { x: 16, y: 150, w: 247, h: 156 };
const BOX = { left: 97, w: 273, backTop: 157, lipTop: 241, bottom: 301 };
const SHIFT = 85; // how far the box slides out from under the cover
const PRINT = { w: 120, h: 150, s: 0.7 };

// Print centres relative to the box's left edge, per slot. Shifted right so the front print peeks out cleanly.
const IDLE = [
  { cx: 140, cy: 226, r: -6 },
  { cx: 186, cy: 226, r: -1 },
  { cx: 228, cy: 226, r: 4 },
];
const OPEN = [
  { cx: 97, cy: 184, r: -12 },
  { cx: 154, cy: 176, r: -2 },
  { cx: 227, cy: 194, r: 9 },
];

const metrics = (compact: boolean) =>
  compact ? { H: 530, oy: 45, sExp: 2.4, cy: 208 } : { H: 440, oy: 0, sExp: 2.05, cy: 172 };

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]";

/* --------------------------------- Pieces ---------------------------------- */

function PhotoFill({ print, eager = false }: { print: PhotoPrint; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!print.src || failed) {
    return (
      <span className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[#e9e4dc] text-[#9a8f80]">
        <Camera className="size-6" aria-hidden />
        <span className="text-[9px] font-medium uppercase tracking-[0.14em]">Photo soon</span>
      </span>
    );
  }
  return (
    <img
      src={print.src}
      alt={print.alt ?? ""}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function Polaroid({ print }: { print: PhotoPrint }) {
  return (
    <span
      className="relative block h-[150px] w-[120px] rounded-[4px] p-[7px]"
      style={{
        background: "linear-gradient(180deg,#fbf9f5 0%,#f3efe8 100%)",
        boxShadow: "0 1px 2px rgba(60,40,20,0.28), 0 8px 16px -6px rgba(60,40,20,0.3)",
      }}
    >
      <span className="relative block h-[104px] w-full overflow-hidden rounded-[2px] bg-neutral-200 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
        <PhotoFill print={print} />
      </span>
      <span className="mt-[11px] block truncate text-center text-[14px] font-medium leading-none text-neutral-600">
        {print.title}
      </span>
    </span>
  );
}

function useMedia(query: string) {
  const [m, setM] = useState(() => typeof window !== "undefined" && !!window.matchMedia?.(query).matches);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}

/** Below md: the open print in a centered overlay with a dimmed backdrop. Focus is trapped on the close button. */
function MobileViewer({ print, onClose }: { print: PhotoPrint; onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${print.title}. ${print.caption}`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/70 px-[10vw] backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.12 : 0.2, ease: EASE_OUT }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Tab") {
          // Only one focusable element inside: keep focus on it.
          e.preventDefault();
          closeRef.current?.focus();
        }
      }}
    >
      <motion.figure
        className="w-[80vw] max-w-[420px] rounded-[6px] p-[4%] pb-[5%]"
        style={{ background: "linear-gradient(180deg,#fbf9f5 0%,#f3efe8 100%)" }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 8 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reduce ? 0.15 : 0.25, ease: EASE_OUT }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="block aspect-square w-full overflow-hidden rounded-[3px] bg-neutral-200">
          <PhotoFill print={print} eager />
        </span>
        <figcaption className="mt-[5%] text-center text-[22px] font-medium leading-none text-neutral-700">
          {print.title}
        </figcaption>
      </motion.figure>
      <p className="mt-4 text-center text-[15px] leading-snug text-white/90">{print.caption}</p>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/30 px-4 text-[13px] font-medium text-white/85 outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="size-4" aria-hidden /> Tap anywhere or press Esc to close
      </button>
    </motion.div>,
    document.body
  );
}

/* -------------------------------- Component -------------------------------- */

export function PhotoBox({
  prints,
  label,
  selected,
  onCoverActivate,
  onPrintActivate,
  onClose,
  className = "",
}: PhotoBoxProps) {
  const reduce = useReducedMotion();
  const overlayMode = useMedia("(max-width: 767px)");
  const list = prints.slice(0, 3);

  const wrapRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef("mouse");

  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState(false);
  const [lifted, setLifted] = useState<string | null>(null); // keeps the print above the box until it lands back

  const compact = width > 0 && width < 520;
  const { H, oy, sExp, cy: expCy } = metrics(compact);
  const scale = width / W || 1;
  const selectedPrint = list.find((p) => p.id === selected) ?? null;
  const expanded = selectedPrint !== null && !overlayMode; // in-stage enlargement (desktop only)
  const open = hover || selectedPrint !== null;

  useEffect(() => {
    if (selected) setLifted(selected);
  }, [selected]);

  useIsomorphicLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth || W);
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mouse hover is hit-tested against the composition (not the whole stage)
  const onPointerMove = (e: React.PointerEvent) => {
    lastPointer.current = e.pointerType;
    if (e.pointerType === "touch" || expanded || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / scale;
    const y = (e.clientY - r.top) / scale - oy;
    const inside = open
      ? x >= 8 && x <= 480 && y >= 106 && y <= 314
      : x >= 14 && x <= 392 && y >= 148 && y <= 310;
    setHover(inside);
  };

  /* ----------------------------- Motion helpers ----------------------------- */

  const spring = (delay = 0, bounce = 0.18) =>
    reduce ? { duration: 0 } : ({ type: "spring", duration: 0.55, bounce, delay } as const);
  const fade = { duration: reduce ? 0.15 : 0.28, ease: EASE_OUT };

  const away = expanded; // everything but the chosen print recedes
  const boxAnim = {
    x: open ? SHIFT : 0,
    opacity: away ? 0.14 : 1,
    filter: away && !reduce ? "blur(2px)" : "blur(0px)",
  };
  const boxTransition = { x: spring(0, 0.12), opacity: fade, filter: fade };

  const printAnim = (i: number, id: string) => {
    const idle = IDLE[i];
    const o = OPEN[i];
    if (expanded && id === selected) {
      return {
        x: SHIFT + (W / 2 - (BOX.left + idle.cx + SHIFT)),
        y: expCy - (idle.cy + oy),
        rotate: 0,
        scale: sExp,
        // Reduced motion: the print jumps into place and fades in instead of flying.
        opacity: reduce ? [0, 1] : 1,
        filter: "blur(0px)",
      };
    }
    if (open) {
      return {
        x: SHIFT + (o.cx - idle.cx),
        y: o.cy - idle.cy,
        rotate: reduce ? idle.r : o.r,
        scale: PRINT.s,
        opacity: away ? 0.14 : 1,
        filter: away && !reduce ? "blur(2px)" : "blur(0px)",
      };
    }
    return { x: 0, y: 0, rotate: idle.r, scale: PRINT.s, opacity: 1, filter: "blur(0px)" };
  };

  const printTransition = (i: number, id: string) =>
    expanded && id === selected
      ? { ...spring(0, 0.1), opacity: fade, filter: fade }
      : { ...spring(open ? i * 0.04 : (list.length - 1 - i) * 0.03, 0.24), opacity: fade, filter: fade };

  const captionTop = (expCy + (PRINT.h * sExp) / 2 + 14) * scale;

  return (
    <div
      ref={wrapRef}
      className={`relative w-full select-none ${className}`}
      style={{ aspectRatio: `${W} / ${H}`, opacity: width ? 1 : 0, touchAction: "manipulation" }}
      onPointerMove={onPointerMove}
      onPointerDownCapture={(e) => (lastPointer.current = e.pointerType)}
      onPointerLeave={(e) => {
        if (e.pointerType !== "touch") setHover(false);
      }}
    >
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {/* Click target for the empty part of the box */}
        <div
          aria-hidden
          onClick={onCoverActivate}
          className="absolute cursor-pointer"
          style={{ left: COVER.x, top: COVER.y + oy - 44, width: 380, height: COVER.h + 48, zIndex: 1 }}
        />

        {/* Box: back panel */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-t-[10px]"
          style={{
            left: BOX.left,
            top: BOX.backTop + oy,
            width: BOX.w,
            height: BOX.bottom - BOX.backTop,
            zIndex: 2,
            background: "linear-gradient(180deg,#b9a688 0%,#a8957a 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
          }}
          initial={false}
          animate={boxAnim}
          transition={boxTransition}
        />

        {/* Prints (sit between the back panel and the front lip) */}
        {list.map((p, i) => {
          const idle = IDLE[i];
          const isSel = expanded && p.id === selected;
          const interactive = open && !expanded;
          return (
            <motion.button
              key={p.id}
              type="button"
              aria-label={`Open ${p.title} photo`}
              tabIndex={interactive ? 0 : -1}
              onClick={() => {
                if (!interactive) return;
                onPrintActivate(p.id);
              }}
              onAnimationComplete={() => {
                if (selected !== p.id && lifted === p.id) setLifted(null);
              }}
              className={`absolute rounded-[4px] ${RING}`}
              style={{
                left: BOX.left + idle.cx - PRINT.w / 2,
                top: idle.cy + oy - PRINT.h / 2,
                width: PRINT.w,
                height: PRINT.h,
                zIndex: lifted === p.id || isSel ? 30 : 3 + i,
                cursor: interactive ? "zoom-in" : "default",
                pointerEvents: interactive ? "auto" : "none",
                transformOrigin: "50% 50%",
                WebkitTapHighlightColor: "transparent",
              }}
              initial={false}
              animate={printAnim(i, p.id)}
              transition={printTransition(i, p.id)}
            >
              <Polaroid print={p} />
            </motion.button>
          );
        })}

        {/* Box: front lip + latch */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-b-[10px] rounded-t-[3px]"
          style={{
            left: BOX.left,
            top: BOX.lipTop + oy,
            width: BOX.w,
            height: BOX.bottom - BOX.lipTop,
            zIndex: 6,
            background: "linear-gradient(180deg,#e6d8bd 0%,#dccdb0 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 3px 6px -2px rgba(0,0,0,0.25)",
          }}
          initial={false}
          animate={boxAnim}
          transition={boxTransition}
        >
          <span
            className="absolute left-1/2 top-[-3px] h-[30px] w-[30px] -translate-x-1/2 rounded-full"
            style={{ background: "#c9b68f", boxShadow: "inset 0 2px 3px rgba(90,60,20,0.22)" }}
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-l-[2px] rounded-r-[7px]"
          style={{
            left: BOX.left + BOX.w - 4,
            top: 207 + oy,
            width: 18,
            height: 38,
            zIndex: 6,
            background: "linear-gradient(180deg,#b9705a 0%,#a7604b 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 4px -1px rgba(0,0,0,0.25)",
          }}
          initial={false}
          animate={boxAnim}
          transition={boxTransition}
        />

        {/* Folder cover: muted kraft/coral, small soft shadow */}
        <motion.button
          type="button"
          onClick={onCoverActivate}
          aria-label={`${label}. Open the selected photo`}
          className={`absolute rounded-[14px] text-left ${RING}`}
          style={{
            left: COVER.x,
            top: COVER.y + oy,
            width: COVER.w,
            height: COVER.h,
            zIndex: 20,
            WebkitTapHighlightColor: "transparent",
            background: "linear-gradient(140deg,#c99a83 0%,#bb8770 55%,#b07c66 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28), 0 2px 6px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.16)",
          }}
          initial={false}
          animate={{ opacity: away ? 0.14 : 1 }}
          transition={fade}
        >
          <span className="absolute inset-x-[18px] bottom-[18px] block">
            <span className="block text-[22px] font-semibold leading-tight tracking-[-0.005em] text-white">{label}</span>
            <span className="mt-[10px] block h-px bg-white/30" />
            <span className="mt-[5px] block h-px bg-white/30" />
          </span>
        </motion.button>
      </div>

      {/* Desktop: caption + click-anywhere-to-close layer, inside the stage */}
      <AnimatePresence>
        {expanded && selectedPrint && (
          <motion.div
            key="layer"
            role="dialog"
            aria-label={`${selectedPrint.title}. ${selectedPrint.caption}`}
            onClick={onClose}
            className="absolute inset-0 z-40 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.2, ease: EASE_OUT }}
          >
            <motion.div
              key={selectedPrint.id}
              className="absolute inset-x-0 px-3 text-center"
              style={{ top: captionTop }}
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: reduce ? 0 : 0.18, duration: reduce ? 0.15 : 0.28, ease: EASE_OUT },
              }}
            >
              <p className="text-[14px] leading-snug text-[var(--ink-2)]">{selectedPrint.caption}</p>
              <p className="mt-1 text-[12px] text-[var(--muted)]">Tap anywhere or press Esc to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Below md: centered overlay */}
      <AnimatePresence>
        {overlayMode && selectedPrint && <MobileViewer key="viewer" print={selectedPrint} onClose={onClose} />}
      </AnimatePresence>
    </div>
  );
}

export default PhotoBox;
