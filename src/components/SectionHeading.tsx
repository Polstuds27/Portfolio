import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  kicker,
  title,
  lede,
  className,
  align = "left",
}: {
  kicker: string;
  title: string;
  lede?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{kicker}</p>
      <h2 className="display-section mt-3 text-[32px] sm:text-[40px]">{title}</h2>
      {lede ? (
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--ink-2)]">{lede}</p>
      ) : null}
    </Reveal>
  );
}
