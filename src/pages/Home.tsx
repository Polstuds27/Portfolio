import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { ExperienceRecognition } from "@/components/ExperienceRecognition";
import { AboutBrief } from "@/components/AboutBrief";

/** Home order: Hero → Selected work → Experience & recognition → About. The contact block (SiteFooter) closes every page. */
export function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ExperienceRecognition />
      <AboutBrief />
    </>
  );
}
