import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { ExperienceRecognition } from "@/components/ExperienceRecognition";
import { AboutBrief } from "@/components/AboutBrief";
import { ContactClosing } from "@/components/ContactClosing";

/**
 * Home order: Hero → Selected work → Experience & recognition → About → Contact.
 * Contact doubles as the footer here, so SiteFooter is hidden on "/".
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ExperienceRecognition />
      <AboutBrief />
      <ContactClosing />
    </>
  );
}
