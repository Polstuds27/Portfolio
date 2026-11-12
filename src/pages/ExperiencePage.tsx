import { HomeSection } from "@/components/HomeSection";
import { ExperienceTimeline } from "@/components/ExperienceRecognition";

/** Same timeline as the home page's "Experience & recognition" section. */
export function ExperiencePage() {
  return (
    <HomeSection id="experience" as="h1" title="Experience">
      <ExperienceTimeline />
    </HomeSection>
  );
}
