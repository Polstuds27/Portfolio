import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles-core";

export const LINKEDIN = "https://www.linkedin.com/in/paul-adrianne-mojal-56a948294/";
export const PHOTO_URL = `${import.meta.env.BASE_URL}avatar.png`;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <SparklesCore particleColor="#c17b69" particleDensity={10} minSize={1} maxSize={2} speed={0.5} cursorMode="attract" clickPush={0}>
      <div className="relative mx-auto grid w-full max-w-6xl items-stretch gap-10 px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] md:gap-10 lg:gap-16">
          <div className="max-w-[760px]">
            <div className="mb-6 flex items-center gap-4 md:hidden">
              <img
                src={`${import.meta.env.BASE_URL}hero-portrait-gray.png`}
                alt="Paul Adrianne Mojal"
                className="h-20 w-20 shrink-0 rounded-xl border border-[var(--line-soft)] object-cover object-[50%_20%] grayscale"
                width="80"
                height="80"
              />
              <p className="text-[15px] text-[var(--muted)]">
                <span className="block font-medium text-[var(--ink)]">Paul Adrianne Mojal</span>
                BSIT, Bulacan State University
              </p>
            </div>
            <p className="mb-4 hidden text-sm text-[var(--muted)] md:block">
              <span className="font-medium text-[var(--ink)]">Paul Adrianne Mojal</span>
              {" · "}BSIT, Bulacan State University
            </p>
            <h1
              id="hero-title"
              className="display-hero mt-4 text-[44px] leading-[1.04] sm:text-[64px] lg:text-[68px]"
            >
              I build{" "}
              <span className="underline decoration-[var(--accent)] decoration-[0.09em] underline-offset-[0.16em]">
                offline-first
              </span>{" "}
              apps that survive the real world.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[17px] sm:text-lg leading-relaxed text-[var(--ink-2)]">
              I build Django REST + React apps that keep working when the network doesn’t. Recently: an offline-first finance PWA with its own sync protocol, a lab-management backend deployed at my university, and an on-device call-center QA pipeline that never sends audio to the cloud.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/projects">
                  View projects <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
              <a
                href="https://github.com/Polstuds27"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                <Github className="size-4" aria-hidden /> Polstuds27
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                <Linkedin className="size-4" aria-hidden /> LinkedIn
              </a>
              <a
                href="mailto:paul.mojal@gmail.com"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]"
              >
                <Mail className="size-4" aria-hidden /> paul.mojal@gmail.com
              </a>
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <MapPin className="size-4" aria-hidden /> Bocaue, Bulacan
              </span>
            </div>
          </div>
          <figure className="hidden md:block aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-xl border border-[var(--line-soft)] md:justify-self-end">
            <img
              src={`${import.meta.env.BASE_URL}hero-portrait-gray.png`}
              alt="Paul Adrianne Mojal"
              className="h-full w-full object-cover object-[50%_20%] grayscale contrast-110 brightness-90"
              width="1385"
              height="1136"
            />
          </figure>
      </div>
      </SparklesCore>
    </section>
  );
}
