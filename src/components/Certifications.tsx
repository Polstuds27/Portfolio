import { Award, ArrowUpRight, FileBadge } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section aria-labelledby="certifications-heading" className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionHeading
        kicker="Credentials"
        title="Certifications"
        lede="Verified credentials only — each entry names its issuer and dates, with a verification link where one exists."
      />

      {certifications.length === 0 ? (
        <div
          className="surface-flat mx-auto mt-10 max-w-xl p-8 text-center sm:p-10"
          role="status"
        >
          <Award className="mx-auto size-6 text-[var(--muted)]" aria-hidden />
          <h3 id="certifications-heading" className="mt-3 text-xl font-semibold tracking-[-0.02em]">
            No certifications listed yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">
            Credentials will appear here once they’re earned and verifiable. Entries are
            data-driven — add them in{" "}
            <code className="rounded-md bg-[var(--elevated)] px-1.5 py-0.5 font-mono text-[13px]">
              src/data/certifications.ts
            </code>{" "}
            and they render automatically.
          </p>
        </div>
      ) : (
        <>
          <h3 id="certifications-heading" className="sr-only">
            Certifications
          </h3>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {certifications.map((c, i) => (
              <li key={c.id}>
                <Reveal delay={(i % 2) * 80} className="surface-flat flex gap-4 p-6 h-full">
                {c.assetUrl ? (
                  <img
                    src={c.assetUrl}
                    alt=""
                    className="size-12 shrink-0 rounded-xl border border-[var(--line-soft)] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--elevated)]"
                  >
                    <FileBadge className="size-5 text-[var(--muted)]" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-semibold tracking-[-0.01em] leading-snug">{c.name}</p>
                  <p className="mt-0.5 text-sm text-[var(--ink-2)]">{c.issuer}</p>
                  <p className="mt-1 text-[13px] text-[var(--muted)]">
                    Issued {c.issued}
                    {c.expires ? ` · Expires ${c.expires}` : ""}
                    {c.credentialId ? ` · ID ${c.credentialId}` : ""}
                  </p>
                  {c.summary && (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">
                      {c.summary}
                    </p>
                  )}
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
                    >
                      Verify credential <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  )}
                </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
